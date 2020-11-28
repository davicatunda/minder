import { Button, Paper, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import {
  TNode,
  normalizeRoot,
  recursivelyDenormalizeNode,
} from "./utils/normalization";
import { gql, useMutation, useQuery } from "@apollo/client";

import CardView from "./card-items/CardView";
import { DecodedDataContext } from "./card-items/CardViewRoot";
import { useDataEncryptionInSync } from "./utils/encryption";
import { useHistory } from "react-router-dom";

const ADD_PROPOSAL = gql`
  mutation Adding($proposal: String!) {
    addProposal(proposal: $proposal) {
      uuid
    }
  }
`;
type StandardPageResponse = {
  user?: {
    uuid: string;
  };
  standardProposal: {
    version: string;
    data: string;
  };
  proposals: Array<{ uuid: string }>;
};
const QUERY = gql`
  query StandardPage {
    user {
      uuid
    }
    standardProposal {
      version
      data
    }
    proposals {
      uuid
    }
  }
`;

const Standard: FunctionComponent<{}> = () => {
  const { data } = useQuery<StandardPageResponse>(QUERY);
  if (data == null) {
    return null;
  }
  const { standardProposal, proposals } = data;
  return (
    <div>
      <ProposedAPISection standardProposal={standardProposal} />
      {data.user?.uuid != null && <MakeAProposalSection />}
      <AllProposalsSection proposals={proposals} />
    </div>
  );
};

type ProposedAPISectionProps = {
  standardProposal: {
    version: string;
    data: string;
  };
};
function ProposedAPISection({ standardProposal }: ProposedAPISectionProps) {
  const store = normalizeRoot(standardProposal.data, {});
  return (
    <DecodedDataContext.Provider value={{ store, updateNodes: null }}>
      <Paper style={{ position: "relative", padding: 24 }}>
        <Typography variant="h2">Proposed API {standardProposal.version}</Typography>
        <CardView nodeKey={store.rootNode.value} />
      </Paper>
    </DecodedDataContext.Provider>
  );
}

const SUGGESTED_PROPOSAL = {
  "?Parent field": {
    "Proposed Field": {
      type: "text",
      description: "# in markdown",
      "?subfields": ["more fields"],
    },
  },
};
const DUMMY_KEY = "1Qd1fIUBT6KuzgM9mQOIkk8k77mkXz/4BGMnttcdY1c=";
function MakeAProposalSection() {
  const [addProposal] = useMutation(ADD_PROPOSAL);
  const { decodedData, setDecodedData } = useDataEncryptionInSync(
    DUMMY_KEY,
    JSON.stringify(SUGGESTED_PROPOSAL),
  );
  if (!decodedData) {
    return null;
  }
  const store = normalizeRoot(decodedData, {});
  const updateNodes = (nodes: TNode[]) => {
    const newNodes = { ...store.nodes };
    nodes.forEach((node) => (newNodes[node.key] = node));
    setDecodedData(
      JSON.stringify(recursivelyDenormalizeNode(newNodes, store.rootNode.value)),
    );
  };
  return (
    <DecodedDataContext.Provider value={{ store, updateNodes }}>
      <Paper style={{ position: "relative", padding: 24 }}>
        <CardView nodeKey={store.rootNode.value} />
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => addProposal({ variables: { proposal: decodedData } })}
      >
        Send
      </Button>
    </DecodedDataContext.Provider>
  );
}
type AllProposalsSectionProps = {
  proposals: Array<{ uuid: string }>;
};
function AllProposalsSection({ proposals }: AllProposalsSectionProps) {
  const history = useHistory();
  return (
    <Paper style={{ position: "relative", padding: 24 }}>
      <Typography variant="h2">All Proposals</Typography>
      <ul>
        {proposals.map(({ uuid }) => (
          <li key={uuid}>
            Proposal {uuid}:
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(`/minder/proposal/${uuid}`)}
            >
              Check it out
            </Button>
          </li>
        ))}
      </ul>
    </Paper>
  );
}

export default Standard;
