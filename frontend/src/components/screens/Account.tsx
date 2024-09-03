import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Chip, Typography } from '@mui/material'
import { UserAccount } from './UserAccounts'
import { AuthorAccount } from './AuthorAccount'
import { Loader } from '../reuseable/Loader'
import { useIsAuthor } from '../../data/authors/useIsAuthor'

export const Account = () => {
  const [firebaseUid, setFirebaseUid] = useState<
    string | null
  >(null)
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUid(user.uid)
      } else {
        setFirebaseUid(null)
      }
    })

    return () => unsubscribe()
  }, [auth])

  const { isAuthor, loading } = useIsAuthor({
    firebase_uid: firebaseUid || ''
  })

  if (loading || !firebaseUid) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <div className="mt-24 flex justify-center">
        <Chip
          label={
            <Typography
              variant="body2"
              sx={{ fontWeight: 'medium' }}>
              Account:{' '}
              {isAuthor && isAuthor.is_author
                ? 'Author'
                : 'User'}
            </Typography>
          }
          variant="outlined"
          sx={{
            padding: '4px 6px', // Reduced padding for a more subtle look
            margin: '8px',
            backgroundColor: (theme) =>
              isAuthor && isAuthor.is_author
                ? theme.palette.primary.main
                : theme.palette.secondary.main, // Softer background colors
            color: (theme) =>
              theme.palette.primary.contrastText,
            borderRadius: '6px' // Slightly less rounded corners
          }}
        />
      </div>
      {isAuthor?.is_author ? (
        <AuthorAccount />
      ) : (
        <UserAccount />
      )}
    </>
  )
}
