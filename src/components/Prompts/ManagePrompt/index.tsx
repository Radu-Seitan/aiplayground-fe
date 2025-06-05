import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ManagePrompt.css";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Prompt } from "../../shared/types/Prompt";
import { PromptCreate } from "../../shared/types/PromptCreate";
import { Scope } from "../../shared/types/Scope";
import { ScopesApiClient } from "../../../api/Clients/ScopesApiClient";
import { ScopeModel } from "../../../api/Models/ScopeModel";

const DEFAULT_PROMPT: Prompt = {
  id: undefined,
  expectedResult: undefined,
  name: undefined,
  userMessage: undefined,
  systemMessage: undefined,
};

export const ManagePrompt: FC = () => {
  const [prompt, setPrompt] = useState<Prompt | PromptCreate>(DEFAULT_PROMPT);
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [areScopesLoading, setAreScopesLoading] = useState(false);
  const { id } = useParams();

  const fetchScopes = async () => {
    try {
      setAreScopesLoading(true);

      const res = await ScopesApiClient.getAllAsync();

      const fetchedScopes = res.map((e: ScopeModel) => ({ ...e } as Scope));

      setScopes(fetchedScopes);

      setAreScopesLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const computeTitle = () => {
    if (id) {
      return (
        <>
          Manage prompt: <strong>{id}</strong>
        </>
      );
    }
    return "Create new prompt";
  };

  const handleSave = () => {};

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPrompt((prevPrompt) => {
      const updatedPrompt = { ...prevPrompt, [name]: value };
      return updatedPrompt;
    });
  };

  useEffect(() => {
    fetchScopes();
  }, []);

  if (areScopesLoading) {
    return (
      <Stack justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress size={60} />
      </Stack>
    );
  }

  return (
    <Box className="manage-prompt-wrapper">
      <Stack flexDirection="row" justifyContent="center" alignItems="center">
        <Box className={"manage-prompt-title"}>{computeTitle()}</Box>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="h6">Name</Typography>
        <TextField
          key="name"
          id="name"
          name="name"
          value={prompt.name ?? ""}
          onChange={handleChange}
        />
        {!id && (
          <>
            <Typography variant="h6">Scope</Typography>
            <TextField
              select
              key="scopeId"
              id="scopeId"
              name="scopeId"
              value={(prompt as PromptCreate).scopeId ?? ""}
              onChange={handleChange}
            >
              {scopes.map((scope) => (
                <MenuItem key={scope.id} value={scope.id}>
                  {scope.name}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}
        <Typography variant="h6">System message</Typography>
        <TextField
          key="systemMessage"
          id="systemMessage"
          name="systemMessage"
          value={prompt.systemMessage ?? ""}
          multiline
          rows={3}
          onChange={handleChange}
        />
        <Typography variant="h6">User message</Typography>
        <TextField
          key="userMessage"
          id="userMessage"
          name="userMessage"
          value={prompt.userMessage ?? ""}
          multiline
          rows={3}
          onChange={handleChange}
        />
        <Typography variant="h6">Expected result</Typography>
        <TextField
          key="expectedResult"
          id="expectedResult"
          name="expectedResult"
          value={prompt.expectedResult ?? ""}
          multiline
          rows={3}
          onChange={handleChange}
        />
      </Stack>
      {!id && (
        <Stack direction={"row"} justifyContent={"flex-end"} mt={2}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleSave}
          >
            Save
          </Button>
        </Stack>
      )}
    </Box>
  );
};
