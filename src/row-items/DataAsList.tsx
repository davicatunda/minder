import React, { CSSProperties } from "react";
import StringRowItem from "./StringRowItem";
import BooleanRowItem from "./BooleanRowItem";
import NumberRowItem from "./NumberRowItem";
import DateRowItem from "./DateRowItem";
import NullRowItem from "./NullRowItem";
import RowItemName from "./RowItemName";
import ButtonIcon from "../components/ButtonIcon";
import AddIcon from "../icons/AddIcon";
import RemoveIcon from "../icons/RemoveIcon";

export type Value =
  | number
  | boolean
  | string
  | Date
  | void
  | TreeNode[]
  | TreeNode;
type TreeNode = {
  [key: string]: Value;
};

const listStyle: CSSProperties = {
  listStyle: "none",
  paddingLeft: 12,
  borderLeft: "1px solid #00000030",
  margin: "4px 0 8px 0",
};
const listItemStyle: CSSProperties = {
  padding: 4,
  display: "flex",
  alignItems: "center",
};

type Props<T> = {
  node: T;
  setParentValue: (newNode: T | undefined) => void;
};
const DataAsList: <T extends TreeNode>(props: Props<T>) => JSX.Element = (
  props,
) => {
  const { node, setParentValue } = props;
  return (
    <ul style={listStyle}>
      {Object.keys(node).map((key: string, index) => (
        <li style={listItemStyle} key={key}>
          {!(node instanceof Array) && (
            <RowItemName
              name={key}
              setName={(name) => {
                const newNode = Object.keys(node).reduce(
                  (accumulator: TreeNode, currentKey) => {
                    const isKeyBeingRenamed = currentKey === key;
                    if (isKeyBeingRenamed) {
                      accumulator[name] = node[currentKey];
                    } else {
                      accumulator[currentKey] = node[currentKey];
                    }
                    return accumulator;
                  },
                  {},
                );
                // @ts-ignore missing support for renames
                setParentValue(newNode);
              }}
              isValid={(name) => name === key || node[name] === undefined}
            />
          )}
          {(function () {
            const value = node[key];
            const setValue: (newValue: typeof value) => void = (newValue) => {
              const newNode = Object.assign({}, node, { [key]: newValue });
              if (node instanceof Array) {
                const nodeAsArray = Object.values(newNode);
                return setParentValue(
                  // @ts-ignore losing array<T> type
                  nodeAsArray.filter((v) => v !== undefined),
                );
              }
              return setParentValue(newNode);
            };

            switch (typeof value) {
              case "string":
                if (isDate(value)) {
                  return (
                    <DateRowItem
                      name={key}
                      value={new Date(value)}
                      setValue={setValue}
                    />
                  );
                }
                return (
                  <StringRowItem name={key} value={value} setValue={setValue} />
                );
              case "number":
                return (
                  <NumberRowItem name={key} value={value} setValue={setValue} />
                );
              case "boolean":
                return (
                  <BooleanRowItem
                    name={key}
                    value={value}
                    setValue={setValue}
                  />
                );
              case "object":
              default:
                if (value instanceof Date) {
                  return null;
                }
                if (value == null) {
                  return <NullRowItem name={key} setValue={setValue} />;
                }
                // @ts-ignore DataAsList should take array
                return <DataAsList node={value} setParentValue={setValue} />;
            }
          })()}
        </li>
      ))}
      <li style={listItemStyle}>
        <ButtonIcon
          onClick={() => {
            if (node instanceof Array) {
              // @ts-ignore losing array<T> type
              return setParentValue([...node, null]);
            }
            const lastField = Object.keys(node)
              .reverse()
              .find((key) => RegExp(/field:[0-9]+/).test(key));
            const index = lastField ? Number(lastField.split(":")[1]) : 0;
            return setParentValue({ ...node, [`field:${index + 1}`]: null });
          }}
        >
          <AddIcon size={20} />
        </ButtonIcon>
        {Object.keys(node).length === 0 && (
          <ButtonIcon onClick={() => setParentValue(undefined)}>
            <RemoveIcon size={20} />
          </ButtonIcon>
        )}
      </li>
    </ul>
  );
};

function isDate(value: string): boolean {
  const regex = RegExp(
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
  );
  return regex.test(value);
}

export default DataAsList;
