import { Container } from "@material-ui/core";
import StandardPageAllProposalsSection from "./StandardPageAllProposalsSection";
import StandardPageCreateProposalSection from "./StandardPageCreateProposalSection";
import StandardPageProposedAPISection from "./StandardPageProposedAPISection";
import { VerticalSpace } from "../core/Spacing";
import { getAllData } from "../mockDB";

export default function StandardPage() {
  const data = getAllData();
  const { proposals, user } = data;
  return (
    <Container maxWidth="md">
      <VerticalSpace s2 />
      <StandardPageProposedAPISection />
      <VerticalSpace s2 />
      {user.uuid != null && (
        <>
          <StandardPageCreateProposalSection />
          <VerticalSpace s2 />
        </>
      )}
      <StandardPageAllProposalsSection proposals={proposals} />
    </Container>
  );
}
