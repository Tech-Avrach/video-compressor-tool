

export type FIleActions = {
    file: File;
    fileName: string;
    fileSize: number;
    fileType: string;
    from: string;
    isError?: boolean;
    url?: string;
    output?: any;
    outputBlob?: Blob;
}

export enum QualityType {
    High = "15",
    Medium = "18",
    Low = "20"
}

export enum VideoFormats {
    MP4 = "mp4",
    MKV = "mkv",
    MOV = "mov",
    AVI = "avi",
    FLV = "flv",
    WEBM = "webm",
}

export type VideoInputSettings = {
    quality: QualityType;
    format: VideoFormats;
    customeEndTime: number;
    customeStartTime: number;
    removeAudio: boolean;
    twitterCompressionCommand: boolean;
    whatsappCompressionCommand: boolean;
}