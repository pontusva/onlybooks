import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { useProcessAudio } from "@/data/authors/useProcessAudio";
import { useUploadFile } from "@/misc/useUploadFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthorIdStore } from "@/zustand/authorIdStore";
import { useGetAuthorBooks } from "@/data/authors/useGetAuthorBooks";
import { getAuth } from "firebase/auth";
import FieldDisplayComponent from "@/components/field-display";
import { useEffect, useState } from "react";
import { useGetAuthor } from "@/data/authors/useGetAuthor";
import { useUpdateAuthor } from "@/data/authors/useUpdateAuthor";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  file: z.instanceof(FileList).optional(),
  imageFile: z.instanceof(FileList).optional(),
});

type Schema = z.infer<typeof schema>;

interface Section {
  label: string;
  value: string;
  isEditing: boolean;
  textArea?: boolean;
  tempValue: string;
}

export function AuthorPage() {
  const authorId = useAuthorIdStore((state) => state.authorId);
  const auth = getAuth();
  const { updateAuthor } = useUpdateAuthor();
  const { data } = useGetAuthor({ firebase_uid: auth.currentUser?.uid || "" });

  const [sections, setSections] = useState<Section[]>([
    {
      label: "About Olivia Davis",
      value: data?.getAuthor?.bio || "",
      isEditing: false,
      textArea: true,
      tempValue: "",
    },
    {
      label: "Contact",
      value: data?.getAuthor?.contact_info || "",
      isEditing: false,
      tempValue: "",
    },
  ]);

  const handleEdit = (index: number) => {
    const newSections = [...sections];
    newSections[index].isEditing = true;
    newSections[index].tempValue = newSections[index].value || "";
    setSections(newSections);
  };

  const handleCancel = (index: number) => {
    const newSections = [...sections];
    newSections[index].isEditing = false;
    newSections[index].tempValue = "";
    setSections(newSections);
  };

  const handleSave = async (index: number) => {
    try {
      const newSections = [...sections];
      newSections[index].value = newSections[index].tempValue;
      newSections[index].isEditing = false;
      setSections(newSections);

      const updateVariables = {
        firebaseUid: auth.currentUser?.uid || "",
        bio: newSections[0].value,
        profilePictureUrl: "",
        contactInfo: JSON.stringify(newSections[1].value),
      };

      await updateAuthor({ variables: updateVariables });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newSections = [...sections];
    newSections[index].tempValue = value;
    setSections(newSections);
  };

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { processAudio } = useProcessAudio();
  const { startUpload } = useUploadFile();
  const { books } = useGetAuthorBooks({
    firebaseUid: auth.currentUser?.uid || "",
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    if (!data.file || data.file.length === 0) {
      console.error("No file provided");
      return;
    }
    const file = data.file[0];
    if (!data.imageFile) return;

    const docs = Array.from(data.imageFile).map((file) => ({
      file,
      docType: "profilePicture",
    }));

    try {
      startUpload(file, async (audio: string) => {
        try {
          if (!authorId) {
            throw new Error("Author ID is missing");
          }

          const result = await processAudio({
            variables: {
              authorId,
              title: data.title,
              description: data.description,
              fileUrl: audio,
              fileName: file.name,
              docs,
            },
          });

          console.log("Process Audio Result:", result);
        } catch (error) {
          console.error("Error processing audio:", error);
        }
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    if (data?.getAuthor) {
      setSections([
        {
          label: "About Olivia Davis",
          value: data.getAuthor.bio || "",
          isEditing: false,
          textArea: true,
          tempValue: "",
        },
        {
          label: "Contact",
          value: data.getAuthor.contact_info || "",
          isEditing: false,
          tempValue: "",
        },
      ]);
    }
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <h1 className="text-lg font-semibold">Olivia Davis</h1>
            <p className="text-sm text-muted-foreground">Author</p>
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
                  className="grid gap-6"
                >
                  <div className="grid gap-2">
                    <Label htmlFor="cover-image">Cover Image</Label>
                    <Input
                      {...form.register("imageFile")}
                      id="cover-image"
                      type="file"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      {...form.register("title")}
                      id="title"
                      type="text"
                      placeholder="Enter book title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      {...form.register("description")}
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
                                if (!e.target.files) return;
                                if (e?.target?.files?.length > 0) {
                                  field.onChange(e.target.files);
                                }
                              }}
                              type="file"
                              placeholder="shadcn"
                            />
                          </FormControl>
                          <FormDescription>
                            Here is where you upload your audio file
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
                Manage the books you have uploaded to your author page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid gap-4">
                    {books?.map((book) => (
                      <div
                        key={book.id}
                        className="grid grid-cols-[100px_1fr_auto] items-center gap-4"
                      >
                        <img
                          src={book.cover_image_url}
                          alt="Book Cover"
                          width={100}
                          height={150}
                          className="rounded-md object-cover"
                          style={{ aspectRatio: "100/150", objectFit: "cover" }}
                        />
                        <div className="grid gap-1">
                          <h3 className="text-lg font-semibold">
                            {book.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {book.description}
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
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <FieldDisplayComponent
            sections={sections}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onSave={handleSave}
            onInputChange={handleInputChange}
          />
        </div>
      </main>
    </div>
  );
}
