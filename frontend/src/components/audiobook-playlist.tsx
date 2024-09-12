import { getAuth } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Play, Pause } from 'lucide-react'
import { useGetRedeemedBooks } from '@/data/users/useGetRedeemedBooks'
import { useAudioStore } from '@/zustand/useAudioStore'
import { RedeemBookCode } from './redeem-book-code'

export function AudiobookPlaylist() {
  const auth = getAuth()

  const { redeemedBooks, loading } = useGetRedeemedBooks({
    firebaseUid: auth.currentUser?.uid || ''
  })

  const {
    setFolderAndFilename,
    play,
    stop,
    currentBookId,
    isPlaying
  } = useAudioStore()

  // Handle play/pause click based on the current playing book and state
  const handlePlayClick = (
    folder: string,
    filename: string,
    bookId: string
  ) => {
    if (currentBookId === bookId) {
      isPlaying ? stop() : play()
    } else {
      stop()
      setFolderAndFilename(folder, filename, bookId)
      play()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-background text-foreground p-4">
      <h2 className="text-2xl font-bold mb-4">
        Audiobook Playlist
      </h2>
      <RedeemBookCode />
      <ScrollArea className="h-[500px] mt-10 pr-4">
        {redeemedBooks &&
          redeemedBooks.length > 0 &&
          redeemedBooks.map((book) => {
            const folder = book.hls_path
              ? book.hls_path.split('/')[0]
              : ''
            const filename = book.hls_path
              ? book.hls_path.split('/')[1]
              : ''

            return (
              <div
                key={book.id}
                className="mb-4 p-4 bg-secondary rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-semibold">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {book.description}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      handlePlayClick(
                        folder,
                        filename,
                        book.id
                      )
                    }
                    aria-label={
                      currentBookId === book.id && isPlaying
                        ? 'Pause'
                        : 'Play'
                    }>
                    {currentBookId === book.id &&
                    isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )
          })}
      </ScrollArea>
    </div>
  )
}
