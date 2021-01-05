import { Paper, useTheme } from "@material-ui/core";

import BreadcrumbPaths from "../memory/vault/BreadcrumbPaths";
import BreadcrumbsProvider from "../memory/vault/BreadcrumbsProvider";
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
  const title = `Proposed API ${standardProposal.version}`;
  const store = normalizeRoot(standardProposal.data, { title });
  return (
    <BreadcrumbsProvider>
      <DecodedDataContext.Provider value={{ store, updateNodes: null }}>
        <Paper className={css({ padding: theme.spacing(3) })}>
          <BreadcrumbPaths />
          <CardView nodeKey={store.rootNode.value} />
        </Paper>
      </DecodedDataContext.Provider>
    </BreadcrumbsProvider>
  );
}
