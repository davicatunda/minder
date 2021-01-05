import {
  Button,
  Divider,
  List,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";

import GoogleMemoryCard from "./google-vault/GoogleMemoryCard";
import LeftNavAddCardItem from "./navbar/LeftNavAddCardItem";
import LeftNavCardItem from "./navbar/LeftNavCardItem";
import LeftNavGoogleItem from "./navbar/LeftNavGoogleItem";
import MemoryCard from "./vault/MemoryCard";
import { MoreHoriz } from "@material-ui/icons";
import { VaultData } from "./vault/MemoryVault";
import { css } from "@emotion/css";
import useCardsFromGoogleDrive from "./useCardsFromGoogleDrive";
import useCardsFromUrl from "./useCardsFromUrl";

export type CardListItem = {
  vaultData: VaultData;
  id: string;
  isOpen: boolean;
  isLoading: boolean;
  isCreating: boolean;
  isReadOnly: boolean;
};
export type GoogleCardListItem = {
  vaultData: VaultData;
  resourceId: string;
  isLoading: boolean;
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
  ].map((child, index, all) =>
    index === all.length - 1
      ? child
      : [child, <Divider key={`LeftNavSection-${index}`} />],
  );

  const bodyCards = [
    ...cards.map((card) => (
      <MemoryCard card={card} setCards={setCards} key={card.id} />
    )),
    ...googleCards.map((card) => (
      <GoogleMemoryCard
        card={card}
        setGoogleCards={setGoogleCards}
        key={card.resourceId}
      />
    )),
  ];

  const leftNavIsFixed = useMediaQuery(theme.breakpoints.up("sm"));
  const hasRightNav = useMediaQuery(theme.breakpoints.up("xl"));
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className={css({ display: "flex", flexGrow: 1 })}>
        {leftNavIsFixed ? (
          <div
            className={css({
              flexBasis: 200,
              flexShrink: 0,
              borderRightColor: theme.palette.divider,
              borderRightWidth: 1,
              borderRightStyle: "solid",
            })}
          >
            {leftNavSections}
          </div>
        ) : (
          <>
            <Button
              onClick={() => setOpen(true)}
              classes={{
                root: css({
                  borderRadius: 0,
                  borderInlineEndWidth: 1,
                  borderInlineEndStyle: "solid",
                  borderInlineEndColor: theme.palette.divider,
                }),
              }}
            >
              <MoreHoriz />
            </Button>
            <SwipeableDrawer
              anchor={"left"}
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              classes={{ paper: css({ minWidth: 250 }) }}
            >
              {leftNavSections}
            </SwipeableDrawer>
          </>
        )}
        <div className={css({ padding: theme.spacing(2), flexGrow: 1 })}>
          {bodyCards}
        </div>
        {hasRightNav && (
          <div
            className={css({
              flexBasis: 250,
            })}
          ></div>
        )}
      </div>
    </>
  );
}
