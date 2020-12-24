import React from "react";
import { TextField } from "@material-ui/core";

type Props = {
  title: string;
  setTitle: (title: string) => void;
};
export default function MemoryVaultTitleInput({ title, setTitle }: Props) {
  return (
    <TextField
      variant="outlined"
      margin="dense"
      fullWidth
      label="Title"
      autoComplete="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      autoFocus={title.length === 0}
    />
  );
}
