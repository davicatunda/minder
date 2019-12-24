// @flow

import type { Node } from 'react';

import React, { useState } from 'react';

type Props = {
  name: string,
  value: Date,
  setValue(Date): void,
};
function DateRowItem({ name, value, setValue }: Props): Node {
  const [isEditing, setIsEditing] = useState(false);
  if (!isEditing) {
    return (
      <span onClick={() => setIsEditing(true)}>
        {date2HumanValue(value)}
      </span>
    );
  }
  return (
    <input
      type="date"
      name={name}
      onBlur={() => setIsEditing(false)}
      onChange={(e) => setValue(value2date(e.target.value))}
      value={date2value(value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setIsEditing(false);
        }
      }}
    />
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