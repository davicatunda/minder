import {
  Button,
  Collapse,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import {
  Done,
  ExpandLess,
  ExpandMore,
  GetApp,
  HelpOutline,
} from "@material-ui/icons";
import React, { useState } from "react";

import DragAndDrop from "../DragAndDrop";
import { HorizontalSpace } from "../../../../core/Spacing";
import { css } from "@emotion/css";
import readFile from "./readFile";
import useStandardProposal from "../../../useStandardProposal";

enum DataOptions {
  STANDARD = "STANDARD",
  EMPTY = "EMPTY",
  CUSTOM = "CUSTOM",
}

type Props = {
  setInitialData: (initialData: string) => void;
};
export default function MemoryVaultDataInput({ setInitialData }: Props) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [dataOption, selectDataOption] = useState<DataOptions>(DataOptions.STANDARD);
  const [encryptedData, setEncryptedData] = useState<string | null>(null);

  const standardProposal = useStandardProposal(({ standardProposal }) => {
    if (dataOption === DataOptions.STANDARD) {
      setInitialData(standardProposal.data);
    }
  });
  return (
    <>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        })}
      >
        <Typography variant="body1">Data Options</Typography>
        <IconButton
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <FormLabel component="legend">Initial Data</FormLabel>
        <RadioGroup
          aria-label="Initial data"
          value={dataOption}
          onChange={(event) => {
            const dataOption: DataOptions = (event.target as HTMLInputElement)
              .value as DataOptions;
            selectDataOption(dataOption);
            switch (dataOption) {
              case DataOptions.CUSTOM:
                return setInitialData(encryptedData ?? "");
              case DataOptions.EMPTY:
                return setInitialData("{}");
              case DataOptions.STANDARD:
                return setInitialData(standardProposal?.data ?? "");
            }
          }}
        >
          <FormControlLabel
            value={DataOptions.STANDARD}
            control={<Radio size="small" />}
            label={`Standard v${standardProposal?.version ?? "*"}`}
          />
          <FormControlLabel
            value={DataOptions.EMPTY}
            control={<Radio size="small" />}
            label="Empty"
          />
          <FormControlLabel
            value={DataOptions.CUSTOM}
            control={<Radio size="small" />}
            label={
              <span
                className={css({
                  display: "flex",
                  alignItems: "center",
                })}
              >
                My own <HorizontalSpace s1 />
                <Tooltip
                  title="Your encrypted data or a strigfied json"
                  placement="top"
                >
                  <HelpOutline fontSize="inherit" />
                </Tooltip>
              </span>
            }
          />
        </RadioGroup>
        {DataOptions.CUSTOM === dataOption && (
          <DragAndDrop
            onDrop={(file) =>
              readFile(file, (data) => {
                setEncryptedData(data);
                if (dataOption === DataOptions.CUSTOM) {
                  setInitialData(data);
                }
              })
            }
          >
            <Button
              component="label"
              fullWidth
              className={css({
                textTransform: "none",
                outlineWidth: 2,
                outlineStyle: "dashed",
                outlineColor: theme.palette.secondary.main,
              })}
              startIcon={encryptedData === null ? <GetApp /> : <Done />}
            >
              <input
                hidden
                type="file"
                onChange={(e) =>
                  readFile(e.target.files?.[0], (data) => {
                    setEncryptedData(data);
                    if (dataOption === DataOptions.CUSTOM) {
                      setInitialData(data);
                    }
                  })
                }
              />
              {encryptedData === null ? (
                <Typography variant="body1">Drag or upload your data</Typography>
              ) : (
                <Typography variant="body1">Done</Typography>
              )}
            </Button>
          </DragAndDrop>
        )}
      </Collapse>
    </>
  );
}
