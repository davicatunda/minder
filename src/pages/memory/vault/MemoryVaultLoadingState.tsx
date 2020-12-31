import { Tooltip, Typography } from "@material-ui/core";

import React from "react";
import useStandardProposal from "../useStandardProposal";

type Props = {
  onDataLoaded: (standardProposal: string) => void;
};

export default function MemoryVaultLoadingState({ onDataLoaded }: Props) {
  useStandardProposal(({ standardProposal }) => {
    onDataLoaded(standardProposal.data);
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
