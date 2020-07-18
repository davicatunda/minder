import React, { useState, FunctionComponent } from "react";
import DataAsList from "./row-items/DataAsList";
import STANDARD from "./standard.alpha";
import { gql, useQuery, useMutation } from "@apollo/client";
import Button from "./components/Button";
import { useHistory } from "react-router-dom";

const ADD_PROPOSAL = gql`
  mutation Adding($proposal: String!) {
    addProposal(proposal: $proposal) {
      uuid
    }
  }
`;
type AllProposalsResponse = {
  proposals: Array<{ uuid: string }>;
};
const ALL_PROPOSALS = gql`
  {
    proposals {
      uuid
    }
  }
`;
const SUGGESTED_PROPOSAL = {
  "?Parent field": {
    "Proposed Field": {
      type: "text",
      description: "# in markdown",
      "?subfields": ["more fields"],
    },
  },
};
const Standard: FunctionComponent<{}> = () => {
  const history = useHistory();
  const [addProposal] = useMutation(ADD_PROPOSAL);
  const [proposalData, setProposalData] = useState(SUGGESTED_PROPOSAL);
  const { data } = useQuery<AllProposalsResponse>(ALL_PROPOSALS);
  return (
    <div>
      <h2> Proposed API {0.1}</h2>
      <DataAsList
        node={JSON.parse(STANDARD)}
        // @ts-ignore workaround
        setParentValue={(str: Object) => null}
      />
      <h2> Make a Proposal </h2>
      <DataAsList
        // @ts-ignore workaround
        node={proposalData}
        // @ts-ignore workaround
        setParentValue={setProposalData}
      />
      <Button
        onClick={() => {
          addProposal({
            variables: { proposal: JSON.stringify(proposalData) },
          });
        }}
      >
        Send
      </Button>
      <h2> All Proposals </h2>
      <ul>
        {data?.proposals.map(({ uuid }) => (
          <li key={uuid}>
            Proposal {uuid}:
            <Button onClick={() => history.push(`/minder/proposal/${uuid}`)}>
              Check it out
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Standard;
