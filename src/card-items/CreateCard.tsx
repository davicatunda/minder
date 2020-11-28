import {
  Add,
  Cached,
  Done,
  ExpandLess,
  ExpandMore,
  GetApp,
  LockOutlined,
} from "@material-ui/icons";
import {
  Avatar,
  Button,
  Collapse,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import { CardDataProps } from "./CardViewRoot";
import DragAndDrop from "../components/DragAndDrop";
import { createKey } from "../utils/encryption";

type OfflinePageResponse = {
  standardProposal: {
    version: string;
    data: string;
  };
};
const QUERY = gql`
  query OfflinePage {
    standardProposal {
      version
      data
    }
  }
`;

enum DataOptions {
  STANDARD = "STANDARD",
  EMPTY = "EMPTY",
  CUSTOM = "CUSTOM",
}
type Props = {
  onSubmit(card: CardDataProps): void;
};
export default function CreateCard({ onSubmit }: Props) {
  const theme = useTheme();
  const [initialData, setInitialData] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const { data } = useQuery<OfflinePageResponse>(QUERY, {
    onCompleted: (data) => {
      setInitialData(data.standardProposal.data);
    },
  });
  if (data == null) {
    return null;
  }
  return (
    <Paper style={{ padding: theme.spacing(2), margin: "auto", maxWidth: 380 }}>
      <CreateCardHeader />
      <CreateCardTitleInput title={title} setTitle={setTitle} />
      <CreateCardKeyInput
        encryptionKey={encryptionKey}
        setEncryptionKey={setEncryptionKey}
      />
      <CreateCardDataSection
        standardProposal={data.standardProposal}
        setInitialData={setInitialData}
      />
      <div style={{ height: theme.spacing(1) }} />
      <Button
        fullWidth
        variant="contained"
        disabled={encryptionKey === "" || initialData === null}
        color="primary"
        startIcon={<Add />}
        onClick={() => {
          onSubmit({
            title: title !== "" ? title : "Primary",
            initialValues: {
              encryptionKey,
              initialData: initialData as string,
            },
          });
        }}
      >
        Open
      </Button>
    </Paper>
  );
}

function CreateCardHeader() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Avatar>
        <LockOutlined />
      </Avatar>
      <Typography variant="h5">Start</Typography>
    </div>
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
      margin="normal"
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
        margin="normal"
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
              <Tooltip title="Generate new key" arrow>
                <IconButton
                  aria-label="generate new encryption Key"
                  onClick={() => createKey().then(setEncryptionKey)}
                >
                  <Cached />
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
  setInitialData: (initialData: string | null) => void;
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
                return setInitialData(encryptedData);
              case DataOptions.EMPTY:
                return setInitialData("{}");
              case DataOptions.STANDARD:
                return setInitialData(standardProposal.data);
            }
          }}
        >
          <FormControlLabel
            value={DataOptions.STANDARD}
            control={<Radio />}
            label={`Standard v${standardProposal.version}`}
          />
          <FormControlLabel
            value={DataOptions.EMPTY}
            control={<Radio />}
            label="Empty"
          />
          <FormControlLabel
            value={DataOptions.CUSTOM}
            control={<Radio />}
            label="My own"
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
                <Typography variant="body1">
                  Drag or upload your encrypted data
                </Typography>
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
