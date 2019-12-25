// @flow

import type { Node } from 'react';

import React, { useState } from 'react';

type Props = {
  name: string,
  value: number,
  setValue(number): void,
};
function NumberRowItem({ name, value, setValue }: Props): Node {
  const [isEditing, setIsEditing] = useState(false);
  if (!isEditing) {
    return (
      <span onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
        {value}
      </span>
    );
  }

  return (
    <input
      type="number"
      name={name}
      onChange={(e) => !isNaN(e.target.value) && setValue(Number(e.target.value))}
      value={value}
      onBlur={() => setIsEditing(false)}
      ref={(input) => { input && input.focus() }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setIsEditing(false);
        }
      }}
    />
  );
}

export default NumberRowItem;