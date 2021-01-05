import { RefinedType, Store, StoreKey } from "../../../../utils/normalization";

import DateFnsAdapter from "@date-io/date-fns";

export default function textValueFromNode(store: Store, startKey: StoreKey): string {
  const node = store.nodes[startKey];
  switch (node.type) {
    case RefinedType.Boolean:
      return node.value ? "Yes" : "No";
    case RefinedType.Date:
      return date2HumanValue(node.date);
    case RefinedType.Null:
      return "Null";
    case RefinedType.Number:
      return node.value.toString();
    case RefinedType.String:
      return node.value;
    case RefinedType.List:
      return `List [${node.children
        .map((child) => `"${textValueFromNode(store, child)}"`)
        .join(", ")}]`;
    case RefinedType.Object:
      return `{${node.fields
        .map(
          (field) => `"${field.value}": "${textValueFromNode(store, field.value)}"`,
        )
        .join(", ")}}`;
  }
}

const dateFns = new DateFnsAdapter();
export function date2HumanValue(date: Date): string {
  return dateFns.format(date, "MMMM do, yyyy");
}
