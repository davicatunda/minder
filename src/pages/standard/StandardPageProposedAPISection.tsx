import { Paper, Typography, useTheme } from "@material-ui/core";

import CardView from "../memory/vault/cards/CardView";
import { DecodedDataContext } from "../memory/useDecodedDataContext";
import React from "react";
import { css } from "@emotion/css";
import { normalizeRoot } from "../../utils/normalization";

type Props = {
  standardProposal: {
    version: string;
    data: string;
  };
};
export default function StandardPageProposedAPISection({ standardProposal }: Props) {
  const theme = useTheme();
  const store = normalizeRoot(standardProposal.data, {});
  return (
    <DecodedDataContext.Provider value={{ store, updateNodes: null }}>
      <Paper className={css({ padding: theme.spacing(3) })}>
        <Typography variant="h6" gutterBottom>
          Proposed API {standardProposal.version}
        </Typography>
        <CardView nodeKey={store.rootNode.value} />
      </Paper>
    </DecodedDataContext.Provider>
  );
}
