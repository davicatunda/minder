// @flow

import type { Node } from 'react';

import React from 'react';
import StringRowItem from './StringRowItem';
import BooleanRowItem from './BooleanRowItem';
import NumberRowItem from './NumberRowItem';
import DateRowItem from './DateRowItem';
import AddListRowItem from './AddListRowItem';
import NullRowItem from './NullRowItem';
import RowItemName from './RowItemName';
const listStyle = {
  listStyle: "none",
  paddingLeft: 12,
  borderLeft: "1px solid #00000030",
  margin: "4px 0 8px 0",

};

const listItemStyle = {
  padding: 4,
  display: "flex",
  alignItems: "center",
};

type Props<T> = { node: T, setParentValue: T => void };
function DataAsList<T: { }> (props: Props<T>): Node {
  const { node, setParentValue } = props;
  return (
    <ul style={listStyle}>
      {Object.keys(node).map((key: string, index) => (
        <li style={listItemStyle} key={index /** TODO: replace with uid */}>
          {!(node instanceof Array) && (
            <RowItemName
              name={key}
              setName={(name) => {
                const newNode = Object.keys(node).reduce((accumulator, currentKey) => {
                  const isKeyBeingRenamed = currentKey === key;
                  if (isKeyBeingRenamed) {
                    accumulator[name] = node[currentKey];
                  } else {
                    accumulator[currentKey] = node[currentKey];
                  }
                  return accumulator;
                }, {});
                // $FlowFixMe T should accept 1 property rename.
                setParentValue(newNode);
              }}
            />
          )}
          {function () {
            const value = node[key];
            const setValue = node instanceof Array ?
              (newValue) =>
                setParentValue(node.map((v, index) =>
                  index === Number(key) ? newValue : v
                )) :
              (newValue) => setParentValue({ ...node, [key]: newValue });
            if (value === null) {
              return <NullRowItem name={key} setValue={setValue} />;
            }
            switch (typeof value) {
              case 'string':
                if (isDate(value)) {
                  return <DateRowItem name={key} value={new Date(value)} setValue={setValue} />;
                };
                return <StringRowItem name={key} value={value} setValue={setValue} />;
              case 'number':
                return <NumberRowItem name={key} value={value} setValue={setValue} />;
              case 'boolean':
                return <BooleanRowItem name={key} value={value} setValue={setValue} />;
              case 'object':
              default:
                return <DataAsList node={value} setParentValue={setValue} />;
            }
          }()}
        </li>
      ))}
      <li style={listItemStyle}>
        <AddListRowItem
          onAddItem={() => {
            if (node instanceof Array) {
              return setParentValue([...node, null]);
            }
            const lastField = Object.keys(node).reverse().find(key => (
              RegExp(/field:[0-9]+/).test(key)
            ));
            const index = lastField ? Number(lastField.split(':')[1]) : 0;
            return setParentValue({ ...node, [`field:${index + 1}`]: null });
          }}
        />
      </li>
    </ul>
  );
}

function isDate(value: string): boolean {
  const regex = RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/);
  return regex.test(value);
}

export default DataAsList;