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
