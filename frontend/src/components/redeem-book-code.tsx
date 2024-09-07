import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { useRedeemCode } from '@/data/users/useRedeemCode'
import { auth } from '@/auth/initAuth'

const schema = z.object({
  code: z.string().uuid()
})

type Schema = z.infer<typeof schema>

export function RedeemBookCode() {
  const { redeemCode } = useRedeemCode()
  const form = useForm<Schema>({
    resolver: zodResolver(schema)
  })
  const onSubmit = async (data: Schema) => {
    if (!data.code || !auth.currentUser?.uid) return

    redeemCode({
      variables: {
        code: data.code,
        firebaseUid: auth.currentUser?.uid || ''
      }
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Redeem Code</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Redeem Your Code</DialogTitle>
          <DialogDescription>
            Enter the code you received to unlock exclusive
            features and benefits.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Input
                {...form.register('code')}
                placeholder="Enter your code"
              />

              <div className="flex justify-end gap-2">
                <Button type="submit">Redeem</Button>
                <div>
                  <DialogClose>
                    <Button variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
