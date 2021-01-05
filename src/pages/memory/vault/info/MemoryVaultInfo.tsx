import React from "react";
import { Typography } from "@material-ui/core";
import { date2HumanValue } from "../cards/textValueFromNode";
import useDecodedDataContext from "../../useDecodedDataContext";

export default function MemoryVaultInfo() {
  const { store } = useDecodedDataContext();
  return (
    <>
      <Typography variant="body2" color="textSecondary" display="block">
        Created: {date2HumanValue(store.rootNode.created)}
      </Typography>
      <Typography variant="body2" color="textSecondary" display="block">
        Last Updated: {date2HumanValue(store.rootNode.updated)}
      </Typography>
    </>
  );
}
