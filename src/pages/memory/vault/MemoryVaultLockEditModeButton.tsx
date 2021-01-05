import { Lock, LockOpen } from "@material-ui/icons";

import { Tooltip } from "@material-ui/core";
import { useBreadcrumbsContext } from "./BreadcrumbsProvider";
import { useEditingContext } from "./EditingProvider";

export default function MemoryVaultLockEditModeButton() {
  const { isEditing, setIsEditing } = useEditingContext();
  const { setBreadcrumbs } = useBreadcrumbsContext();

  return isEditing ? (
    <Tooltip title="Unlocked" enterDelay={200}>
      <LockOpen
        onClick={() => {
          setIsEditing(false);
          setBreadcrumbs([]);
        }}
      />
    </Tooltip>
  ) : (
    <Tooltip title="Locked, unlock to edit and move items" enterDelay={1000}>
      <Lock
        onClick={() => {
          setIsEditing(true);
          setBreadcrumbs([]);
        }}
      />
    </Tooltip>
  );
}
