import { Paper, Typography } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";

import CardView from "../memory/vault/cards/CardView";
import { DecodedDataContext } from "../memory/useDecodedDataContext";
import React from "react";
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
  const store = normalizeRoot(data.proposal.data, {});
  return (
    <DecodedDataContext.Provider value={{ store, updateNodes: null }}>
      <Paper style={{ position: "relative", padding: 24 }}>
        <Typography variant="h3">Proposals {proposalId}</Typography>
        <CardView nodeKey={store.rootNode.value} />
      </Paper>
    </DecodedDataContext.Provider>
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
