import { FFmpeg } from "@ffmpeg/ffmpeg";
import { FIleActions, VideoInputSettings } from "./types";
import { fetchFile } from "@ffmpeg/util";
import { customeVideoCompressionCommand, twitterCompressionCommand, whatsappStatusCompressionCOmmand } from "./ffmpegCommands";

export function getFileExtension(fileName: string) {
    const regex = /(?:\.([^.]+))?$/;
    const match = regex.exec(fileName);
    if(match && match[1]) {
        return match[1];
    }

    return "";
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
    const { file, fileName, fileType } = actionfile;
    const output = removeFileExtension(fileName) + "." + videoSettings.format;

    ffmpeg.writeFile(fileName, await fetchFile(file));
    const command = videoSettings.twitterCompressionCommand 
    ? twitterCompressionCommand(fileName, output) 
    : videoSettings.whatsappCompressionCommand 
    ? whatsappStatusCompressionCOmmand(fileName, output) 
    : customeVideoCompressionCommand(fileName, output, videoSettings);

    console.log(command.join(" "));
    await ffmpeg.exec(command);
    const data = await ffmpeg.readFile(output);
    const blob = new Blob([data], { type: fileType.split("/")[0] });
    const url = URL.createObjectURL(blob);
    return { url, output, outputBlob: blob };
} 