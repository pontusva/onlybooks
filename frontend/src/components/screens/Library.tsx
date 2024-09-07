import { UserLibrary } from './UserLibrary'
import { useUidStore } from '../../zustand/userStore'
import { useEffect } from 'react'
import { AuthorLibrary } from './AuthorLibrary'
import { Loader } from '../reuseable/Loader'
import { AuthorDashboard } from '@/components/author-dashboard'

import { useIsAuthor } from '../../data/authors/useIsAuthor'

export const Library = () => {
  const uid = useUidStore((state) => state.uid)

  const { isAuthor, loading } = useIsAuthor({
    firebase_uid: uid || ''
  })

  useEffect(() => {}, [uid])

  return loading ? (
    <div className="h-screen w-screen flex justify-center items-center">
      <Loader />
    </div>
  ) : isAuthor ? (
    <AuthorDashboard />
  ) : (
    <UserLibrary />
  )
}
