import { Build, SubdirectoryArrowRight } from "@material-ui/icons";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";

import HomePageCard from "./HomePageCard";
import React from "react";
import { css } from "@emotion/css";

type Props = { onTryClick: () => void };
export default function HomePageUsageCard({ onTryClick }: Props) {
  return (
    <HomePageCard
      icon={<Build fontSize="inherit" color="primary" />}
      title="Usage"
      subtitle=" I'm the only user so there is only one way."
      body={
        <List
          subheader={
            <ListSubheader className={css({ padding: 0 })}>STEPS</ListSubheader>
          }
        >
          {[
            "Create or upload your encryption key and data",
            "Consult your data, add new items, reorder them",
            "Save your key and encrypted data on somewhere safe",
            "Live your life, and come back whenever your memory fails you",
          ].map((step, index) => (
            <ListItem className={css({ paddingLeft: 0 })} key={index}>
              <ListItemIcon className={css({ paddingRight: 0 })}>
                <SubdirectoryArrowRight />
              </ListItemIcon>
              <ListItemText primary={step} />
            </ListItem>
          ))}
        </List>
      }
      button={
        <Button variant="outlined" size="large" onClick={onTryClick}>
          Try it
        </Button>
      }
    />
  );
}
