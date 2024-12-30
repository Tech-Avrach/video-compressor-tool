import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CustomeDropZone } from './coustome-dropzone'
import { acceptedVideoFiles } from '@/utils/formats'
import { FIleActions, QualityType, VideoFormats, VideoInputSettings } from '@/utils/types'
import VideoDisplay from './video-display'
import VideoInputDetails from './video-input-details'
import VideoTrim from './video-trim'
import VideoInputControl from './video-input-control'
import { FFmpeg } from '@ffmpeg/ffmpeg';
const condenseVideo = () => {

  const [videoFile, setVideoFile] = React.useState<FIleActions>();
  const [progress, setProgress] = useState<number>(0);
  const [time, setTime] = useState<{
    startTime?: number;
    elapsedSeconds?: number;
  }>({ elapsedSeconds: 0 });
  const [status, setStatus] = useState<"notStarted" | "converted" | "condensing">("notStarted");
  const [videoSettings, setVideoSettings] = useState<VideoInputSettings>({
    quality: QualityType.High,
    format: VideoFormats.MP4,
    customeEndTime: 0,
    customeStartTime: 0,
    removeAudio: false,
    twitterCompressionCommand: false,
    whatsappCompressionCommand: false
  });

  const handleUpload = (file: File) => {
    console.log(file)
    setVideoFile({
      fileName: file.name,
      fileSize: file.size,
      from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
      fileType: file.type,
      file,
      isError: false
    })
  }

  const ffmpegRef = useRef(new FFmpeg());

  const disabledDuringCompression = status === "condensing";

  return (
    <>
      <motion.div 
        layout
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        key={"drag"}
        transition={{type: "tween"}}
        className='border rounded-3xl col-span-5 flex w-full md:h-full bg-gray-50/35 '
      >
      {videoFile ? (
        <VideoDisplay videoUrl={URL.createObjectURL(videoFile.file)} />
      ) : (
        <CustomeDropZone handleUpload={handleUpload} acceptedFiles={acceptedVideoFiles}/>
      )}
      </motion.div>
      <AnimatePresence mode='popLayout'>
        <motion.div className='border rounded-3xl col-span-3 flex w-full md:h-full bg-gray-50/35 p-4 relative'>

        <div className='flex flex-col gap-4 w-full'>
          {videoFile && <>
            <VideoInputDetails videoFile={videoFile} onClear={() => {}} />
            <VideoTrim 
            disabled={disabledDuringCompression} 
            onVideoSettingsChange={setVideoSettings}
            videoSettings={videoSettings}
            />
          </>}
        <VideoInputControl disable={disabledDuringCompression} onVideoSettingsChange={setVideoSettings} videoSettings={videoSettings}/>

          <motion.div
            layout
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            key={"button"}
            transition={{type: "tween"}}
            className='bg-gray-100 border border-gray-200 rounded-2xl p-3 h-fit'
          >
            {(status === "notStarted" || status === "converted") && (
              <button onClick={() => {}} type="button" className='bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 rounded-lg text-white relative px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-out duration-500 focus:ring-zinc-950 flex-shrink-0'>
                Condense
              </button>
            )}
          </motion.div>
        </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default condenseVideo