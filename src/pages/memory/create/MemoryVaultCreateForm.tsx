import { Paper, Typography, useTheme } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";

import { CardDataProps } from "../cards/CardRoot";
import { CardListItem } from "../MemoryPage";
import MemoryVaultCreateFormContents from "./MemoryVaultCreateFormContents";
import { v4 as uuid } from "uuid";

type Props = {
  standardProposal: {
    version: string;
    data: string;
  };
  previewCard: CardDataProps;
  setIsCreating: Dispatch<SetStateAction<boolean>>;
  setPreviewCard: Dispatch<SetStateAction<CardDataProps | null>>;
  setCardListItems: Dispatch<SetStateAction<CardListItem[]>>;
};

export default function MemoryVaultCreateForm({
  standardProposal,
  previewCard,
  setIsCreating,
  setPreviewCard,
  setCardListItems,
}: Props) {
  const theme = useTheme();
  return (
    <Paper style={{ padding: theme.spacing(2) }}>
      <Typography variant="h4" color="textPrimary" gutterBottom align="center">
        Open
      </Typography>
      <div style={{ height: theme.spacing(2) }} />
      <MemoryVaultCreateFormContents
        standardProposal={standardProposal}
        value={previewCard}
        setValue={setPreviewCard}
        onSubmit={() => {
          setIsCreating(false);
          setPreviewCard(null);
          setCardListItems((oldCards) => [
            {
              cardProps: { ...previewCard, isReadOnly: false },
              isOpen: true,
              id: uuid(),
            },
            ...oldCards,
          ]);
        }}
        onCancel={() => {
          setIsCreating(false);
          setPreviewCard(null);
        }}
      />
    </Paper>
  );
}
