import { Button, Paper, TextField, Typography, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import MemoryVault from "../memory/vault/MemoryVault";
import { VerticalSpace } from "../core/Spacing";
import { css } from "@emotion/css";
import { denormalizeRoot } from "../../utils/normalization";

const SUGGESTED_PROPOSAL = {
  "?Parent field": {
    "Proposed Field": {
      type: "text",
      description: "# in markdown",
      "?subfields": ["more fields"],
    },
  },
};
const ADD_PROPOSAL = gql`
  mutation Adding($proposal: String!) {
    addProposal(proposal: $proposal) {
      uuid
    }
  }
`;
const DUMMY_KEY = "1Qd1fIUBT6KuzgM9mQOIkk8k77mkXz/4BGMnttcdY1c=";
export default function StandardPageCreateProposalSection() {
  const theme = useTheme();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [addProposal] = useMutation(ADD_PROPOSAL);
  if (!isCreating) {
    return (
      <Paper
        className={css({
          display: "flex",
          flexDirection: "column",
          padding: theme.spacing(2),
          maxWidth: 380,
          width: "100%",
        })}
      >
        <Typography variant="h6" align="center">
          Start
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <VerticalSpace s2 grow />
        <Button
          size="large"
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
        <>
          <VerticalSpace s2 />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              addProposal({ variables: { proposal: denormalizeRoot(store) } });
              setIsCreating(false);
              setTitle("");
            }}
          >
            Make new proposal
          </Button>
        </>
      )}
    </MemoryVault>
  );
}
