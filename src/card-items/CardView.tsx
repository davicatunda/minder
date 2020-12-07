import {
  RefinedType,
  TBooleanNode,
  TNullNode,
  TNumberNode,
  TStringNode,
} from "../utils/normalization";

import DateNodeCardView from "./DateNodeCardView";
import ListNodeCardView from "./ListNodeCardView";
import ObjectNodeCardView from "./ObjectNodeCardView";
import React from "react";
import { Typography } from "@material-ui/core";
import useDecodedDataContext from "./useDecodedDataContext";

type Props = { nodeKey: string };
export default function CardView({ nodeKey }: Props) {
  const { store } = useDecodedDataContext();
  const node = store.nodes[nodeKey];
  switch (node.type) {
    case RefinedType.Boolean:
      return <BooleanNodeCardView node={node} />;
    case RefinedType.Date:
      return <DateNodeCardView node={node} />;
    case RefinedType.List:
      return <ListNodeCardView node={node} />;
    case RefinedType.Null:
      return <NullNodeCardView node={node} />;
    case RefinedType.Number:
      return <NumberNodeCardView node={node} />;
    case RefinedType.Object:
      return <ObjectNodeCardView node={node} />;
    case RefinedType.String:
      return <StringNodeCardView node={node} />;
  }
}

function StringNodeCardView(props: { node: TStringNode }) {
  return (
    <Typography variant="body2" color="textSecondary" component="p">
      {props.node.value}
    </Typography>
  );
}
function NumberNodeCardView(props: { node: TNumberNode }) {
  return (
    <Typography variant="body2" color="textSecondary" component="p">
      {props.node.value}
    </Typography>
  );
}
function BooleanNodeCardView(props: { node: TBooleanNode }) {
  return (
    <Typography variant="body2" color="textSecondary" component="p">
      {props.node.value ? "Yes" : "No"}
    </Typography>
  );
}
function NullNodeCardView(props: { node: TNullNode }) {
  return (
    <Typography variant="body2" color="textSecondary" component="p">
      Null
    </Typography>
  );
}
