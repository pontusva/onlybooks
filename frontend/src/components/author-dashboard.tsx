import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetTrigger,
  SheetContent
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { getAuth } from 'firebase/auth'
import { useAuthorIdStore } from '@/zustand/authorIdStore'
import { v4 as uuidv4 } from 'uuid'
import {
  useGetAuthorBooks,
  AuthorBooks
} from '@/data/authors/useGetAuthorBooks'
import { useGetPurchaseCodes } from '@/data/authors/useGetPurchaseCodes'
import { useInsertPurchaseCodes } from '@/data/authors/useInsertPurchaseCodes'
import { useEffect, useState } from 'react'

interface Books {
  author_id: string
  created_at: string
  description?: string
  file_url: string
  id: number
  title: string
  uuid?: string
  cover_image_url: string
}
type CombinedBooks = Books & AuthorBooks

interface Code {
  id?: string
  title: string
  code: string
  is_redeemed: boolean
}

interface GroupedCodes {
  [title: string]: Code[]
}

export function AuthorDashboard() {
  const auth = getAuth()

  const { books: booksData } = useGetAuthorBooks({
    firebaseUid: auth.currentUser?.uid || ''
  })

  const authorId = useAuthorIdStore(
    (state) => state.authorId
  )
  const { insertPurchaseCodes } = useInsertPurchaseCodes()
  const [books, setBooks] = useState<
    CombinedBooks[] | null
  >(null)
  const [selectedBookId, setSelectedBookId] = useState<
    number | null
  >(null)
  const [codes, setCodes] = useState<Code[]>([])

  const generateUuid = (bookId: number) => {
    setBooks(
      (currentBooks) =>
        currentBooks?.map((book: CombinedBooks) =>
          book.id === bookId
            ? { ...book, uuid: uuidv4() }
            : book
        ) || []
    )
  }
  const insertCode = async (book: Books) => {
    try {
      if (!authorId || !book.uuid) return
      insertPurchaseCodes({
        variables: {
          audioFileId: String(book?.id),
          authorId,
          code: book?.uuid,
          expiresAt: new Date().toISOString(),
          isRedeemed: false
        }
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const { purchaseCodes } = useGetPurchaseCodes({
    firebaseUid: auth.currentUser?.uid || ''
  })

  const groupedCodes: GroupedCodes | null =
    codes.length > 0
      ? codes.reduce((acc: GroupedCodes, code: Code) => {
          if (!code.is_redeemed) {
            if (!acc[code.title]) {
              acc[code.title] = []
            }
            acc[code.title].push(code)
          }
          return acc
        }, {} as GroupedCodes)
      : null

  const handleGenerateUuid = (bookId: number) => {
    setSelectedBookId(bookId)
    generateUuid(bookId)
  }

  useEffect(() => {
    if (selectedBookId !== null) {
      const updatedBook = books?.find(
        (book: Books) => book.id === selectedBookId
      )
      if (updatedBook) {
        insertCode(updatedBook)
      }
      setSelectedBookId(null)
    }
  }, [books])

  useEffect(() => {
    ;(async () => {
      if (!authorId || !booksData) return
      setBooks(
        booksData.map((book) => ({
          ...book,
          id: Number(book.id)
        })) as unknown as CombinedBooks[]
      )
    })()
  }, [booksData, authorId])

  useEffect(() => {
    if (!authorId || !purchaseCodes) return
    setCodes(purchaseCodes)
  }, [purchaseCodes, authorId, codes])

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex items-center gap-4">
          <img
            src="/placeholder.svg"
            width={36}
            height={36}
            alt="Avatar"
            className="rounded-full"
            style={{
              aspectRatio: '36/36',
              objectFit: 'cover'
            }}
          />
          <div>
            <h2 className="text-lg font-medium">
              John Doe
            </h2>
            <p className="text-sm text-muted-foreground">
              Author
            </p>
          </div>
        </div>
        <NavigationMenu className="ml-auto hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <div
                // href="#"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                My Books
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <div
                // href="#"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                My Codes
              </div>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="lg:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <div
                // href="#"
                className="flex items-center gap-4 px-2.5 text-foreground">
                <BookIcon className="h-5 w-5" />
                My Books
              </div>
              <div
                // href="#"
                className="flex items-center gap-4 px-2.5 text-foreground">
                <CodeIcon className="h-5 w-5" />
                My Codes
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <section className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>My Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books && books.length
                  ? books?.map((book: Books) => {
                      return (
                        <Card>
                          <CardContent className="flex flex-col items-center gap-2">
                            <div className="" key={book.id}>
                              <img
                                src={book.cover_image_url}
                                alt="Book Cover"
                                className="pt-5 w-full h-full object-cover rounded-md"
                                style={{
                                  aspectRatio: '150/200',
                                  objectFit: 'cover'
                                }}
                              />
                              <div className="text-center">
                                <h3 className="text-lg font-medium">
                                  {book.title}
                                </h3>
                                <Button
                                  onClick={() =>
                                    handleGenerateUuid(
                                      book.id
                                    )
                                  }
                                  size="sm"
                                  className="mt-2">
                                  Create Code
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })
                  : null}
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="w-full">
          <Card className="mb-24">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>My Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedCodes &&
                    Object.keys(groupedCodes).map((title) =>
                      groupedCodes[title].map(
                        (code, index) => (
                          <TableRow key={code.code}>
                            <TableCell>
                              {index === 0 ? title : ''}
                            </TableCell>
                            <TableCell
                              onClick={() =>
                                handleCopy(code.code)
                              }
                              className="hover:text-orange-400 cursor-pointer">
                              {code.code}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                Active
                              </Badge>
                            </TableCell>
                          </TableRow>
                        )
                      )
                    )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>
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

function CodeIcon(props) {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
