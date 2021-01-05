import React, { useRef, useState } from "react";

import { Button } from "@material-ui/core";
import MemoryVaultSaveDataMenu from "./MemoryVaultSaveDataMenu";

export default function MemoryVaultSaveDataButton() {
  const anchorRef = useRef(null);
  const [isShowingPopover, setIsShowingPopover] = useState(false);
  return (
    <>
      <Button
        variant="outlined"
        fullWidth
        size="small"
        color="primary"
        onClick={() => setIsShowingPopover(true)}
        ref={anchorRef}
      >
        Save Data
      </Button>
      <MemoryVaultSaveDataMenu
        onClose={() => setIsShowingPopover(false)}
        menuProps={{
          onClose: () => setIsShowingPopover(false),
          open: isShowingPopover,
          anchorEl: anchorRef.current,
        }}
      />
    </>
  );
}
