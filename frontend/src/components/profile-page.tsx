'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

export function ProfilePage() {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [bio, setBio] = useState(
    'I love coding and building awesome things!'
  )
  const { setTheme } = useTheme()

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const handleEmailVerification = () => {}

  const handleProfileUpdate = () => {}

  const handleAvatarUpload = () => {}

  const handleThemeChange = () => {
    setTheme(isDarkMode ? 'dark' : 'light')
  }

  useEffect(() => {
    handleThemeChange()
  }, [isDarkMode])

  return (
    <Card className="w-screen max-w-2xl mb-32 mx-auto">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your personal information and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar
            className="w-20 h-20 cursor-pointer"
            onClick={handleAvatarUpload}>
            <AvatarImage
              src="/placeholder.svg?height=80&width=80"
              alt={name}
            />
            <AvatarFallback>
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">
              Click the avatar to upload a new picture
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex space-x-2">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={handleEmailVerification}
              disabled={isVerified}>
              {isVerified ? 'Verified' : 'Verify Email'}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="dark-mode">
            Theme Preference
          </Label>
          <Switch
            id="dark-mode"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
          />
          {isDarkMode ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
        </div>

        <Button
          className="w-full"
          onClick={handleProfileUpdate}>
          Update Profile
        </Button>
      </CardContent>
    </Card>
  )
}
