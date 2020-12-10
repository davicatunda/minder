import Filter1OutlinedIcon from "@material-ui/icons/Filter1Outlined";
import FolderOpenOutlinedIcon from "@material-ui/icons/FolderOpenOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import React from "react";
import { RefinedType } from "../../../utils/normalization";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import ToggleOnOutlinedIcon from "@material-ui/icons/ToggleOnOutlined";
import useDecodedDataContext from "../useDecodedDataContext";

function NodeTypeIcon(props: { nodeKey: string }) {
  const { store } = useDecodedDataContext();
  const node = store.nodes[props.nodeKey];
  switch (node.type) {
    case RefinedType.Boolean:
      return <ToggleOnOutlinedIcon />;
    case RefinedType.Date:
      return <TodayOutlinedIcon />;
    case RefinedType.List:
      return <ListOutlinedIcon />;
    case RefinedType.Null:
      return <HelpOutlineOutlinedIcon />;
    case RefinedType.Number:
      return <Filter1OutlinedIcon />;
    case RefinedType.Object:
      return <FolderOpenOutlinedIcon />;
    case RefinedType.String:
      return <SubjectOutlinedIcon />;
  }
}

export default NodeTypeIcon;
