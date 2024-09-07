import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { UserAccount } from './UserAccounts'
import { Loader } from '../reuseable/Loader'
import { useIsAuthor } from '../../data/authors/useIsAuthor'
import { AuthorPage } from '@/components/author-page'

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
      {isAuthor?.is_author ? (
        <AuthorPage />
      ) : (
        <UserAccount />
      )}
    </>
  )
}
