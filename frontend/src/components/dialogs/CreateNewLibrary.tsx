import { ReactNode, useState } from "react";
import { SimpleDialog } from "../reuseable/Dialog";
import { useAuthorIdStore } from "../../zustand/authorIdStore";
import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3),
  mediaType: z.string().min(3),
  provider: z.string().min(6),
});

type Schema = z.infer<typeof schema>;

export const CreateNewLibrary = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const authorId = useAuthorIdStore((state) => state.authorId);

  const [mediaType, setMediaType] = useState<string>("book");
  const [provider, setProvider] = useState<string>("google");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setMediaType(event.target.value as string);
  };

  const handleProviderChange = (event: SelectChangeEvent) => {
    setProvider(event.target.value as string);
  };
  const onSubmit = async (data: Schema) => {
    if (!authorId) return;
  };
  return (
    <>
      <span
        style={{
          margin: "0 auto",
          paddingTop: "4em",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
        onClick={handleClickOpen}
      >
        {children}
      </span>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        title="Create new library"
      >
        <form
          className="flex flex-col justify-center  space-y-10 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            {...register("name")}
            id="standard-basic"
            label="Library Name"
            variant="outlined"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
          <div>
            <InputLabel id="mediaType-select">Media Type</InputLabel>
            <Select
              className="w-full"
              id="mediaType-select"
              {...register("mediaType")}
              value={mediaType}
              onChange={handleChange}
            >
              <MenuItem value="book">Book</MenuItem>
              <MenuItem value="podcast">Podcast</MenuItem>
            </Select>
            {errors.mediaType && (
              <span className="text-red-500">{errors.mediaType.message}</span>
            )}
          </div>
          <div>
            <InputLabel id="provider-select">Meta Provider</InputLabel>
            <Select
              className="w-full"
              id="provider-select"
              {...register("provider")}
              value={provider}
              onChange={handleProviderChange}
            >
              <MenuItem value="google">Google {"(Recomennded)"}</MenuItem>
              <MenuItem value="openlibrary">Open Library</MenuItem>
              <MenuItem value="itunes">Itunes</MenuItem>
              <MenuItem value="audible">Audible</MenuItem>
            </Select>

            {errors.provider && (
              <span className="text-red-500">{errors.provider.message}</span>
            )}
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </SimpleDialog>
    </>
  );
};
