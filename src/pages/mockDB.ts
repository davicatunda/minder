const mockData = {
  user: {
    uuid: null,
  },
  proposals: [
    {
      uuid: crypto.randomUUID(),
      data: '{"Personal":{},"Community":{},"Education":{},"Work":{},"Health":{}}',
    },
    {
      uuid: crypto.randomUUID(),
      data: '{"test":{}}',
    },
  ],
};

export const STANDARD_PROPOSAL = {
  version: "1.0.0",
  data: '{"Personal":{},"Community":{},"Education":{},"Work":{},"Health":{}}',
};

export function getAllData(): typeof mockData {
  return mockData;
}

export function getProposalById(proposalId: string) {
  return getAllData().proposals.find(
    (proposal) => proposal.uuid === proposalId,
  );
}

export function addProposal(proposal: string) {
  mockData.proposals.push({ uuid: crypto.randomUUID(), data: proposal });
}
