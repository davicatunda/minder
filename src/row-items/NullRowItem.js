import type { Node } from 'react';

import React, { useState } from 'react';
import CreateIcon from '../icons/CreateIcon';
import RemoveIcon from '../icons/RemoveIcon';
import ButtonIcon from '../components/ButtonIcon';

type Value = number | boolean | string | Date;
type Props = {
  name: string,
  setValue(Value): void,
};
function NullRowItem(props: Props): Node {
  const [isSelectingType, setIsSelectingType] = useState(false);
  if (isSelectingType) {
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
    <div style={{ display: "flex", alignItems: "center" }}>
      <ButtonIcon onClick={() => setIsSelectingType(true)}>
        <CreateIcon size={20} />
      </ButtonIcon>
      <ButtonIcon onMouseDown={() => props.setValue(undefined)}>
        <RemoveIcon szie={20} />
      </ButtonIcon>
    </div>
  );
}


export default NullRowItem;