"use client";
import { useState } from 'react';
import ReactDropzone from 'react-dropzone'
import { toast } from "sonner"
import { duplexPair } from 'stream';

type CustomeDropZoneProps = {
    handleUpload: (files: File) => void;
    acceptedFiles: {[key: string]: string[]};
    disabled?: boolean;
}

export const CustomeDropZone = ({
    handleUpload, 
    acceptedFiles, 
    disabled
}: CustomeDropZoneProps) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const handleHover = (): void => setIsHover(true);
    const handleExitHover = (): void => setIsHover(false);

    const onDrop = (files: File[]) => {
        handleUpload(files[0]);
    }

    const onError = () => {
        handleExitHover();
        toast.error("Error uploading file(s)", {
            description: "Allowed files: Audio, Video, Image.",
            duration: 5000,
        });
    };

    const onDropRejected = () => {
        handleExitHover();
        toast.error("Error uploading file(s)", {
            description: "Allowed files: Audio, Video, Image.",
            duration: 5000,
        });
    };

    return (
        <ReactDropzone 
            disabled={disabled} 
            onDrop={onDrop} 
            onDragEnter={handleHover} 
            onDragLeave={handleExitHover} 
            accept={acceptedFiles}
            multiple={false}
            onDropRejected={onDropRejected}
            onError={onError}
        >
            {({getRootProps, getInputProps}) => (
                <div {...getRootProps()} className={`${isHover ? "border-black bg-gray-100/80" : "border-default-gray"} flex justify-center items-center rounded-3xl flex-col cursor-pointer w-full py-6 ${disabled ? "coursor-not-allowed" : ""}`}>
                    <input {...getInputProps()} />
                    <h3 className='text-center mt-5'>
                        Click to select video <br />
                        or <br />
                        Drag and drop
                    </h3>
                </div>
                    
            )}
        </ReactDropzone>
    )
}