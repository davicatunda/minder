// @flow

import type { Node } from 'react';

import React from 'react';
import StringRowItem from './StringRowItem';
import BooleanRowItem from './BooleanRowItem';
import NumberRowItem from './NumberRowItem';
import DateRowItem from './DateRowItem';

type Props<T> = { node: T, setParentValue: T => void };
function DataAsList<T: { }> (props: Props<T>): Node {
  const { node, setParentValue } = props;
  return (
    <ul>
      {Object.keys(node).map(key => (
        <li key={key}>
          {`[${key}]: `}
          {function () {
            const value = node[key];
            const setValue = (newValue) => setParentValue({ ...node, [key]: newValue });
            switch (typeof value) {
              case 'string':
                return <StringRowItem name={key} value={value} setValue={setValue} />;
              case 'number':
                return <NumberRowItem name={key} value={value} setValue={setValue} />;
              case 'boolean':
                return <BooleanRowItem name={key} value={value} setValue={setValue} />;
              case 'object':
              default:
                if (value instanceof Date) {
                  return <DateRowItem name={key} value={value} setValue={setValue} />;
                };
                if (value instanceof Array) {
                  return <DataAsList node={value} setParentValue={setValue} />;
                };
                if (value === null) {
                  return <StringRowItem name={key} value={""} setValue={setValue} />;
                };
                return <DataAsList node={value} setParentValue={setValue} />;
            }
          }()}
        </li>
      ))}
      {node instanceof Array && <li>add one more</li>}
    </ul>
  );
}

export default DataAsList;