// @flow

import type { Node } from 'react';

import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  setValue(string): void,
};
function TextRowItem({ name, value, setValue }: Props): Node {
  const [isEditing, setIsEditing] = useState(false);
  if (!isEditing) {
    return (
      <span
        onClick={() => setIsEditing(true)}
        style={{ minWidth: 40, display: "inline-block", cursor: "pointer" }}
      >
        {value === "" ? "?" : value}
      </span>
    );
  }

  return (
    <input
      type="text"
      name={name}
      onChange={(e) => setValue(e.target.value)}
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

export default TextRowItem;