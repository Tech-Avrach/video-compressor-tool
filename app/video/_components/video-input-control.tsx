import React from 'react'
import { motion } from 'framer-motion'
import { QualityType, VideoFormats, VideoInputSettings } from '@/utils/types';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type VideoInputControlProps = {
    videoSettings: VideoInputSettings;
    onVideoSettingsChange: (value: VideoInputSettings) => void;
    disable: boolean;
}


const VideoInputControl = ({ 
    videoSettings,
    onVideoSettingsChange,
    disable
}: VideoInputControlProps) => {
  return (
    <motion.div
      
      className='rounded-2xl px-4 py-3 h-fit bg-gray-100 border border-gray-200 overflow-auto'
    >
      <div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p>
            Remove Audio
          </p>
          <Switch 
            disabled={disable} 
            onCheckedChange={(value: boolean) => onVideoSettingsChange({
              ...videoSettings,
              removeAudio: value
            })}
            checked={videoSettings.removeAudio}
          />
        </div>

        <div className={`flex justify-between items-center border-b mb-2 pb-2 `}>
        <p>Condense for Twitter</p>
        <Switch 
            disabled={disable} 
            onCheckedChange={(value: boolean) => onVideoSettingsChange({
              ...videoSettings,
              twitterCompressionCommand: value
            })}
            checked={videoSettings.twitterCompressionCommand}
          />
        </div>

        <div className={`flex justify-between items-center border-b mb-2 pb-2 `}>
        <p>Condense for Whatsapp Status</p>
        <Switch
            disabled={disable} 
            onCheckedChange={(value: boolean) => onVideoSettingsChange({
              ...videoSettings,
              whatsappCompressionCommand: value
            })}
            checked={videoSettings.whatsappCompressionCommand}
          />
        </div>

        {!videoSettings.twitterCompressionCommand && !videoSettings.whatsappCompressionCommand && (
          <>
            <div className='flex justify-between items-center border-b mb-2 pb-2'>
              <p>
                Quality
              </p>
              <Select 
                disabled={disable}
                value={videoSettings.quality}
                onValueChange={(value: string) => {
                  const quality = value as QualityType;
                  onVideoSettingsChange({
                    ...videoSettings,
                    quality
                  })
                }}
              >
                <SelectTrigger className='w-[100px] text-sm'>
                  <SelectValue placeholder="Select Quality" />
                </SelectTrigger>
                <SelectContent>
                  {quality.map((item) => (
                    <SelectItem key={item.label} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center border-b mb-2 pb-2">
              <p>Format</p>
              <Select
                disabled={disable}
                value={videoSettings.format}
                onValueChange={(value: string) => {
                  const format = value as VideoFormats;
                  onVideoSettingsChange({ ...videoSettings, format });
                }}
              >
                <SelectTrigger className="w-[150px] text-sm">
                  <SelectValue placeholder="Select Format" />
                </SelectTrigger>
                <SelectContent>
                  {format.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
      </motion.div>
  )
}

const quality: {label: string, value: QualityType}[] = [
  {
    label: 'High',
    value: QualityType.High
  },
  {
    label: 'Medium',
    value: QualityType.Medium
  },
  {
    label: 'Low',
    value: QualityType.Low
  }
]

const format: { label: string; value: VideoFormats }[] = [
  { label: "MP4 (.mp4)", value: VideoFormats.MP4 },
  { label: "MOV (.mov)", value: VideoFormats.MOV },
  { label: "MKV (.mkv)", value: VideoFormats.MKV },
  // { label: "FLV (.flv)", value: VideoFormats.FLV },
  // { label: "AVI (.avi)", value: VideoFormats.AVI },
  // { label: "WEBM (.webm)", value: VideoFormats.WEBM },
];

export default VideoInputControl