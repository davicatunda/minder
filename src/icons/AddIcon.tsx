import React, { FunctionComponent } from 'react';
import SVGWrapper from './SVGWrapper';

type Props = {
  size: number,
};
const AddIcon: FunctionComponent<Props> = ({ size }) => (
  <SVGWrapper fontSize={size}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
  </SVGWrapper>
);
export default AddIcon;

