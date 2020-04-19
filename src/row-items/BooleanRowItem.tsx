import React, { useState, FunctionComponent } from 'react';
import ButtonIcon from '../components/ButtonIcon';
import RemoveIcon from '../icons/RemoveIcon';

type Props = {
  name: string,
  value: boolean,
  setValue(value: boolean | undefined): void,
};
const BooleanRowItem: FunctionComponent<Props> = ({ name, value, setValue }) => {
  const [isEditing, setIsEditing] = useState(false);
  if (!isEditing) {
    return (
      <span onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
        {value ? "yes" : "no"}
      </span>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="checkbox"
        checked={value}
        name={name}
        onChange={(e) => setValue(!value)}
        ref={(input) => { input && input.focus() }}
        onBlur={() => setIsEditing(false)}
        style={{ cursor: "pointer" }}
      />
      <ButtonIcon onMouseDown={() => setValue(undefined)}>
        <RemoveIcon size={20} />
      </ButtonIcon>
    </div>
  );
}

export default BooleanRowItem;