

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