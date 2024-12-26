import { FIleActions } from '@/utils/types'
import React from 'react'
import { motion } from 'framer-motion'
import { on } from 'events';
import { bytesToSize } from '@/utils/bytesToSize';

const VideoInputDetails = ({  videoFile, onClear }: {
    videoFile: FIleActions;
    onClear: () => void
}) => {
  return (
    <motion.div className='rounded-2xl px-4 py-3 h-fit bg-gray-100 border border-gray-200 overflow-auto'>
        <div className='text-sm w-full'>
            <div className='flex items-center justify-between border-b mb-2 pb-2'>
                <p>File Input</p>
                <button type='button' onClick={onClear} className='bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-950 to-zinc-950 rounded-lg text-white relative px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-out duration-500 focus:ring-zinc-950 flex-shrink-0'>Clear</button>
            </div>
            <p className='border-b mb-2 pb-2'>{videoFile.fileName}</p>
            <div className='flex justify-between items-center'>
                <p>File Size</p>
                <p>{bytesToSize(videoFile.fileSize)}</p>
            </div>
        </div>
    </motion.div>
  )
}

export default VideoInputDetails