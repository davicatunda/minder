import React, { useState, FunctionComponent } from 'react';
import ButtonIcon from '../components/ButtonIcon';
import RemoveIcon from '../icons/RemoveIcon';

type Props = {
  name: string,
  value: Date,
  setValue(value: Date | undefined): void,
};
const DateRowItem: FunctionComponent<Props> = ({ name, value, setValue }) => {
  const [isEditing, setIsEditing] = useState(false);
  if (!isEditing) {
    return (
      <span onClick={() => setIsEditing(true)}>
        {date2HumanValue(value)}
      </span>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="date"
        name={name}
        onBlur={() => setIsEditing(false)}
        onChange={(e) => setValue(value2date(e.target.value))}
        value={date2value(value)}
        ref={(input) => { input && input.focus() }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setIsEditing(false);
          }
        }}
      />
      <ButtonIcon onMouseDown={() => setValue(undefined)}>
        <RemoveIcon size={20} />
      </ButtonIcon>
    </div>
  );
}

function date2value(date: Date): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function date2HumanValue(date: Date): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}-${day}-${year}`;
}

function value2date(value: string): Date {
  const [year, month, day] = value.split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export default DateRowItem;