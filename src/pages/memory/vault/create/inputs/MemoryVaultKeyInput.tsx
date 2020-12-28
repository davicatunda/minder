import { IconButton, InputAdornment, TextField, Tooltip } from "@material-ui/core";
import { createKey, isKeyValid } from "../../../../../utils/encryption";

import { Cached } from "@material-ui/icons";
import DragAndDrop from "../DragAndDrop";
import React from "react";
import readFile from "./readFile";

type Props = {
  encryptionKey: string;
  setEncryptionKey: (encryptionKey: string) => void;
};
export default function MemoryVaultKeyInput({
  encryptionKey,
  setEncryptionKey,
}: Props) {
  return (
    <DragAndDrop onDrop={(file) => readFile(file, setEncryptionKey)}>
      <TextField
        variant="outlined"
        margin="dense"
        error={encryptionKey.length > 0 && !isKeyValid(encryptionKey)}
        required
        fullWidth
        label="Encryption Key"
        type="password"
        autoComplete="current-encryption-key"
        value={encryptionKey}
        onChange={(e) => setEncryptionKey(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Generate key" arrow>
                <IconButton
                  aria-label="generate encryption Key"
                  onClick={() => createKey().then(setEncryptionKey)}
                >
                  <Cached fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </DragAndDrop>
  );
}
