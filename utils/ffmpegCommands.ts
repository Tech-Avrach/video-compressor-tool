import { VideoFormats, VideoInputSettings } from "./types";

// Helper function to format timestamps for FFmpeg
const formatTimeStamp = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Twitter compression settings
// Twitter compression settings
export const twitterCompressionCommand = (
  input: string, 
  output: string, 
  videoSettings: VideoInputSettings
) => {
  const startTime = formatTimeStamp(videoSettings.customeStartTime);
  const duration = formatTimeStamp(videoSettings.customeEndTime - videoSettings.customeStartTime);

  return [
      "-ss", startTime,
      "-t", duration,
      "-i", input,
      "-c:v", "libx264",
      "-profile:v", "high",
      "-level:v", "4.2",
      "-pix_fmt", "yuv420p",
      "-r", "30",
      "-c:a", "aac",
      "-b:a", "192k",
      "-movflags", "faststart",
      "-maxrate", "5000k",
      "-bufsize", "5000k",
      "-tune", "film",
      output
  ];
};

// WhatsApp compression settings
export const whatsappStatusCompressionCommand = (
  input: string, 
  output: string, 
  videoSettings: VideoInputSettings
) => {
  const startTime = formatTimeStamp(videoSettings.customeStartTime);
  const duration = formatTimeStamp(videoSettings.customeEndTime - videoSettings.customeStartTime);

  return [
      "-ss", startTime,
      "-t", duration,
      "-i", input,
      "-c:v", "libx264",
      "-preset", "veryfast",
      "-crf", "35",
      "-c:a", "aac",
      "-b:a", "64k",
      "-movflags", "faststart",
      "-maxrate", "1000k",
      "-bufsize", "1000k",
      "-fs", "9M",
      output
  ];
};

// Base compression settings that are common across formats
const getBaseCompressionSettings = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
) => {
    const startTime = formatTimeStamp(videoSettings.customeStartTime);
    const duration = formatTimeStamp(videoSettings.customeEndTime - videoSettings.customeStartTime);

    const baseCommand = [
        "-ss", startTime,
        "-t", duration,
        "-i", input,
        "-c:v", "libx264",
        "-preset", "medium",
        "-pix_fmt", "yuv420p",
        "-r", "30",
    ];

    // Add audio settings if not removed
    if (!videoSettings.removeAudio) {
        baseCommand.push("-c:a", "aac", "-b:a", "192k");
    } else {
        baseCommand.push("-an");
    }

    return baseCommand;
};

// MP4 specific settings
const getMP4Command = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
) => {
    const baseCommand = getBaseCompressionSettings(input, output, videoSettings);
    return [
        ...baseCommand,
        "-profile:v", "high",
        "-level:v", "4.2",
        "-maxrate", "5000k",
        "-bufsize", "5000k",
        "-tune", "film",
        "-crf", "23",
        "-movflags", "faststart",
        output
    ];
};

// MOV specific settings
const getMOVCommand = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
) => {
    const baseCommand = getBaseCompressionSettings(input, output, videoSettings);
    return [
        ...baseCommand,
        "-crf", "23",
        "-movflags", "faststart",
        output
    ];
};

// MKV specific settings
const getMKVCommand = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
) => {
    const baseCommand = getBaseCompressionSettings(input, output, videoSettings);
    return [
        ...baseCommand,
        "-crf", "23",
        output
    ];
};

// AVI specific settings
const getAVICommand = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
) => {
    const baseCommand = getBaseCompressionSettings(input, output, videoSettings);
    return [
        ...baseCommand,
        "-crf", "23",
        "-vtag", "xvid",
        output
    ];
};

// FLV specific settings
const getFLVCommand = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
) => {
    const baseCommand = getBaseCompressionSettings(input, output, videoSettings);
    return [
        ...baseCommand,
        "-crf", "23",
        "-f", "flv",
        output
    ];
};

// Main function to select appropriate compression command
export const customeVideoCompressionCommand = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
): string[] => {
    // Log settings for debugging
    console.log("Video Settings:", videoSettings);
    console.log("Input:", input);
    console.log("Output:", output);

    // Select appropriate command based on output format
    switch (videoSettings.format) {
        case VideoFormats.MP4:
            return getMP4Command(input, output, videoSettings);
        case VideoFormats.MOV:
            return getMOVCommand(input, output, videoSettings);
        case VideoFormats.MKV:
            return getMKVCommand(input, output, videoSettings);
        case VideoFormats.AVI:
            return getAVICommand(input, output, videoSettings);
        case VideoFormats.FLV:
            return getFLVCommand(input, output, videoSettings);
        default:
            console.warn(`Unsupported format: ${videoSettings.format}, falling back to MP4`);
            return getMP4Command(input, output, videoSettings);
    }
};