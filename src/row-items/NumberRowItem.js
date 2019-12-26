// @flow

import type { Node } from 'react';

import React, { useState } from 'react';
import ButtonIcon from '../components/ButtonIcon';
import RemoveIcon from '../icons/RemoveIcon';

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
    <div style={{ display: "flex", alignItems: "center" }}>
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
      <ButtonIcon onMouseDown={() => setValue(undefined)}>
        <RemoveIcon szie={20} />
      </ButtonIcon>
    </div>
  );
}

export default NumberRowItem;