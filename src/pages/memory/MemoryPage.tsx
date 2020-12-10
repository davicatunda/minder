import { Button, useTheme } from "@material-ui/core";
import CardViewRoot, { CardDataProps } from "./cards/CardViewRoot";
import React, { useState } from "react";

import { Add } from "@material-ui/icons";
import MemoryVaultCreateForm from "./create/MemoryVaultCreateForm";

export default function MemoryPage() {
  const theme = useTheme();
  const [cards, setCards] = useState<CardDataProps[]>([]);
  const [isCreating, setIsCreating] = useState(true);
  return (
    <>
      {cards.map((card) => (
        <div key={card.initialValues.encryptionKey}>
          <CardViewRoot
            {...card}
            onClose={() =>
              setCards(
                cards.filter(
                  (c) =>
                    card.initialValues.encryptionKey !==
                    c.initialValues.encryptionKey,
                ),
              )
            }
          />
          <div style={{ height: theme.spacing(2) }} />
        </div>
      ))}
      {isCreating || cards.length === 0 ? (
        <MemoryVaultCreateForm
          onSubmit={(newCard) => {
            setIsCreating(false);
            setCards((old) => [...old, newCard]);
          }}
        />
      ) : (
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={<Add />}
          onClick={() => setIsCreating(true)}
        >
          Open
        </Button>
      )}
    </>
  );
}
