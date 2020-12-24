import { TDateNode } from "../../../../../utils/normalization";

export default function DateNodeCardView(props: { node: TDateNode }) {
  return <span>{date2HumanValue(props.node.date)}</span>;
}

export function date2HumanValue(date: Date): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${month}-${day}-${year}`;
}
