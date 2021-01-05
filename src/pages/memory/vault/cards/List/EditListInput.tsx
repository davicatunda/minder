import { Add, ArrowDownward, ArrowUpward, Delete } from "@material-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import EditValueInput, { DraftNode } from "../EditValueInput";
import { HorizontalSpace, VerticalSpace } from "../../../../core/Spacing";
import {
  RefinedType,
  TListNode,
  TNode,
  defaultNodeValue,
} from "../../../../../utils/normalization";

import React from "react";
import { css } from "@emotion/css";

type Props = {
  node: TListNode;
  childNodes?: TNode[];
  onChange(node: DraftNode): void;
};
export default function EditListInput({ node, childNodes, onChange }: Props) {
  const listType = childNodes && childNodes.length > 0 ? childNodes[0].type : "";
  return (
    <FormControl variant="filled" fullWidth>
      <FormControl variant="filled">
        <InputLabel id="select-type-label">Of</InputLabel>
        <Select
          labelId="select-type-label"
          value={listType}
          onChange={(event) => {
            const newType: RefinedType = event.target.value as RefinedType;
            const newTemplateNode = defaultNodeValue(newType, node);
            onChange({
              valueNode: {
                ...node,
                children: [newTemplateNode.key],
              },
              childNodes: [newTemplateNode],
            });
          }}
        >
          <MenuItem value={RefinedType.String}>Text</MenuItem>
          <MenuItem value={RefinedType.Number}>Number</MenuItem>
          <MenuItem value={RefinedType.Date}>Date</MenuItem>
        </Select>
      </FormControl>
      <VerticalSpace s1 />
      {childNodes?.map((child, index, all) => (
        <div
          key={child.key}
          className={css({ display: "flex", alignItems: "center" })}
        >
          <EditValueInput
            node={{ valueNode: child }}
            onChange={(newNode) => {
              const newValueNode = newNode.valueNode;
              if (newValueNode) {
                onChange({
                  valueNode: node,
                  childNodes: childNodes.map((old) =>
                    old.key === child.key ? newValueNode : old,
                  ),
                });
              }
            }}
          />
          <HorizontalSpace s1 />
          <ButtonGroup orientation="vertical">
            <IconButton
              size="small"
              disabled={index === 0}
              onClick={() => {
                const newChildNodes = [
                  ...childNodes.slice(0, index - 1),
                  child,
                  ...childNodes.slice(index - 1, index),
                  ...childNodes.slice(index + 1),
                ];
                onChange({
                  valueNode: {
                    ...node,
                    children: newChildNodes.map((item) => item.key),
                  },
                  childNodes: newChildNodes,
                });
              }}
            >
              <ArrowUpward style={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              disabled={index === all.length - 1}
              onClick={() => {
                const newChildNodes = [
                  ...childNodes.slice(0, index),
                  ...childNodes.slice(index + 1, index + 2),
                  child,
                  ...childNodes.slice(index + 2),
                ];
                onChange({
                  valueNode: {
                    ...node,
                    children: newChildNodes.map((item) => item.key),
                  },
                  childNodes: newChildNodes,
                });
              }}
            >
              <ArrowDownward style={{ fontSize: 16 }} />
            </IconButton>
          </ButtonGroup>
          <IconButton
            onClick={() => {
              const newChildNodes = childNodes.filter(
                (old) => old.key !== child.key,
              );
              onChange({
                valueNode: {
                  ...node,
                  children: newChildNodes.map((item) => item.key),
                },
                childNodes: newChildNodes,
              });
            }}
          >
            <Delete />
          </IconButton>
        </div>
      ))}
      {childNodes && childNodes.length > 0 && (
        <>
          <VerticalSpace s1 />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              if (listType !== "") {
                const newTemplateNode = defaultNodeValue(listType, node);
                const newChildNodes = [...childNodes, newTemplateNode];
                onChange({
                  valueNode: {
                    ...node,
                    children: newChildNodes.map((item) => item.key),
                  },
                  childNodes: newChildNodes,
                });
              }
            }}
            startIcon={<Add />}
          >
            Add
          </Button>
        </>
      )}
    </FormControl>
  );
}
