// @flow

import type { Node } from 'react';

import React, { useState } from 'react';
import ButtonIcon from '../components/ButtonIcon';
import RemoveIcon from '../icons/RemoveIcon';

type Props = {
  name: string,
  value: string,
  setValue(string): void,
};
function StringRowItem({ name, value, setValue }: Props): Node {
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
    <div style={{ display: "flex", alignItems: "center" }}>
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
      <ButtonIcon onMouseDown={() => setValue(undefined)}>
        <RemoveIcon szie={20} />
      </ButtonIcon>
    </div>
  );
}

export default StringRowItem;