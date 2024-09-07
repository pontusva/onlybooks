import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRedeemCode } from '../../data/users/useRedeemCode'
import { useUidStore } from '../../zustand/userStore'
import { Button, TextField } from '@mui/material'
import { SimpleDialog } from '../reuseable/Dialog'
import { ReactNode, useState } from 'react'

interface paddingTop {
  children: ReactNode
  paddingTop?: number
}

const schema = z.object({
  code: z.string().uuid()
})

type Schema = z.infer<typeof schema>

export const RedeemCodeDialog = ({
  children,
  paddingTop
}: paddingTop) => {
  const [open, setOpen] = useState(false)
  const { redeemCode } = useRedeemCode()
  const firebase_uid = useUidStore((state) => state.uid)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Schema>({ resolver: zodResolver(schema) })
  const onSubmit = async (data: Schema) => {
    if (!data.code || !firebase_uid) return
    redeemCode({
      variables: {
        code: data.code,
        firebaseUid: firebase_uid || ''
      }
    })
  }

  return (
    <div className="relative z-50">
      <span
        style={{
          margin: '0 auto',
          paddingTop,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row'
        }}
        onClick={handleClickOpen}>
        {children}
      </span>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        title="Redeem Code">
        <form
          className="flex items-center justify-center flex-col"
          onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('code')}
            id="standard-basic"
            label="code"
            variant="outlined"
            style={{ width: '18rem' }}
          />
          {errors.code && (
            <span className="text-red-500">
              {errors.code.message}
            </span>
          )}
          <Button sx={{ paddingTop: 2 }} type="submit">
            Redeem Code
          </Button>
        </form>
      </SimpleDialog>
    </div>
  )
}
