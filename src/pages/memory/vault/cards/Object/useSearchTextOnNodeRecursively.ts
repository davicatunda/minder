import textValueFromNode from "../textValueFromNode";
import useDecodedDataContext from "../../../useDecodedDataContext";

type FilterFn = (value: string) => boolean;

export default function useSearchTextOnNodeRecursively(
  searchValue: string,
): FilterFn {
  const { store } = useDecodedDataContext();
  return function searchMatches(key: string) {
    if (searchValue === "") {
      return true;
    }
    return textValueFromNode(store, key).toLocaleLowerCase().includes(searchValue);
  };
}
