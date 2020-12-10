import BooleanNodeCardView from "./Boolean/BooleanNodeCardView";
import DateNodeCardView from "./Date/DateNodeCardView";
import ListNodeCardView from "./List/ListNodeCardView";
import NullNodeCardView from "./Null/NullNodeCardView";
import NumberNodeCardView from "./Number/NumberNodeCardView";
import ObjectNodeCardView from "./Object/ObjectNodeCardView";
import React from "react";
import { RefinedType } from "../../../utils/normalization";
import StringNodeCardView from "./String/StringNodeCardView";
import useDecodedDataContext from "../useDecodedDataContext";

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
