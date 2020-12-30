import { Divider, Grid, List, useTheme } from "@material-ui/core";
import React, { useState } from "react";

import GoogleMemoryCard from "./google-vault/GoogleMemoryCard";
import LeftNavAddCardItem from "./navbar/LeftNavAddCardItem";
import LeftNavCardItem from "./navbar/LeftNavCardItem";
import LeftNavGoogleItem from "./navbar/LeftNavGoogleItem";
import MemoryCard from "./vault/MemoryCard";
import { VaultData } from "./vault/MemoryVault";
import { VerticalSpace } from "../core/Spacing";
import { css } from "@emotion/css";
import useCardsFromGoogleDrive from "./useCardsFromGoogleDrive";
import useCardsFromUrl from "./useCardsFromUrl";

export type CardListItem = {
  vaultData: VaultData;
  id: string;
  isOpen: boolean;
  isCreating: boolean;
  isReadOnly: boolean;
};
export type GoogleCardListItem = {
  vaultData: VaultData;
  resourceId: string;
  isCreating: boolean;
  isOpen: boolean;
};

export default function MemoryPage() {
  const theme = useTheme();
  const [googleCards, setGoogleCards] = useState<GoogleCardListItem[]>([]);
  useCardsFromGoogleDrive(setGoogleCards);

  const [cards, setCards] = useState<CardListItem[]>([]);
  useCardsFromUrl(setCards);

  const createdCards = cards.filter((card) => !card.isCreating);
  const leftNavSections = [
    <LeftNavAddCardItem
      key="PreviewCardNavBar"
      addCard={(newCard) => setCards((oldCards) => [newCard, ...oldCards])}
    />,
    createdCards.length > 0 && (
      <List component="nav" key="CardNavBar">
        {createdCards.map((card) => (
          <LeftNavCardItem key={card.id} card={card} setCards={setCards} />
        ))}
      </List>
    ),
    googleCards.length > 0 && (
      <List component="nav" key="GoogleCardsNavBar">
        {googleCards.map((card) => (
          <LeftNavGoogleItem
            key={card.resourceId}
            card={card}
            setGoogleCards={setGoogleCards}
          />
        ))}
      </List>
    ),
  ];

  const bodyCards = [
    ...cards.map((card) => (
      <div
        className={css({ display: card.isOpen ? "initial" : "none" })}
        key={card.id}
      >
        <MemoryCard card={card} setCards={setCards} />
        <VerticalSpace s2 />
      </div>
    )),
    ...googleCards.map((card) => (
      <div
        className={css({ display: card.isOpen ? "initial" : "none" })}
        key={card.resourceId}
      >
        <GoogleMemoryCard card={card} setGoogleCards={setGoogleCards} />
        <VerticalSpace s2 />
      </div>
    )),
  ];

  const leftNavStyle = css({
    borderRightColor: theme.palette.divider,
    borderRightWidth: 1,
    borderRightStyle: "solid",
  });
  const bodyStyle = css({ padding: theme.spacing(2) });
  return (
    <Grid container className={css({ flex: 1 })}>
      <Grid item xs={12} sm={4} md={3} lg={2} className={leftNavStyle}>
        {leftNavSections.map((child, index) =>
          index === leftNavSections.length - 1
            ? child
            : [child, <Divider key={`LeftNavSection-${index}`} />],
        )}
      </Grid>
      <Grid item xs={12} sm={8} md={9} lg={10} className={bodyStyle}>
        {bodyCards}
      </Grid>
    </Grid>
  );
}
