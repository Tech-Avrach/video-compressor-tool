import React from 'react'
import { motion } from 'framer-motion'
import { CustomeDropZone } from './coustome-dropzone'
import { acceptedVideoFiles } from '@/utils/formats'

const condenseVideo = () => {

  const handleUpload = (file: File) => {
    console.log(file)
  }

  return (
    <>
      <motion.div className='border rounded-3xl col-span-5 flex w-full md:h-full bg-gray-50/35 '>
        <CustomeDropZone handleUpload={handleUpload} acceptedFiles={acceptedVideoFiles}/>
      </motion.div>
    </>
  )
}

export default condenseVideo