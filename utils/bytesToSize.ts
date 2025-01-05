export const bytesToSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const factor = 1024;
    let index = 0;

    if(bytes === 0) return '0 Bytes';

    while (bytes >= factor && index < sizes.length - 1) {
        bytes /= factor;
        index++;
    }
    return `${bytes.toFixed(2)} ${sizes[index]}`;

    // const i = Math.floor(Math.log(bytes) / Math.log(factor));
    // const size = (bytes / Math.pow(factor, i)).toFixed(2);
    // return `${size} ${sizes[i]}`
};

export const calculateBlobSize = (blob?: Blob): string => {
    const units = ["Bytes", "KB", "MB", "GB", "TB"];

    let size = blob?.size || 0;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
}

export const reduceSize = (bytes: number, blob?: Blob): { sizeRedcued: string, percentage: string } => {
    const blobSizeInBytes = blob?.size || 0;
    const adjustedSizeInBytes = Math.max(0, bytes - blobSizeInBytes);
    const percentageReduction = ((adjustedSizeInBytes / bytes) * 100).toFixed(2);

    return {
        sizeRedcued: bytesToSize(adjustedSizeInBytes),
        percentage: `${percentageReduction}%`,
    };
}
