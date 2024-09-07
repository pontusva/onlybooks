import {
  Sheet,
  SheetTrigger,
  SheetContent
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from '@/auth/initAuth'
import { default as Avatar } from '@/images/undraw_reading_re_29f8.svg'
import { PlayList } from './drawers/PlayList'

const settings = [
  'Profile',
  'Account',
  'Redeem',
  'Dashboard',
  'Logout'
]

export function Navbar() {
  const navigate = useNavigate()

  const handleSettingClick = (setting: string | null) => {
    switch (setting) {
      case 'Profile':
        navigate('/profile')
        break
      case 'Account':
        navigate('/account')
        break
      case 'Redeem':
        navigate('/Library')
        break
      case 'Logout':
        signOut(auth).then(() => console.log('Logged out'))
        break
      default:
        console.log('No action defined for this setting')
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login')
      }
    })

    return () => unsubscribe() // Clean up the listener on component unmount
  }, [navigate])

  return (
    <header className="flex h-20 justify-between w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">
              Toggle navigation menu
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-2 py-6">
            <PlayList />
          </nav>
        </SheetContent>
      </Sheet>
      <h1
        onClick={() => navigate('/')}
        className="flex font-workSans text-xl justify-center w-full">
        a-books
      </h1>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full">
              <img
                src={Avatar}
                width="36"
                height="36"
                className="rounded-full"
                alt="Avatar"
                style={{
                  aspectRatio: '36/36',
                  objectFit: 'cover'
                }}
              />
              <span className="sr-only">
                Toggle user menu
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {settings.map((setting) => (
              <DropdownMenuItem
                key={setting}
                onClick={() => handleSettingClick(setting)}>
                {setting}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
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
