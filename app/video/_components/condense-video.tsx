import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CustomeDropZone } from './coustome-dropzone'
import { acceptedVideoFiles } from '@/utils/formats'
import { FIleActions, QualityType, VideoFormats, VideoInputSettings } from '@/utils/types'
import VideoDisplay from './video-display'
import VideoInputDetails from './video-input-details'
import VideoTrim from './video-trim'

const condenseVideo = () => {

  const [videoFile, setVideoFile] = React.useState<FIleActions>();
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

  return (
    <>
      <motion.div className='border rounded-3xl col-span-5 flex w-full md:h-full bg-gray-50/35 '>
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
            disabled={true} 
            onVideoSettingsChange={setVideoSettings}
            videoSettings={videoSettings}
            />
          </>}
        </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default condenseVideo