import React, { FunctionComponent } from "react";
import DataAsList from "./row-items/DataAsList";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

type ProposalResponse = {
  proposal: {
    proposal: string;
  };
};
const PROPOSAL = gql`
  query Proposal($uuid: String!) {
    proposal(uuid: $uuid) {
      proposal
    }
  }
`;
const Proposal: FunctionComponent<{}> = () => {
  let { proposalId } = useParams();
  console.log(proposalId);
  const { data } = useQuery<ProposalResponse>(PROPOSAL, {
    variables: { uuid: proposalId },
  });
  if (data == null) {
    return null;
  }
  return (
    <div>
      <h3> Proposals {proposalId} </h3>
      {isJSON(data.proposal.proposal) ? (
        <DataAsList
          node={JSON.parse(data.proposal.proposal)}
          // @ts-ignore workaround
          setParentValue={(str: Object) => null}
        />
      ) : null}
    </div>
  );
};

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
export default Proposal;
