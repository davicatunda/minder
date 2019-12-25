// @flow

import type { Node } from 'react';

import React from 'react';
import StringRowItem from './StringRowItem';
import BooleanRowItem from './BooleanRowItem';
import NumberRowItem from './NumberRowItem';
import DateRowItem from './DateRowItem';
import AddListRowItem from './AddListRowItem';

type Props<T> = { node: T, setParentValue: T => void };
function DataAsList<T: { }> (props: Props<T>): Node {
  const { node, setParentValue } = props;
  return (
    <ul>
      {Object.keys(node).map((key: string) => (
        <li key={key}>
          {`[${key}]: `}
          {function () {
            const value = node[key];
            const setValue = node instanceof Array ?
              (newValue) =>
                setParentValue(node.map((v, index) =>
                  index === Number(key) ? newValue : v
                )) :
              (newValue) => setParentValue({ ...node, [key]: newValue });
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
                if (value === null) {
                  return <StringRowItem name={key} value={""} setValue={setValue} />;
                };
                return <DataAsList node={value} setParentValue={setValue} />;
            }
          }()}
        </li>
      ))}
      {node instanceof Array && (
        <li>
          <AddListRowItem onAddItem={() => setParentValue([...node, null])} />
        </li>
      )}
    </ul>
  );
}

function isDate(value: string): boolean {
  const regex = RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/);
  return regex.test(value);
}

export default DataAsList;