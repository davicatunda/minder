import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import MemoryVault, { CardDataProps } from "./vault/MemoryVault";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import { Add } from "@material-ui/icons";
import CardNavBar from "./navbar/CardNavBar";
import MemoryPageLayout from "./MemoryPageLayout";
import MemoryVaultCreateForm from "./create/MemoryVaultCreateForm";
import MemoryVaultPreview from "./vault/MemoryVaultPreview";
import useCardFromUrl from "./useCardFromUrl";
import { v4 as uuid } from "uuid";

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

export type CardListItem = {
  id: string;
  isOpen: boolean;
  cardProps: CardDataProps;
};
export default function MemoryPage() {
  const theme = useTheme();
  const { initialCard, initialPreviewCard } = useCardFromUrl();
  const [cardListItems, setCardListItems] = useState<CardListItem[]>(
    initialCard ? [{ id: uuid(), isOpen: true, cardProps: initialCard }] : [],
  );
  const [previewCard, setPreviewCard] = useState<CardDataProps | null>(
    initialPreviewCard,
  );
  const [isCreating, setIsCreating] = useState(false);
  const { data } = useQuery<MemoryPageResponse>(QUERY);
  const initialData = data && {
    title: "",
    initialValues: {
      encryptionKey: "",
      initialData: data.standardProposal.data,
    },
    isReadOnly: true,
  };
  const LeftNav = (
    <>
      <CardNavBar
        cardListItems={cardListItems}
        setCardListItems={setCardListItems}
      />
      {cardListItems.length > 0 && <Divider />}
      <List component="nav">
        <ListItem
          button
          disabled={isCreating || !initialData}
          onClick={() => {
            if (!initialData) {
              return;
            }
            setIsCreating(true);
            setPreviewCard(initialData);
          }}
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Open" />
        </ListItem>
      </List>
    </>
  );

  const isShowingCreationCard = isCreating && data && previewCard;
  const Body = (
    <>
      {isShowingCreationCard && data && previewCard && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} xl={3}>
            <MemoryVaultCreateForm
              standardProposal={data.standardProposal}
              previewCard={previewCard}
              setIsCreating={setIsCreating}
              setPreviewCard={setPreviewCard}
              setCardListItems={setCardListItems}
            />
          </Grid>
          <Grid item xs={12} md={8} xl={9}>
            <MemoryVaultPreview {...previewCard} />
          </Grid>
        </Grid>
      )}
      {isShowingCreationCard && <div style={{ height: theme.spacing(2) }} />}
      {cardListItems
        .filter((c) => c.isOpen)
        .map((card) => (
          <div key={card.id}>
            <MemoryVault
              {...card.cardProps}
              onClose={() =>
                setCardListItems(cardListItems.filter((c) => card.id !== c.id))
              }
            />
            <div style={{ height: theme.spacing(2) }} />
          </div>
        ))}
    </>
  );
  return <MemoryPageLayout leftNav={LeftNav} body={Body} />;
}
