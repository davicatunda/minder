import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

import BlurredBar from "../components/BlurredBar";
import { RootNode } from "../utils/normalization";
import { date2HumanValue } from "./DateNodeCardView";

type Props = {
  rootNode: RootNode;
  encryptedData: string | null;
};
export default function CardInfo({ rootNode, encryptedData }: Props) {
  const [isKeyHidden, setIsKeyHidden] = useState(true);

  return (
    <Card style={{ maxWidth: 400 }} variant="outlined">
      <CardHeader title="Details" />
      <CardContent>
        <Typography variant="body2">Title</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {rootNode.title}
        </Typography>
        <Typography variant="body2">Encrypted key</Typography>
        <Tooltip title="double click to show" placement="top">
          <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom
            onDoubleClick={() => setIsKeyHidden((v) => !v)}
          >
            {!isKeyHidden ? (
              rootNode.encryptionKey
            ) : (
              <BlurredBar style={{ height: 12, width: "100%", marginTop: 8 }} />
            )}
          </Typography>
        </Tooltip>
        <Typography variant="body2">Created</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {date2HumanValue(rootNode.created)}
        </Typography>
        <Typography variant="body2">Last Updated</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {date2HumanValue(rootNode.updated)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          href={`data:text/plain;charset=base64,${rootNode.encryptionKey}`}
          download="key.ish"
        >
          Save Key
        </Button>
        <Button
          size="small"
          color="primary"
          disabled={encryptedData == null}
          href={`data:text/plain;charset=base64,${encryptedData}`}
          download="data.ish"
        >
          Save Data
        </Button>
      </CardActions>
    </Card>
  );
}
