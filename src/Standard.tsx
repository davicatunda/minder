import React, { useState, FunctionComponent } from "react";
import DataAsList from "./row-items/DataAsList";
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
type StandardPageResponse = {
  user?: {
    uuid: string,
  }
  latestStandard: {
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
    latestStandard {
      version
      data
    }
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
  const { data } = useQuery<StandardPageResponse>(QUERY);
  if (data == null) {
    return null;
  }
  const { latestStandard, proposals } = data;
  return (
    <div>
      <h2> Proposed API {latestStandard.version}</h2>
      <DataAsList
        node={JSON.parse(latestStandard.data)}
        // @ts-ignore workaround
        setParentValue={(str: Object) => null}
      />
      {data.user?.uuid != null && (
        <>
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
        </>
      )}
      <h2> All Proposals </h2>
      <ul>
        {proposals.map(({ uuid }) => (
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
