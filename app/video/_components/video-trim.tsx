import { VideoInputSettings } from '@/utils/types'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { VideoSlider } from '@/components/ui/video-slider';
import { calculateTimeInHoursMinutesSeconds } from '@/utils/timeConverter';


type VideoTrimProps = {
    videoSettings: VideoInputSettings;
    onVideoSettingsChange: (value: VideoInputSettings) => void;
    disabled: boolean;
}
const VideoTrim = ({
    videoSettings,
    onVideoSettingsChange,
    disabled
}: VideoTrimProps) => {
  const [videoEndTime, setVideoEndTime] = useState(0);
  const { customeStartTime, customeEndTime } = videoSettings;
  const startTime = calculateTimeInHoursMinutesSeconds(customeStartTime);
  const endTime = calculateTimeInHoursMinutesSeconds(customeEndTime);


  useEffect(() => {
    
    const video = document.getElementById('condensed-video-player') as HTMLVideoElement;

    if (video) {
      const handleLoadedMetadata = () => {
        const durationInSeconds = video.duration; 
        onVideoSettingsChange({
          ...videoSettings,
          customeEndTime: durationInSeconds
        })
        setVideoEndTime(durationInSeconds);
      }

      video.addEventListener('loadedmetadata', handleLoadedMetadata); 

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    }
  }, [])
  return (
    <motion.div 
      layout
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      key={"drag"}
      transition={{type: "tween"}}
      className='rounded-2xl px-4 py-3 h-fit bg-gray-100 border border-gray-200 overflow-auto'
    >
      <div className='text-sm'>
        <div className='flex items-center justify-between border-b mb-2 pb-2'>
          <p>Trim Video</p>
        </div>
        <div className='flex justify-between items-center border-b mb-2 pb-2'>
          <VideoSlider 
          disabled={disabled} 
          value={[customeStartTime, customeEndTime]}
          max={videoEndTime}
          step={1}
          className='w-full'
          onValueChange={(value: number[]) => {
            const [startTime, endTime] = value;
            onVideoSettingsChange({
              ...videoSettings,
              customeStartTime: startTime,
              customeEndTime: endTime
            });
          }}
          />
        </div>
        <div className='flex justify-between'>
          <div>
            <p className='text-gray-500'>Start Time</p>
            <p className='font-medium'>{startTime}</p>
          </div>
          <div>
            <p className='text-gray-500'>End Time</p>
            <p className='font-medium'>{endTime}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default VideoTrim