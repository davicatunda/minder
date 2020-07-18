import React, { useState, FunctionComponent } from "react";
import ButtonIcon from "../components/ButtonIcon";
import RemoveIcon from "../icons/RemoveIcon";

type Props = {
  name: string;
  value: string;
  setValue(value: string | undefined): void;
};
const StringRowItem: FunctionComponent<Props> = ({ name, value, setValue }) => {
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
        ref={(input) => {
          input && input.focus();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsEditing(false);
          }
        }}
      />
      <ButtonIcon onMouseDown={() => setValue(undefined)}>
        <RemoveIcon size={20} />
      </ButtonIcon>
    </div>
  );
};

export default StringRowItem;
