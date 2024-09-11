import { useGetAuthorBooks } from '@/data/authors/useGetAuthorBooks'
import { getAuth } from 'firebase/auth'
export function HomePage() {
  const auth = getAuth()
  const { books } = useGetAuthorBooks({
    firebaseUid: auth.currentUser?.uid || ''
  })

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[70vh] bg-cover bg-center ">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container h-full flex flex-col justify-center items-start gap-6 px-4 md:px-6">
          <h1 className="text-4xl font-bold text-primary-background sm:text-5xl md:text-6xl">
            Immerse Yourself in Audio Books
          </h1>
          <p className="max-w-[600px] text-lg text-muted-background md:text-xl">
            Discover a world of captivating stories,
            expertly narrated, at your fingertips. Explore
            our vast library of audio books and lose
            yourself in the magic of the spoken word.
          </p>
        </div>
      </section>
      <section className="w-full flex justify-center py-12 md:py-24 lg:py-32">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-6">
          {books?.map((book) => (
            <div
              key={book.id}
              className="flex flex-col items-center gap-2">
              <img
                src={book.cover_image_url}
                width="250"
                height="300"
                alt="Book Cover"
                className="rounded-lg shadow-md"
                style={{
                  aspectRatio: '150/200',
                  objectFit: 'cover'
                }}
              />
              <h3 className="text-lg font-semibold text-foreground">
                {book.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Explore by Category
            </h2>
            <p className="text-muted-foreground">
              Browse our extensive collection of audio books
              by genre, author, or topic.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div
              // href="#"
              className="flex flex-col items-center justify-center gap-2 bg-background rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
              <BookIcon className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Fiction
              </span>
            </div>
            <div
              // href="#"
              className="flex flex-col items-center justify-center gap-2 bg-background rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
              <BookOpenIcon className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Non-Fiction
              </span>
            </div>
            <div
              // href="#"
              className="flex flex-col items-center justify-center gap-2 bg-background rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
              <HeadphonesIcon className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Self-Help
              </span>
            </div>
            <div
              // href="#"
              className="flex flex-col items-center justify-center gap-2 bg-background rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
              <MicIcon className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Podcasts
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}

function BookOpenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function HeadphonesIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  )
}

function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}
