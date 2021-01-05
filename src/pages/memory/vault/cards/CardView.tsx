import ListNodeCardView from "./List/ListNodeCardView";
import ObjectNodeCardView from "./Object/ObjectNodeCardView";
import React from "react";
import { RefinedType } from "../../../../utils/normalization";
import { Typography } from "@material-ui/core";
import { css } from "@emotion/css";
import textValueFromNode from "./textValueFromNode";
import useDecodedDataContext from "../../useDecodedDataContext";

type Props = { nodeKey: string };
export default function CardView({ nodeKey }: Props) {
  const { store } = useDecodedDataContext();
  const node = store.nodes[nodeKey];
  switch (node.type) {
    case RefinedType.Boolean:
    case RefinedType.Date:
    case RefinedType.Null:
    case RefinedType.Number:
    case RefinedType.String:
      return (
        <Typography
          variant="body2"
          color="textSecondary"
          display="inline"
          onClick={(e) => e.stopPropagation()}
          className={css({ userSelect: "text", minWidth: 20 })}
        >
          {textValueFromNode(store, nodeKey)}
        </Typography>
      );
    case RefinedType.Object:
      return <ObjectNodeCardView node={node} />;
    case RefinedType.List:
      return <ListNodeCardView node={node} />;
  }
}
