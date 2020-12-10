import { RefinedType, TNode } from "../../../utils/normalization";

import EditBooleanInput from "./Boolean/EditBooleanInput";
import EditDateInput from "./Date/EditDateInput";
import EditNumberInput from "./Number/EditNumberInput";
import EditStringInput from "./String/EditStringInput";
import React from "react";

type Props = {
  node: TNode | null;
  onChange(node: TNode): void;
};
export default function EditValueInput({ node, onChange }: Props) {
  if (node === null) {
    return null;
  }
  switch (node.type) {
    case RefinedType.List:
      return null;
    case RefinedType.Boolean:
      return <EditBooleanInput node={node} onChange={onChange} />;
    case RefinedType.Date:
      return <EditDateInput node={node} onChange={onChange} />;
    case RefinedType.Null:
      throw Error("Impossible");
    case RefinedType.Number:
      return <EditNumberInput node={node} onChange={onChange} />;
    case RefinedType.Object:
      return null;
    case RefinedType.String:
      return <EditStringInput node={node} onChange={onChange} />;
  }
}
