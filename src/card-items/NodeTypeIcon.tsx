import Filter1OutlinedIcon from "@material-ui/icons/Filter1Outlined";
import FolderOpenOutlinedIcon from "@material-ui/icons/FolderOpenOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import React from "react";
import { RefinedType } from "../utils/normalization";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import ToggleOnOutlinedIcon from "@material-ui/icons/ToggleOnOutlined";
import { useDecodedDataState } from "./CardViewRoot";

function NodeTypeIcon(props: { nodeKey: string }) {
  const { store } = useDecodedDataState();
  const node = store.nodes[props.nodeKey];
  switch (node.type) {
    case RefinedType.Boolean:
      return <ToggleOnOutlinedIcon fontSize="small" />;
    case RefinedType.Date:
      return <TodayOutlinedIcon fontSize="small" />;
    case RefinedType.List:
      return <ListOutlinedIcon fontSize="small" />;
    case RefinedType.Null:
      return <HelpOutlineOutlinedIcon fontSize="small" />;
    case RefinedType.Number:
      return <Filter1OutlinedIcon fontSize="small" />;
    case RefinedType.Object:
      return <FolderOpenOutlinedIcon fontSize="small" />;
    case RefinedType.String:
      return <SubjectOutlinedIcon fontSize="small" />;
  }
}

export default NodeTypeIcon;
