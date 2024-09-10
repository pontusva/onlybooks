import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Play, Pause, Volume2 } from 'lucide-react'
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

  const handleVolumeChange = (newVolume: number[]) => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = newVolume[0]
      setVolume(newVolume[0])
    }
  }

  const handleTimeChange = (newTime: number[]) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = newTime[0]
      setCurrentTime(newTime[0])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <div className="w-screen mx-auto p-2 px-5 bg-background rounded-lg shadow-md">
      <audio ref={audioRef} src="/placeholder.mp3" />
      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={togglePlayPause}
          variant="outline"
          size="icon"
          aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <div className="text-sm font-medium">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      <Slider
        value={[currentTime]}
        max={duration}
        step={1}
        onValueChange={handleTimeChange}
        className="mb-4"
        aria-label="Seek time"
      />
      <div className="flex items-center">
        <Volume2 className="h-4 w-4 mr-2" />
        <Slider
          value={[volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-24"
          aria-label="Adjust volume"
        />
      </div>
    </div>
  )
}

export default HLSPlayer
