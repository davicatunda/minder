// @flow

import type { Node } from 'react';

import React from 'react';

type Props = {
  name: string,
  value: boolean,
  setValue(boolean): void,
};
function BooleanRowItem({ name, value, setValue }: Props): Node {
  return (
    <input
      type="checkbox"
      checked={value}
      name={name}
      onChange={(e) => setValue(!value)}
      value={value}
      style={{ cursor: "pointer" }}
    />
  );
}

export default BooleanRowItem;