import { Button, Paper, TextField, Typography, useTheme } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";
import { denormalizeRoot, normalizeRoot } from "../../utils/normalization";
import { gql, useMutation, useQuery } from "@apollo/client";

import CardView from "../memory/vault/cards/CardView";
import { DecodedDataContext } from "../memory/useDecodedDataContext";
import MemoryVault from "../memory/vault/MemoryVault";
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

const StandardPage: FunctionComponent<{}> = () => {
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
  const [isCreating, setIsCreating] = useState(false);
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [addProposal] = useMutation(ADD_PROPOSAL);
  if (!isCreating) {
    return (
      <Paper
        style={{
          padding: theme.spacing(2),
          margin: `${theme.spacing(2)}px auto`,
          maxWidth: 380,
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Typography variant="h5">Start</Typography>
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          style={{ marginBottom: theme.spacing(2) }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => setIsCreating(true)}
        >
          Make new proposal
        </Button>
      </Paper>
    );
  }
  return (
    <MemoryVault
      vaultData={{
        title,
        encryptionKey: DUMMY_KEY,
        initialData: JSON.stringify(SUGGESTED_PROPOSAL),
      }}
      onDelete={() => setIsCreating(false)}
    >
      {(store) => (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            addProposal({ variables: { proposal: denormalizeRoot(store) } });
            setIsCreating(false);
            setTitle("");
          }}
          style={{ marginTop: theme.spacing(2) }}
        >
          Make new proposal
        </Button>
      )}
    </MemoryVault>
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

export default StandardPage;
