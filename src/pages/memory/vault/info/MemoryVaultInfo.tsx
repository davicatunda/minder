import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";

import MemoryVaultSaveDataButton from "./MemoryVaultSaveDataButton";
import MemoryVaultSaveKeyButton from "./MemoryVaultSaveKeyButton";
import React from "react";
import { css } from "@emotion/css";
import { date2HumanValue } from "../cards/Date/DateNodeCardView";
import useDecodedDataContext from "../../useDecodedDataContext";

export default function MemoryVaultInfo() {
  const { store } = useDecodedDataContext();
  return (
    <Card className={css({ maxWidth: 400 })} variant="outlined">
      <CardHeader title={store.rootNode.title} />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body2">Created</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {date2HumanValue(store.rootNode.created)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Last Updated</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {date2HumanValue(store.rootNode.updated)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <MemoryVaultSaveKeyButton />
        <MemoryVaultSaveDataButton />
      </CardActions>
    </Card>
  );
}
