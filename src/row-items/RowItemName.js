// @flow

import type { Node } from 'react';

import React, { useState } from 'react';

type Props = {
  name: string,
  setName(string): void,
};
function RowItemName({ name, setName }: Props): Node {
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return (
      <span onClick={() => setIsEditing(true)}>
        {`[${name}]: `}
      </span>
    );
  }

  return (
    <input
      type="text"
      name={'name'}
      onChange={(e) => setName(e.target.value)}
      value={name}
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

export default RowItemName;