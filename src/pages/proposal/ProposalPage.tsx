import { Container, Paper, Typography } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";

import BreadcrumbPaths from "../memory/vault/BreadcrumbPaths";
import BreadcrumbsProvider from "../memory/vault/BreadcrumbsProvider";
import CardView from "../memory/vault/cards/CardView";
import { DecodedDataContext } from "../memory/useDecodedDataContext";
import React from "react";
import { VerticalSpace } from "../core/Spacing";
import { css } from "@emotion/css";
import { normalizeRoot } from "../../utils/normalization";
import { useParams } from "react-router-dom";

type ProposalResponse = {
  proposal: {
    data: string;
  };
};
const PROPOSAL = gql`
  query Proposal($uuid: String!) {
    proposal(uuid: $uuid) {
      data
    }
  }
`;
export default function ProposalPage() {
  const { proposalId } = useParams<{ proposalId: string }>();
  const { data } = useQuery<ProposalResponse>(PROPOSAL, {
    variables: { uuid: proposalId },
  });
  if (data == null || !isJSON(data.proposal.data)) {
    return null;
  }
  const title = `Proposals ${proposalId}`;
  const store = normalizeRoot(data.proposal.data, { title });
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

function isJSON(text: String) {
  return /^[\],:{}\s]*$/.test(
    text
      .replace(/\\["\\/bfnrtu]/g, "@")
      .replace(
        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g,
        "]",
      )
      .replace(/(?:^|:|,)(?:\s*\[)+/g, ""),
  );
}
