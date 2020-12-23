import {
  Add,
  Cached,
  Done,
  ExpandLess,
  ExpandMore,
  GetApp,
  HelpOutline,
} from "@material-ui/icons";
import {
  Button,
  Collapse,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import { createKey, isKeyValid, useDataDecryption } from "../../../utils/encryption";

import { CardDataProps } from "../cards/CardRoot";
import DragAndDrop from "./DragAndDrop";

enum DataOptions {
  STANDARD = "STANDARD",
  EMPTY = "EMPTY",
  CUSTOM = "CUSTOM",
}
type Props = {
  standardProposal: {
    version: string;
    data: string;
  };
  value: CardDataProps;
  setValue(card: CardDataProps): void;
  onSubmit(): void;
  onCancel(): void;
};
export default function MemoryVaultCreateForm({
  standardProposal,
  value,
  setValue,
  onSubmit,
  onCancel,
}: Props) {
  const theme = useTheme();

  function setEncryptionKey(newEncryptionKey: string) {
    const newCardData = {
      ...value,
      initialValues: {
        ...value.initialValues,
        encryptionKey: newEncryptionKey,
      },
    };
    setValue(newCardData);
  }

  function setInitialData(newInitialData: string) {
    const newCardData = {
      ...value,
      initialValues: {
        ...value.initialValues,
        initialData: newInitialData,
      },
    };
    setValue(newCardData);
  }

  function setTitle(newTitle: string) {
    const newCardData = { ...value, title: newTitle };
    setValue(newCardData);
  }

  const { hasFailed } = useDataDecryption(
    value.initialValues.initialData,
    value.initialValues.encryptionKey,
  );
  const { encryptionKey, initialData } = value.initialValues;
  return (
    <>
      <CreateCardTitleInput title={value.title ?? ""} setTitle={setTitle} />
      <CreateCardKeyInput
        encryptionKey={encryptionKey}
        setEncryptionKey={setEncryptionKey}
      />
      <CreateCardDataSection
        standardProposal={standardProposal}
        setInitialData={setInitialData}
      />
      <div style={{ height: theme.spacing(2) }} />
      {initialData !== "" && encryptionKey !== null && hasFailed && (
        <Typography variant="body2" color="error" align="center">
          Key and data don't match
        </Typography>
      )}
      <Button
        fullWidth
        variant="contained"
        disabled={hasFailed || encryptionKey.length === 0}
        color="primary"
        size="small"
        startIcon={<Add />}
        onClick={() => {
          onSubmit();
        }}
      >
        Open
      </Button>
      <Button fullWidth size="small" onClick={onCancel}>
        Cancel
      </Button>
    </>
  );
}

type CreateCardTitleInputProps = {
  title: string;
  setTitle: (title: string) => void;
};
function CreateCardTitleInput({ title, setTitle }: CreateCardTitleInputProps) {
  return (
    <TextField
      variant="outlined"
      margin="dense"
      fullWidth
      label="Title"
      autoComplete="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      autoFocus
    />
  );
}

type CreateCardKeyInputProps = {
  encryptionKey: string;
  setEncryptionKey: (encryptionKey: string) => void;
};
function CreateCardKeyInput({
  encryptionKey,
  setEncryptionKey,
}: CreateCardKeyInputProps) {
  return (
    <DragAndDrop onDrop={(file) => readFile(file, setEncryptionKey)}>
      <TextField
        variant="outlined"
        margin="dense"
        error={encryptionKey.length > 0 && !isKeyValid(encryptionKey)}
        required
        fullWidth
        label="Encryption Key"
        type="password"
        autoComplete="current-encryption-key"
        value={encryptionKey}
        onChange={(e) => setEncryptionKey(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Generate key" arrow>
                <IconButton
                  aria-label="generate encryption Key"
                  onClick={() => createKey().then(setEncryptionKey)}
                >
                  <Cached fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </DragAndDrop>
  );
}

type CreateCardDataSectionProps = {
  setInitialData: (initialData: string) => void;
  standardProposal: {
    version: string;
    data: string;
  };
};
function CreateCardDataSection({
  standardProposal,
  setInitialData,
}: CreateCardDataSectionProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [dataOption, selectDataOption] = useState<DataOptions>(DataOptions.STANDARD);
  const [encryptedData, setEncryptedData] = useState<string | null>(null);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
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
                return setInitialData(standardProposal.data);
            }
          }}
        >
          <FormControlLabel
            value={DataOptions.STANDARD}
            control={<Radio size="small" />}
            label={`Standard v${standardProposal.version}`}
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
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                My own <span style={{ width: theme.spacing(1) }} />
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
              style={{
                textTransform: "none",
                outlineWidth: 2,
                outlineStyle: "dashed",
                outlineColor: theme.palette.secondary.main,
              }}
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

function readFile(file: File | null | undefined, onDone: (reuslt: string) => void) {
  if (!file) return;
  const reader = new FileReader();
  reader.onloadend = () => {
    if (typeof reader.result === "string") {
      onDone(reader.result);
    }
  };
  reader.readAsText(file);
}
