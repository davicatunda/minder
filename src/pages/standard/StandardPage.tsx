import React, { FunctionComponent } from "react";
import { gql, useQuery } from "@apollo/client";

import { Container } from "@material-ui/core";
import StandardPageAllProposalsSection from "./StandardPageAllProposalsSection";
import StandardPageCreateProposalSection from "./StandardPageCreateProposalSection";
import StandardPageProposedAPISection from "./StandardPageProposedAPISection";
import { VerticalSpace } from "../shared-layout/Spacing";

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
    <Container maxWidth="md">
      <VerticalSpace s2 />
      <StandardPageProposedAPISection standardProposal={standardProposal} />
      <VerticalSpace s2 />
      {data.user?.uuid != null && (
        <>
          <StandardPageCreateProposalSection />
          <VerticalSpace s2 />
        </>
      )}
      <StandardPageAllProposalsSection proposals={proposals} />
    </Container>
  );
};

export default StandardPage;
