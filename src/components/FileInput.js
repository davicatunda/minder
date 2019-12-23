// @flow

import type { Node } from 'react';

import React from 'react';
import UploadIcon from '../icons/UploadIcon';
import { buttonStyle } from './Button';


type Props = {
  label: string,
  onChange(e: SyntheticInputEvent<HTMLInputElement>): void,
}
function FileInput(props: Props): Node {
  return (
    <label style={buttonStyle}>
      <input
        style={{ display: "none" }}
        type="file"
        onChange={props.onChange}
      />
      <span style={{ display: "flex", marginRight: 8, height: 20, width: 20 }}>
        <UploadIcon size={20} />
      </span>
      {props.label}
    </label>
  );
}

export default FileInput;