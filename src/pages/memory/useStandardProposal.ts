import { gql, useQuery } from "@apollo/client";

type MemoryPageResponse = {
  standardProposal: {
    version: string;
    data: string;
  };
};

const QUERY = gql`
  query MemoryPage {
    standardProposal {
      version
      data
    }
  }
`;
export default function useStandardProposal(
  onCompleted?: (data: MemoryPageResponse) => void,
) {
  const { data } = useQuery<MemoryPageResponse>(QUERY, { onCompleted });
  return data?.standardProposal;
}
