import { Add, Drafts, Mail } from "@material-ui/icons";
import CardRoot, { CardDataProps } from "./cards/CardRoot";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import React, { ReactNode, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import MemoryVaultCreateForm from "./create/MemoryVaultCreateForm";
import PreviewCardRoot from "./cards/PreviewCardRoot";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
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

type CardItem = {
  cardProps: CardDataProps;
  id: string;
  isOpen: boolean;
  isReadOnly: boolean;
};
export default function MemoryPage() {
  const theme = useTheme();
  const cardFromUrl = useCardFromUrl();
  const [cards, setCards] = useState<CardItem[]>(cardFromUrl ? [cardFromUrl] : []);
  const [previewCard, setPreviewCard] = useState<CardItem | null>(null);
  const allCards = previewCard ? [previewCard, ...cards] : cards;
  const [isCreating, setIsCreating] = useState(false);
  const { data } = useQuery<MemoryPageResponse>(QUERY);
  return (
    <MemoryPageLayout
      leftNav={
        <>
          {allCards.length > 0 && (
            <>
              <List component="nav">
                {allCards.map((card) => (
                  <ListItem
                    button
                    key={card.cardProps.initialValues.encryptionKey}
                    onClick={() =>
                      setCards((oldCards) =>
                        oldCards.map((c) =>
                          card.id === c.id ? { ...c, isOpen: !c.isOpen } : c,
                        ),
                      )
                    }
                  >
                    <ListItemIcon>
                      {card.isOpen ? <Drafts /> : <Mail />}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        card.cardProps.title !== "" ? card.cardProps.title : "Title"
                      }
                      primaryTypographyProps={{
                        style: { overflow: "hidden", textOverflow: "ellipsis" },
                      }}
                      secondary={
                        card.cardProps.initialValues.encryptionKey !== ""
                          ? card.cardProps.initialValues.encryptionKey
                          : "key"
                      }
                      secondaryTypographyProps={{
                        style: { overflow: "hidden", textOverflow: "ellipsis" },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider />{" "}
            </>
          )}
          <List component="nav">
            {isCreating && data ? (
              <MemoryVaultCreateForm
                standardProposal={data.standardProposal}
                onChange={(card) => {
                  setPreviewCard({
                    cardProps: card,
                    isOpen: true,
                    id: "preview",
                    isReadOnly: true,
                  });
                }}
                onSubmit={(newCard) => {
                  setIsCreating(false);
                  setPreviewCard(null);
                  setCards((old) => [
                    {
                      cardProps: newCard,
                      isOpen: true,
                      isReadOnly: false,
                      id: uuid(),
                    },
                    ...old,
                  ]);
                }}
                onCancel={() => {
                  setIsCreating(false);
                  setPreviewCard(null);
                }}
              />
            ) : (
              <ListItem button onClick={() => setIsCreating(true)}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Open" />
              </ListItem>
            )}
          </List>
        </>
      }
      body={
        <>
          {previewCard && (
            <>
              <PreviewCardRoot {...previewCard.cardProps} />
              <div style={{ height: theme.spacing(2) }} />
            </>
          )}
          {cards
            .filter((c) => c.isOpen)
            .map((card) => (
              <div key={card.id}>
                <CardRoot
                  {...card.cardProps}
                  isReadOnly={card.isReadOnly}
                  onClose={() => setCards(cards.filter((c) => card.id !== c.id))}
                />
                <div style={{ height: theme.spacing(2) }} />
              </div>
            ))}
        </>
      }
    />
  );
}
type RouteParams = {
  title?: string;
  key?: string;
  data?: string;
  readOnly?: string;
};
function useCardFromUrl(): CardItem | null {
  const { search } = useLocation();
  const params: RouteParams = queryString.parse(search);
  if (params.key == null || params.data == null) {
    return null;
  }
  return {
    id: uuid(),
    isOpen: true,
    isReadOnly: params.readOnly !== "false",
    cardProps: {
      title: params.title,
      initialValues: {
        encryptionKey: params.key.split(" ").join("+"),
        initialData: params.data.split(" ").join("+"),
      },
    },
  };
}
function MemoryPageLayout({
  leftNav,
  body,
}: {
  leftNav: ReactNode;
  body: ReactNode;
}) {
  const theme = useTheme();
  return (
    <Grid container style={{ flex: 1 }}>
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        lg={2}
        style={{
          borderRightColor: theme.palette.divider,
          borderRightWidth: 1,
          borderRightStyle: "solid",
        }}
      >
        {leftNav}
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={9}
        lg={10}
        style={{
          padding: theme.spacing(2),
        }}
      >
        {body}
      </Grid>
    </Grid>
  );
}
