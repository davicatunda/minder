// @flow

import type { Node } from 'react';

import React from 'react';

type Props = {
  name: string,
  value: Date,
  setValue(Date): void,
};
function DateRowItem({ name, value, setValue }: Props): Node {
  return (
    <input
      type="date"
      name={name}
      onChange={(newValue) => setValue(value2date(newValue))}
      value={date2value(value)}
    />
  );
}

function date2value(date: Date): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function value2date(value: string): Date {
  const [year, month, day] = value.split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export default DateRowItem;