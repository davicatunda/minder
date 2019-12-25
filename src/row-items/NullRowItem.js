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
        <button onClick={() => props.setValue(false)}>boolean</button>
        <button onClick={() => props.setValue(0)}>number</button>
        <button onClick={() => props.setValue("")}>string</button>
        <button onClick={() => props.setValue(new Date())}>date</button>
        <button onClick={() => props.setValue([])}>array</button>
        <button onClick={() => props.setValue({})}>object</button>
      </>
    );
  }

  return (
    <button onClick={() => setBanana(true)}>
      <CreateIcon size={12} />
    </button>
  );
}


export default NullRowItem;