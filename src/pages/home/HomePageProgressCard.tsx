import { Autorenew, CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
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

export default function HomePageProgressCard() {
  return (
    <HomePageCard
      icon={<Autorenew fontSize="inherit" color="primary" />}
      title="Progress"
      subtitle="I'm the only developer so I'm taking my time."
      body={
        <List
          subheader={
            <ListSubheader className={css({ padding: 0 })}>GOALS</ListSubheader>
          }
        >
          {["encryption client to client layer", "initial CRUD operations"].map(
            (completedItem, index) => (
              <ListItem className={css({ paddingLeft: 0 })} key={index}>
                <ListItemIcon>
                  <CheckBox />
                </ListItemIcon>
                <ListItemText primary={completedItem} />
              </ListItem>
            ),
          )}
          {[
            "build User Voted Standard for the recommend fields everyone should have",
            "create partial copies of your data into shareable units for 3rd parties to consume",
            "Based on standard create a backend backed by graphql for automatization",
          ].map((todoItem, index) => (
            <ListItem className={css({ paddingLeft: 0 })} key={index}>
              <ListItemIcon>
                <CheckBoxOutlineBlank />
              </ListItemIcon>
              <ListItemText primary={todoItem} />
            </ListItem>
          ))}
        </List>
      }
      button={
        <Button
          variant="outlined"
          size="large"
          href="https://github.com/davicatunda/minder"
        >
          Support
        </Button>
      }
    />
  );
}
