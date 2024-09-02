import {
  signInWithEmailAndPassword,
  getAuth
} from 'firebase/auth'
import { TextField, Button } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { default as SignInBackground } from '../images/undraw_reading_re_29f8.svg'
import z from 'zod'
import { useForm } from 'react-hook-form'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

type Schema = z.infer<typeof schema>

export const SignIn = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Schema>({ resolver: zodResolver(schema) })

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
    <>
      <div className="w-80 h-80 absolute p-20">
        <img
          src={SignInBackground}
          alt="Sign in background"
        />
      </div>
      <form
        className="flex flex-col justify-center h-screen space-y-10 p-5 bg-white bg-opacity-80 rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('email')}
          id="standard-basic"
          label={
            <span className="text-gray-700">Email</span>
          }
          variant="outlined"
        />
        {errors.email && (
          <span className="text-red-500">
            {errors.email.message}
          </span>
        )}
        <TextField
          {...register('password')}
          id="standard-basic"
          type="password"
          label={
            <span className="text-gray-700">Password</span>
          }
          variant="outlined"
        />
        {errors.password && (
          <span className="text-red-500">
            {errors.password.message}
          </span>
        )}
        <Button type="submit">Login</Button>
      </form>
    </>
  )
}
