import { RefinedType, TNode } from "../../../../utils/normalization";

import EditBooleanInput from "./Boolean/EditBooleanInput";
import EditDateInput from "./Date/EditDateInput";
import EditListInput from "./List/EditListInput";
import EditNumberInput from "./Number/EditNumberInput";
import EditStringInput from "./String/EditStringInput";
import React from "react";

export type DraftNode = {
  valueNode: TNode | null;
  childNodes?: TNode[];
};
type Props = {
  node: DraftNode;
  onChange(node: DraftNode): void;
};
export default function EditValueInput({ node, onChange }: Props) {
  if (node.valueNode === null) {
    return null;
  }
  const onChangeValue = (node: TNode) => onChange({ valueNode: node });
  switch (node.valueNode.type) {
    case RefinedType.List:
      return (
        <EditListInput
          node={node.valueNode}
          childNodes={node.childNodes}
          onChange={onChange}
        />
      );
    case RefinedType.Boolean:
      return <EditBooleanInput node={node.valueNode} onChange={onChangeValue} />;
    case RefinedType.Date:
      return <EditDateInput node={node.valueNode} onChange={onChangeValue} />;
    case RefinedType.Null:
      throw Error("Impossible");
    case RefinedType.Number:
      return <EditNumberInput node={node.valueNode} onChange={onChangeValue} />;
    case RefinedType.Object:
      return null;
    case RefinedType.String:
      return <EditStringInput node={node.valueNode} onChange={onChangeValue} />;
  }
}
