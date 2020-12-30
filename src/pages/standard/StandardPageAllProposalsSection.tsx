import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";

import React from "react";
import { css } from "@emotion/css";
import { useHistory } from "react-router-dom";

type Props = {
  proposals: Array<{ uuid: string }>;
};
export default function StandardPageAllProposalsSection({ proposals }: Props) {
  const theme = useTheme();
  const history = useHistory();
  return (
    <Paper className={css({ padding: theme.spacing(3), width: "100%" })}>
      <Typography variant="h6">All Proposals</Typography>
      <List>
        {proposals.map(({ uuid }) => (
          <ListItem
            button
            onClick={() => history.push(`/minder/proposal/${uuid}`)}
            key={uuid}
          >
            <ListItemText primary={`Proposal ${uuid}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
