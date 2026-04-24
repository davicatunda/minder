import { Paper, useTheme } from "@material-ui/core";

import BreadcrumbPaths from "../memory/vault/BreadcrumbPaths";
import BreadcrumbsProvider from "../memory/vault/BreadcrumbsProvider";
import CardView from "../memory/vault/cards/CardView";
import { DecodedDataContext } from "../memory/useDecodedDataContext";
import { css } from "@emotion/css";
import { normalizeRoot } from "../../utils/normalization";
import { STANDARD_PROPOSAL } from "../mockDB";

export default function StandardPageProposedAPISection() {
  const theme = useTheme();
  const title = `Proposed API ${STANDARD_PROPOSAL.version}`;
  const store = normalizeRoot(STANDARD_PROPOSAL.data, { title });
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
