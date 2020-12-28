import { Tooltip, Typography } from "@material-ui/core";

import React from "react";
import { VaultData } from "./MemoryVault";
import useStandardProposal from "../useStandardProposal";

type Props = {
  vaultData: VaultData;
  onChange: (vaultData: VaultData) => void;
};

export default function MemoryVaultLoadingState({ vaultData, onChange }: Props) {
  useStandardProposal(({ standardProposal }) => {
    onChange({ ...vaultData, initialData: standardProposal.data });
  });
  return (
    <Tooltip
      title="This app uses a free tier Heroku Dyno and will sleep after 30 minutes of inactivity"
      arrow
    >
      <Typography variant="body1" display="inline">
        Warming up the server just for you...
      </Typography>
    </Tooltip>
  );
}
