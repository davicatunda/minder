import React, { FunctionComponent, ChangeEventHandler } from 'react';
import UploadIcon from '../icons/UploadIcon';
import { buttonStyle } from './Button';


type Props = {
  label: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
}
const FileInput: FunctionComponent<Props> = (props: Props) => (
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

export default FileInput;