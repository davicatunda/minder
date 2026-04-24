import { Container, Paper, Typography } from "@material-ui/core";

import BreadcrumbPaths from "../memory/vault/BreadcrumbPaths";
import BreadcrumbsProvider from "../memory/vault/BreadcrumbsProvider";
import CardView from "../memory/vault/cards/CardView";
import { DecodedDataContext } from "../memory/useDecodedDataContext";
import { VerticalSpace } from "../core/Spacing";
import { css } from "@emotion/css";
import { normalizeRoot } from "../../utils/normalization";
import { useParams } from "react-router-dom";
import { getProposalById } from "../mockDB";

export default function ProposalPage() {
  const { proposalId } = useParams<{ proposalId: string }>();
  const proposal = getProposalById(proposalId);
  if (proposal == null) {
    return null;
  }
  const title = `Proposals ${proposalId}`;
  const store = normalizeRoot(proposal.data, { title });
  return (
    <Container maxWidth="md">
      <VerticalSpace s2 />
      <BreadcrumbsProvider>
        <DecodedDataContext.Provider value={{ store, updateNodes: null }}>
          <Paper className={css({ position: "relative", padding: 24 })}>
            <BreadcrumbPaths />
            <Typography variant="h3"></Typography>
            <CardView nodeKey={store.rootNode.value} />
          </Paper>
        </DecodedDataContext.Provider>
      </BreadcrumbsProvider>
    </Container>
  );
}
