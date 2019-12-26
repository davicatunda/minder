// @flow

import type { Node } from 'react';

import React from 'react';
import SVGWrapper from './SVGWrapper';

type Props = {
  size: number,
};
function RemoveIcon({ size }: Props): Node {
  return (
    <SVGWrapper fontSize={size}>
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
    </SVGWrapper>
  )
}

export default RemoveIcon;


