
import React, { useState, FunctionComponent } from 'react';
import DataAsList from './row-items/DataAsList';
import STANDARD from './standard.alpha';
const example = { "?Some field": { "Proposed Field": { "type": "text", "description": "# in markdown", "?subfields": ["more fields"] } } }
const Standard: FunctionComponent<{}> = () => {
  const [proposalData, setProposalData] = useState(example);
  console.log(proposalData);
  return (
    <div>
      <h2> Make a Proposal </h2>
      <DataAsList
        // @ts-ignore workaround
        node={proposalData}
        // @ts-ignore workaround
        setParentValue={setProposalData}
      />

      <h2> Make a Proposal </h2>
      [WIP]

      <h2> Make a Proposal </h2>
      [WIP]
    </div>
  );
}

export default Standard;