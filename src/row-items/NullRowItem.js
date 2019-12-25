import type { Node } from 'react';

import React, { useState } from 'react';
import CreateIcon from '../icons/CreateIcon';
type Value = number | boolean | string | Date;
type Props = {
  name: string,
  setValue(Value): void,
};

function NullRowItem(props: Props): Node {
  const [banana, setBanana] = useState(false);
  if (banana) {
    return (
      <>
        <button onClick={() => props.setValue(false)}>checkbox</button>
        <button onClick={() => props.setValue(0)}>number</button>
        <button onClick={() => props.setValue("")}>text</button>
        <button onClick={() => props.setValue(new Date())}>date</button>
        <button onClick={() => props.setValue([])}>list</button>
        <button onClick={() => props.setValue({})}>object</button>
      </>
    );
  }

  return (
    <button
      onClick={() => setBanana(true)}
      style={{
        background: "none",
        border: 0,
        padding: 0,
        margin: 0,
        cursor: "pointer",
      }}
    >
      <CreateIcon size={20} />
    </button>
  );
}


export default NullRowItem;