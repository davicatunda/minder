import React, { FunctionComponent } from "react";
import SVGWrapper from "./SVGWrapper";

type Props = {
  size: number;
};
const CreateIcon: FunctionComponent<Props> = ({ size }) => (
  <SVGWrapper fontSize={size}>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
  </SVGWrapper>
);

export default CreateIcon;
