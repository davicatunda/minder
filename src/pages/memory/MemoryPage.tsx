import { Add, Drafts, Mail } from "@material-ui/icons";
import CardRoot, { CardDataProps } from "./cards/CardRoot";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
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

type CardListItem = {
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
  return (
    <MemoryPageLayout
      leftNav={
        <>
          {cardListItems.length > 0 && (
            <>
              <List component="nav">
                {cardListItems.map((card) => (
                  <ListItem
                    button
                    key={card.cardProps.initialValues.encryptionKey}
                    onClick={() =>
                      setCardListItems((oldItems) =>
                        oldItems.map((c) =>
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
              <Divider />
            </>
          )}
          <List component="nav">
            <ListItem
              button
              disabled={isCreating || data === null}
              onClick={() => {
                setIsCreating(true);
                setPreviewCard({
                  title: "",
                  initialValues: {
                    encryptionKey: "",
                    initialData: data?.standardProposal.data ?? "",
                  },
                  isReadOnly: true,
                });
              }}
            >
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="Open" />
            </ListItem>
          </List>
        </>
      }
      body={
        <>
          {isCreating && data && previewCard && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} xl={3}>
                  <Paper style={{ padding: theme.spacing(2) }}>
                    <MemoryVaultCreateForm
                      standardProposal={data.standardProposal}
                      value={previewCard}
                      setValue={setPreviewCard}
                      onSubmit={() => {
                        setIsCreating(false);
                        setPreviewCard(null);
                        setCardListItems((oldCards) => [
                          {
                            cardProps: {
                              ...previewCard,
                              isReadOnly: false,
                            },
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
                </Grid>
                <Grid item xs={12} md={8} xl={9}>
                  <PreviewCardRoot {...previewCard} />
                </Grid>
              </Grid>
              <div style={{ height: theme.spacing(2) }} />
            </>
          )}
          {cardListItems
            .filter((c) => c.isOpen)
            .map((card) => (
              <div key={card.id}>
                <CardRoot
                  {...card.cardProps}
                  onClose={() =>
                    setCardListItems(cardListItems.filter((c) => card.id !== c.id))
                  }
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
function useCardFromUrl():
  | { initialCard: CardDataProps; initialPreviewCard: null }
  | { initialCard: null; initialPreviewCard: CardDataProps } {
  const { search } = useLocation();
  const params: RouteParams = queryString.parse(search);

  const title = params.title ?? "";
  const isReadOnly = params.readOnly !== "false";
  const encryptionKey = params.key ? params.key.split(" ").join("+") : "";
  const initialData = params.data ? params.data.split(" ").join("+") : "";
  const hasIncompleteData = params.key == null || params.data == null;

  const card = {
    title,
    initialValues: { encryptionKey, initialData },
    isReadOnly,
  };
  return hasIncompleteData
    ? { initialCard: null, initialPreviewCard: card }
    : { initialCard: card, initialPreviewCard: null };
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
