import React, { useState, FunctionComponent } from 'react';
import DataAsList from './row-items/DataAsList';
import STANDARD from './standard.alpha';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Button from './components/Button';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

const ADD_PROPOSAL = gql`
  mutation Adding($proposal: String!) {
    addProposal(proposal: $proposal) {
      uuid
    }
  }
`;
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
      "type": "text",
      "description": "# in markdown",
      "?subfields": ["more fields"]
    }
  }
};
const Standard: FunctionComponent<{}> = () => {
  const history = useHistory();
  const [addProposal] = useMutation(ADD_PROPOSAL);
  const [proposalData, setProposalData] = useState(SUGGESTED_PROPOSAL);
  const { data } = useQuery(ALL_PROPOSALS);
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
      <Button onClick={() => {
        addProposal({ variables: { proposal: JSON.stringify(proposalData) } });
      }}>
        Send
      </Button>
      <h2> All Proposals </h2>
      <ul>
        {
          // @ts-ignore workaround
          data?.proposals.map(({ uuid }) => (
            <li>
              Proposal {uuid}:
              <Button onClick={() => history.push(`/proposal/${uuid}`)}>
                Check it out
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Standard;