import { useEffect, useState } from 'react'
import { SimpleDialog } from '../reuseable/Dialog'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@mui/material'
import { useAuthorIdStore } from '../../zustand/authorIdStore'
import { useInsertPurchaseCodes } from '../../data/authors/useInsertPurchaseCodes'
import { getAuth } from 'firebase/auth'
import {
  useGetAuthorBooks,
  AuthorBooks
} from '../../data/authors/useGetAuthorBooks'

interface Books {
  author_id: string
  created_at: string
  description?: string
  file_url: string
  id: number
  title: string
  uuid?: string
}
type CombinedBooks = Books & AuthorBooks

export const GenerateUuid = ({
  children
}: {
  children: React.ReactNode
}) => {
  const auth = getAuth()
  const [open, setOpen] = useState(false)
  const user = auth.currentUser
  const authorId = useAuthorIdStore(
    (state) => state.authorId
  )
  const { insertPurchaseCodes } = useInsertPurchaseCodes()

  const { books: booksData } = useGetAuthorBooks({
    firebaseUid: user?.uid || ''
  })

  const [books, setBooks] = useState<
    CombinedBooks[] | null
  >(null)
  const [selectedBookId, setSelectedBookId] = useState<
    number | null
  >(null)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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

  useEffect(() => {
    (async () => {
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

  const handleGenerateUuid = (bookId: number) => {
    setSelectedBookId(bookId)
    generateUuid(bookId)
  }

  return (
    <div>
      <span
        style={{ margin: '0 auto', display: 'flex' }}
        onClick={handleClickOpen}>
        {children}
      </span>
      <SimpleDialog
        title="Generate Unique Code"
        open={open}
        onClose={handleClose}>
        {books && books.length
          ? books?.map((book: Books) => {
              return (
                <div className="" key={book.id}>
                  <Button
                    className="flex justify-start text-left w-full truncate"
                    onClick={() =>
                      handleGenerateUuid(book.id)
                    }>
                    {book.title}
                  </Button>
                </div>
              )
            })
          : null}
      </SimpleDialog>
    </div>
  )
}
