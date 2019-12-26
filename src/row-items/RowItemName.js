// @flow

import type { Node } from 'react';

import React, { useState } from 'react';

type Props = {
  name: string,
  setName(string): void,
  isValid(string): boolean,
};
const commonStyle = {
  marginRight: 12,
  width: 120,
  boxSizing: "border-box",
};
function RowItemName({ name, setName, isValid }: Props): Node {
  const [isEditing, setIsEditing] = useState(false);
  const [temporaryName, setTemporaryName] = useState(name);
  const saveName = () => {
    if (isValid(temporaryName)) {
      setName(temporaryName);
      setIsEditing(false);
    }
  }
  if (!isEditing) {
    return (
      <span
        onClick={() => setIsEditing(true)}
        style={{
          fontWeight: "bold",
          cursor: "pointer",
          ...commonStyle,
        }}>
        {temporaryName === '' ? "?" : temporaryName}
      </span>
    );
  }

  return (
    <input
      type="text"
      name={temporaryName}
      style={commonStyle}
      onChange={(e) => setTemporaryName(e.target.value)}
      value={temporaryName}
      onBlur={saveName}
      ref={(input) => { input && input.focus() }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          saveName();
        }
      }}
    />
  );
}

export default RowItemName;