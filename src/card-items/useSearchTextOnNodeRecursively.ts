import { RefinedType, Store, StoreKey } from "../utils/normalization";

import { date2HumanValue } from "./DateNodeCardView";
import useDecodedDataContext from "./useDecodedDataContext";

type FilterFn = (value: string) => boolean;

export default function useSearchTextOnNodeRecursively(
  searchValue: string,
): FilterFn {
  const { store } = useDecodedDataContext();
  return function searchMatches(key: string) {
    if (searchValue === "") {
      return true;
    }
    return searchTextOnNodeRecursively(store, key, searchValue.toLocaleLowerCase());
  };
}

function searchTextOnNodeRecursively(
  store: Store,
  startKey: StoreKey,
  searchValue: string,
): boolean {
  const node = store.nodes[startKey];
  switch (node.type) {
    case RefinedType.Boolean:
      return false;
    case RefinedType.Date:
      return date2HumanValue(node.date).toLocaleLowerCase().includes(searchValue);
    case RefinedType.List:
      return node.children.some((key) =>
        searchTextOnNodeRecursively(store, key, searchValue),
      );
    case RefinedType.Null:
      return searchValue === "null";
    case RefinedType.Number:
      return node.value.toString().toLocaleLowerCase().includes(searchValue);
    case RefinedType.Object:
      return node.fields.some(
        (field) =>
          field.name.toLocaleLowerCase().includes(searchValue) ||
          searchTextOnNodeRecursively(store, field.value, searchValue),
      );
    case RefinedType.String:
      return node.value.toLocaleLowerCase().includes(searchValue);
  }
}
