import { FFmpeg } from "@ffmpeg/ffmpeg";
import { FIleActions, VideoInputSettings } from "./types";
import { fetchFile } from "@ffmpeg/util";
import { customeVideoCompressionCommand, twitterCompressionCommand, whatsappStatusCompressionCommand } from "./ffmpegCommands";

export function getFileExtension(fileName: string) {
    const regex = /(?:\.([^.]+))?$/;
    const match = regex.exec(fileName);
    if(match && match[1]) {
        return match[1].toLowerCase();
    }
    return "";
}

function generateUniqueOutputName(inputName: string, format: string): string {
    const timestamp = new Date().getTime();
    const baseName = removeFileExtension(inputName);
    return `${baseName}_condensed_${timestamp}.${format}`;
}

function removeFileExtension(fileName: string) {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex !== -1) {
        return fileName.slice(0, lastDotIndex);
    }
    return fileName;
}

export default async function convertFile(
    ffmpeg: FFmpeg,
    actionfile: FIleActions,
    videoSettings: VideoInputSettings,
): Promise<any> {
    try {
        const { file, fileName, fileType } = actionfile;
        
        // Generate unique output filename
        const output = generateUniqueOutputName(fileName, videoSettings.format);
        
        // Write input file
        await ffmpeg.writeFile(fileName, await fetchFile(file));
        
        // Determine command based on settings
        let command: string[];
        if (videoSettings.twitterCompressionCommand) {
            command = twitterCompressionCommand(fileName, output, videoSettings);
        } else if (videoSettings.whatsappCompressionCommand) {
            command = whatsappStatusCompressionCommand(fileName, output, videoSettings);
        } else {
            command = customeVideoCompressionCommand(fileName, output, videoSettings);
        }
        
        console.log("FFmpeg command:", command.join(" "));
        
        // Execute conversion
        await ffmpeg.exec(command);
        
        // Read and create output blob
        const data = await ffmpeg.readFile(output);
        const blob = new Blob([data], { type: `video/${videoSettings.format}` });
        const url = URL.createObjectURL(blob);
        
        // Clean up input file
        await ffmpeg.deleteFile(fileName);
        await ffmpeg.deleteFile(output);
        
        return { url, output, outputBlob: blob };
    } catch (error) {
        console.error("Conversion error:", error);
        throw error;
    }
}

export const formatTime = (seconds: number) : string => {
    seconds = Math.round(seconds);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let formattedTime = "";

    if (hours > 0) {
        formattedTime += `hr`;
        if(minutes > 0 || remainingSeconds > 0) {
            formattedTime += "";
        }
    }

    if (minutes > 0) {
        formattedTime += `${minutes.toString()} min`;
        if (remainingSeconds > 0) {
            formattedTime += " ";
        }
    }

    if (remainingSeconds > 0 || formattedTime === "") {
        formattedTime += `${remainingSeconds.toString()} sec`;
    }

    return formattedTime;
    
};