import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Play, Pause, Volume2 } from 'lucide-react'

export function MediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () =>
      setCurrentTime(audio.currentTime)

    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)

    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
    }
  }, [])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeChange = (newTime: number[]) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = newTime[0]
      setCurrentTime(newTime[0])
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = newVolume[0]
      setVolume(newVolume[0])
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
    <div className="w-full max-w-md mx-auto p-4 bg-background rounded-lg shadow-md">
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
