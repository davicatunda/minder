import React, { useState, FunctionComponent, CSSProperties } from "react";

type Props = {
  name: string;
  setName(temporaryName: string): void;
  isValid(temporaryName: string): boolean;
};
const commonStyle: CSSProperties = {
  marginRight: 12,
  width: 120,
  boxSizing: "border-box",
};
const RowItemName: FunctionComponent<Props> = ({ name, setName, isValid }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [temporaryName, setTemporaryName] = useState(name);
  const saveName = () => {
    if (isValid(temporaryName)) {
      setName(temporaryName);
      setIsEditing(false);
    }
  };
  if (!isEditing) {
    return (
      <span
        onClick={() => setIsEditing(true)}
        style={{
          fontWeight: "bold",
          cursor: "pointer",
          lineHeight: "28px",
          ...commonStyle,
        }}
      >
        {temporaryName === "" ? "?" : temporaryName}
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
      ref={(input) => {
        input && input.focus();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          saveName();
        }
      }}
    />
  );
};

export default RowItemName;
