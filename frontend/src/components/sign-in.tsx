import {
  Card,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  signInWithEmailAndPassword,
  getAuth
} from 'firebase/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import { useForm } from 'react-hook-form'
import {
  Form
  // FormControl,
  // FormDescription,
  // FormField,
  // FormItem,
  // FormLabel,
  // FormMessage
} from '@/components/ui/form'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

type Schema = z.infer<typeof schema>

export function SignIn() {
  const auth = getAuth()
  const navigate = useNavigate()
  const form = useForm<Schema>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: Schema) => {
    signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    )
      .then((userCredential) => {
        const user = userCredential.user
        if (user) {
          navigate('/')
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode || errorMessage) {
          throw new Error(errorCode || errorMessage)
        }
      })
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Don't have an account?{' '}
            <div
              // href="#"
              className="font-medium underline underline-offset-4">
              Register
            </div>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register('email')}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">
                      Password
                    </Label>
                    <div
                      // href="#"
                      className="text-sm font-medium underline underline-offset-4 text-primary hover:text-primary/80">
                      Forgot password?
                    </div>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...form.register('password')}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  )
}
