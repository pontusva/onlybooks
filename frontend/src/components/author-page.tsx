import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '@/components/ui/avatar'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import z from 'zod'
import { useProcessAudio } from '@/data/authors/useProcessAudio'
import { useUploadFile } from '@/misc/useUploadFile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthorIdStore } from '@/zustand/authorIdStore'

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  file: z.instanceof(FileList).optional(),
  imageFile: z.instanceof(FileList).optional()
})

type Schema = z.infer<typeof schema>

export function AuthorPage() {
  const authorId = useAuthorIdStore(
    (state) => state.authorId
  )

  const form = useForm<Schema>({
    resolver: zodResolver(schema)
  })

  const { processAudio } = useProcessAudio()
  const { uploadProgress, startUpload } = useUploadFile()

  const onSubmit = async (data: Schema) => {
    console.log(data)
    if (!data.file || data.file.length === 0) {
      console.error('No file provided')
      return
    }
    const file = data.file[0]
    if (!data.imageFile) return

    const docs = Array.from(data.imageFile).map((file) => ({
      file,
      docType: 'profilePicture'
    }))

    try {
      startUpload(file, async (audio: string) => {
        try {
          if (!authorId) {
            throw new Error('Author ID is missing')
          }

          const result = await processAudio({
            variables: {
              authorId,
              title: data.title,
              description: data.description,
              fileUrl: audio,
              fileName: file.name,
              docs
            }
          })

          console.log('Process Audio Result:', result)
        } catch (error) {
          console.error('Error processing audio:', error)
        }
      })
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src="/placeholder-user.jpg"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <h1 className="text-lg font-semibold">
              Olivia Davis
            </h1>
            <p className="text-sm text-muted-foreground">
              Author
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Settings
          </Button>
          <Button size="sm">Publish</Button>
        </div>
      </header>
      <main className="container mx-auto my-8 grid gap-8 px-4 sm:px-6 md:grid-cols-[1fr_300px] lg:gap-12">
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Add New Book</CardTitle>
              <CardDescription>
                Upload a new book to your author page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="cover-image">
                      Cover Image
                    </Label>
                    <Input
                      {...form.register('imageFile')}
                      id="cover-image"
                      type="file"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      {...form.register('title')}
                      id="title"
                      type="text"
                      placeholder="Enter book title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">
                      Description
                    </Label>
                    <Textarea
                      {...form.register('description')}
                      id="description"
                      placeholder="Enter book description"
                      className="min-h-[120px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Book file</FormLabel>
                          <FormControl>
                            <Input
                              onChange={(e) => {
                                if (!e.target.files) return
                                if (
                                  e?.target?.files?.length >
                                  0
                                ) {
                                  field.onChange(
                                    e.target.files
                                  )
                                }
                              }}
                              type="file"
                              placeholder="shadcn"
                            />
                          </FormControl>
                          <FormDescription>
                            Here is wher you upload your
                            audio file
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Upload Book
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card className="md:mb-24">
            <CardHeader>
              <CardTitle>Your Books</CardTitle>
              <CardDescription>
                Manage the books you have uploaded to your
                author page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-[100px_1fr_auto] items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    alt="Book Cover"
                    width={100}
                    height={150}
                    className="rounded-md object-cover"
                    style={{
                      aspectRatio: '100/150',
                      objectFit: 'cover'
                    }}
                  />
                  <div className="grid gap-1">
                    <h3 className="text-lg font-semibold">
                      The Joke Tax Chronicles
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      A hilarious tale of a lazy king and a
                      mischievous jokester.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-[100px_1fr_auto] items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    alt="Book Cover"
                    width={100}
                    height={150}
                    className="rounded-md object-cover"
                    style={{
                      aspectRatio: '100/150',
                      objectFit: 'cover'
                    }}
                  />
                  <div className="grid gap-1">
                    <h3 className="text-lg font-semibold">
                      The Rise of the Robots
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      An exploration of the future of
                      artificial intelligence.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="mb-24 md:mb-0">
            <CardHeader>
              <CardTitle>Author Bio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <h3 className="text-lg font-semibold">
                    About Olivia Davis
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Olivia Davis is a prolific author and
                    storyteller. She has been writing for
                    over a decade, captivating readers with
                    her unique voice and imaginative
                    narratives.
                  </p>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-lg font-semibold">
                    Contact
                  </h3>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <p>Email: olivia.davis@example.com</p>
                    <p>Twitter: @oliviadavis</p>
                    <p>Instagram: @oliviadavis</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
