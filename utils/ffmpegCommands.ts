import { Video } from "lucide-react";
import { getFileExtension } from "./convert";
import { VideoFormats, VideoInputSettings } from "./types"

export const whatsappStatusCompressionCOmmand = (input: string, output: string) => [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "35",
    "-c:a",
    "aac",
    "-b:a",
    "64k",
    "-movflags",
    "faststart",
    "-maxrate",
    "1000k",
    "-bufsize",
    "1000k",
    "-fs",
    "9M",
    output
]

export const twitterCompressionCommand = (input: string, output: string) => [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-profile:v",
    "high",
    "-level:v",
    "4.2",
    "-pix_fmt",
    "yuv420p",
    "-r",
    "30",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-movflags",
    "faststart",
    "-maxrate",
    "5000k",
    "-bufsize",
    "5000k",
    "tune",
    "film",
    output
]

export const customeVideoCompressionCommand = (input: string, output: string, videoSettings: VideoInputSettings): string[] => {

    const inputType = getFileExtension(input);
    if(inputType === "mp4") {
        return getMP4toMP4Command(input, output, videoSettings);
    }else{
        switch(videoSettings.format){
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
                return ["-i", input, output];

        }
    }
};

const getMP4toMP4Command = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
) => {
    const ffmpegCommand = [
        "-i",
        input,
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "23",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        output
    ];

    return ffmpegCommand;
};

const getMP4Command = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
) => {
    const ffmpegCommand = [
        "-i",
        input,
        "-c:v",
        "libx264",
        "-profile:v",
        "high",
        "-level:v",
        "4.2",
        "-pix_fmt",
        "yuv420p",
        "-r",
        "30",
        "-maxrate",
        "5000k",
        "-bufsize",
        "5000k",
        "tune",
        "film",
        "-ss",
        videoSettings.customeStartTime.toString(),
        "-to",
        videoSettings.customeEndTime.toString(),
        "-q:v",
        videoSettings.quality,
        "-preset",
        "medium",
        "libx264",
        "-crf",
        "18",
        "-f",
        videoSettings.format,
    ];

    if(!videoSettings.removeAudio) {
        ffmpegCommand.push("-c:a", "aac", "-b:a", "192k", "movflags", "faststart");
    }else {
        ffmpegCommand.push("-an");
    }

    ffmpegCommand.push(output);

    return ffmpegCommand;
};

const getMOVCommand = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
  ) => {
    const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "aac"];
    const ffmpegCommand = [
      "-i",
      input,
      "-c:v",
      "libx264",
      "-crf",
      videoSettings.quality,
      ...audioOptions,
      "-vf",
      `trim=start=${videoSettings.customeStartTime}:end=${videoSettings.customeEndTime}`,
      output,
    ];
  
    return ffmpegCommand;
  };
  
  const getMKVCommand = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
  ) => {
    const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "aac"];
    const ffmpegCommand = [
      "-i",
      input,
      "-c:v",
      "libx264",
      "-crf",
      videoSettings.quality,
      ...audioOptions,
      "-vf",
      `trim=start=${videoSettings.customeStartTime}:end=${videoSettings.customeEndTime}`,
      output,
    ];
  
    return ffmpegCommand;
  };
  
  const getAVICommand = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
  ) => {
    const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "aac"];
    const ffmpegCommand = [
      "-i",
      input,
      "-c:v",
      "libx264",
      "-crf",
      videoSettings.quality,
      ...audioOptions,
      "-vf",
      `trim=start=${videoSettings.customeStartTime}:end=${videoSettings.customeEndTime}`,
      output,
    ];
  
    return ffmpegCommand;
  };
  
  const getFLVCommand = (
    input: string,
    output: string,
    videoSettings: VideoInputSettings
  ) => {
    const audioOptions = videoSettings.removeAudio ? [] : ["-c:a", "aac"];
    const ffmpegCommand = [
      "-i",
      input,
      "-c:v",
      "libx264",
      "-crf",
      videoSettings.quality,
      ...audioOptions,
      "-vf",
      `trim=start=${videoSettings.customeStartTime}:end=${videoSettings.customeEndTime}`,
      output,
    ];
  
    return ffmpegCommand;
  };