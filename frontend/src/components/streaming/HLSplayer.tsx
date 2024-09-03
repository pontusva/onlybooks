import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Slider,
  Button,
  Typography
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import StopIcon from '@mui/icons-material/Stop'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeMuteIcon from '@mui/icons-material/VolumeMute'
import { formatTime } from '../../utils'
import Hls from 'hls.js'
import { useAudioStore } from '../../zustand/useAudioStore'
import { useGetRedeemedBooks } from '../../data/users/useGetRedeemedBooks'
import { useCoverImage } from '../../zustand/useCoverImage'
import { auth } from '../../auth/initAuth'

interface HLSPlayerProps {
  folder?: string
  filename?: string
}

const HLSPlayer: React.FC<HLSPlayerProps> = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const {
    folder,
    filename,
    isPlaying,
    togglePlayPause,
    setIsPlaying
  } = useAudioStore()
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1) // Default volume is 1 (100%)
  const setCoverImage = useCoverImage(
    (state) => state.setCoverImage
  )

  const { redeemedBooks } = useGetRedeemedBooks({
    firebaseUid: auth.currentUser?.uid || ''
  })

  useEffect(() => {
    if (redeemedBooks) {
      const audioFile = redeemedBooks.filter(
        (book) => book.hls_path === `${folder}/${filename}`
      )
      if (audioFile.length) {
        setCoverImage(audioFile[0].cover_image_url || null)
      }
    }
  }, [redeemedBooks, folder, filename, setCoverImage])

  useEffect(() => {
    const audio = audioRef.current

    if (audio) {
      if (Hls.isSupported() && folder && filename) {
        const hls = new Hls()
        hls.loadSource(
          `https://existent-beings.com/playlist/${folder}/${filename}`
        )
        hls.attachMedia(audio)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {})

        return () => {
          hls.destroy()
        }
      } else if (
        audio.canPlayType('application/vnd.apple.mpegurl')
      ) {
        audio.src = `https://existent-beings.com/playlist/${folder}/${filename}`
      }
    }
  }, [folder, filename])

  useEffect(() => {
    const audio = audioRef.current

    if (audio) {
      if (isPlaying) {
        audio
          .play()
          .catch((error) =>
            console.error('Playback error:', error)
          )
      } else {
        audio.pause()
      }
    }
  }, [isPlaying, folder, filename])

  useEffect(() => {
    const audio = audioRef.current

    if (audio) {
      const validVolume = Number.isFinite(volume)
        ? Math.max(0, Math.min(1, volume))
        : 1
      audio.volume = validVolume
    }
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current

    if (audio) {
      const updateTime = () =>
        setCurrentTime(audio.currentTime)
      const setAudioDuration = () =>
        setDuration(audio.duration)

      const handleAudioEnd = () => {
        setIsPlaying(false)
      }

      audio.addEventListener('timeupdate', updateTime)
      audio.addEventListener(
        'loadedmetadata',
        setAudioDuration
      )
      audio.addEventListener('ended', handleAudioEnd)

      return () => {
        audio.removeEventListener('timeupdate', updateTime)
        audio.removeEventListener(
          'loadedmetadata',
          setAudioDuration
        )
        audio.removeEventListener('ended', handleAudioEnd)
      }
    }
  }, [setIsPlaying])

  useEffect(() => {
    const audio = audioRef.current

    if (audio) {
      const validVolume = Number.isFinite(volume)
        ? Math.max(0, Math.min(1, volume))
        : 1
      audio.volume = validVolume
    }
  }, [volume])

  const handleSliderChange = (
    _: Event,
    newValue: number | number[]
  ) => {
    const audio = audioRef.current
    const newTime = ((newValue as number) / 100) * duration
    if (audio) {
      setDuration(audio.duration)
      audio.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (
    _: Event,
    newValue: number | number[]
  ) => {
    const newVolume = (newValue as number) / 100
    setVolume(newVolume)
  }

  return (
    <div className="w-screen">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: (theme) =>
            theme.palette.primary.main
        }}>
        <audio ref={audioRef} style={{ display: 'none' }} />
        <div className="flex flex-col">
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <Button
              disabled={!folder || !filename}
              onClick={togglePlayPause}>
              {!isPlaying ? (
                <PlayCircleIcon color="secondary" />
              ) : (
                <StopIcon color="secondary" />
              )}
            </Button>
            <Slider
              value={(currentTime / duration) * 100}
              onChange={handleSliderChange}
              sx={{
                height: 8,
                width: 100,
                '& .MuiSlider-thumb': {
                  bgcolor: '#0A122A', // Dark blue for thumb
                  width: 12,
                  height: 12,
                  border: '2px solid #FFF' // White border for visibility
                },
                '& .MuiSlider-track': {
                  bgcolor: '#3f51b5', // Soft blue for the track
                  border: 'none'
                },
                '& .MuiSlider-rail': {
                  bgcolor: '#e0e0e0' // Light grey for the rail
                },
                '& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible':
                  {
                    boxShadow:
                      '0px 0px 0px 8px rgba(63, 81, 181, 0.16)' // Blue focus ring for accessibility
                  }
              }}
            />

            <Box
              sx={{
                ml: 2,
                display: 'flex',
                alignItems: 'center'
              }}>
              <AccessTimeIcon
                color="secondary"
                sx={{ mr: 0.5 }}
              />
              <Typography variant="body2" color="secondary">
                {formatTime(currentTime)}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end'
            }}>
            {volume === 0 ? (
              <VolumeMuteIcon color="secondary" />
            ) : (
              <VolumeUpIcon color="secondary" />
            )}
            <Slider
              value={volume * 100}
              onChange={handleVolumeChange}
              sx={{
                width: 75,
                height: 8,
                '& .MuiSlider-thumb': {
                  bgcolor: '#333', // Dark grey for contrast
                  width: 12,
                  height: 12,
                  border: '2px solid #FFF' // White border for better visibility
                },
                '& .MuiSlider-track': {
                  bgcolor: '#3f51b5', // Soft blue for a nice contrast with white
                  border: 'none'
                },
                '& .MuiSlider-rail': {
                  bgcolor: '#ddd' // Light grey for a subtle rail
                },
                '& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible':
                  {
                    boxShadow:
                      '0px 0px 0px 8px rgba(63, 81, 181, 0.16)' // Soft blue focus ring
                  }
              }}
            />
          </Box>
        </div>
      </Box>
    </div>
  )
}

export default HLSPlayer
