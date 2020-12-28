import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

import BlurredBar from "../../../../components/BlurredBar";
import MemoryVaultSaveDataButton from "./MemoryVaultSaveDataButton";
import MemoryVaultSaveKeyButton from "./MemoryVaultSaveKeyButton";
import { date2HumanValue } from "../cards/Date/DateNodeCardView";
import useDecodedDataContext from "../../useDecodedDataContext";

export default function MemoryVaultInfo() {
  const [isKeyHidden, setIsKeyHidden] = useState(true);
  const { store } = useDecodedDataContext();
  return (
    <Card style={{ maxWidth: 400 }} variant="outlined">
      <CardHeader
        title={store.rootNode.title}
        subheader={
          <Tooltip title="double click to show" placement="top">
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
              onDoubleClick={() => setIsKeyHidden((v) => !v)}
            >
              {!isKeyHidden ? (
                store.rootNode.encryptionKey
              ) : (
                <BlurredBar
                  style={{
                    height: 12,
                    width: "100%",
                    marginTop: 8,
                    display: "block",
                  }}
                />
              )}
            </Typography>
          </Tooltip>
        }
      />
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
