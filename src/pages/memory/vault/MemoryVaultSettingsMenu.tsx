import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Delete, MoreHoriz } from "@material-ui/icons";
import React, { useRef, useState } from "react";

import { css } from "@emotion/css";

type Props = {
  onDelete: () => void;
};
export default function MemoryVaultSettingsMenu({ onDelete }: Props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)} ref={ref}>
        <MoreHoriz />
      </IconButton>
      <Menu anchorEl={ref.current} open={isOpen} onClose={() => setIsOpen(false)}>
        <DeleteItem
          onDelete={() => {
            onDelete();
            setIsOpen(false);
          }}
        />
      </Menu>
    </>
  );
}

function DeleteItem({ onDelete }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <MenuItem onClick={() => setIsOpen(true)}>
        <ListItemIcon classes={{ root: css({ minWidth: 36 }) }}>
          <Delete fontSize="small" color="action" />
        </ListItemIcon>
        <Typography>Delete</Typography>
      </MenuItem>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this item?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can not be undone, are you sure you want to procced?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
