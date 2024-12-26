import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CustomeDropZone } from './coustome-dropzone'
import { acceptedVideoFiles } from '@/utils/formats'
import { FIleActions } from '@/utils/types'
import VideoDisplay from './video-display'
import VideoInputDetails from './video-input-details'

const condenseVideo = () => {

  const [videoFile, setVideoFile] = React.useState<FIleActions>();

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
            <VideoInputDetails videoFile={videoFile} onClear={() => {}}></VideoInputDetails>
          </>}
        </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default condenseVideo