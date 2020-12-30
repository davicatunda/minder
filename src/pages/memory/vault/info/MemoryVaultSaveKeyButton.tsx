import React, { useRef, useState } from "react";

import { Button } from "@material-ui/core";
import MemoryVaultSaveKeyMenu from "./MemoryVaultSaveKeyMenu";
import useDecodedDataContext from "../../useDecodedDataContext";

export default function MemoryVaultSaveKeyButton() {
  const { encryptionKey } = useDecodedDataContext();
  const anchorRef = useRef(null);
  const [isShowingPopover, setIsShowingPopover] = useState(false);
  if (!encryptionKey) {
    return null;
  }
  return (
    <>
      <Button
        size="small"
        color="primary"
        onClick={() => setIsShowingPopover(true)}
        ref={anchorRef}
      >
        Save Key
      </Button>
      <MemoryVaultSaveKeyMenu
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
