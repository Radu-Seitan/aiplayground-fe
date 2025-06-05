import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import "./Prompts.css";
import { AddCircle, Delete } from "@mui/icons-material";
import { EmptyTableRow } from "../common/EmptyTableRow";
import { LoadingRow } from "../common/LoadingRow";
import { TableHeader } from "../common/TableHeader";
import { renderLabelDisplayedRows } from "../shared/utils/table.util";
import { Prompt } from "../shared/types/Prompt";
import { PromptsApiClient } from "../../api/Clients/PromptsApiClient";
import { PromptModel } from "../../api/Models/PromptModel";
import { DeletePopup } from "../common/DeletePopup";

export const Prompts: FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDeletePopup, setOpenDeletePopup] = useState<boolean>(false);
  const [promptToDelete, setPromptToDelete] = useState<Prompt>();

  const columns = [
    {
      id: "id",
      label: "Id",
    },
    {
      id: "name",
      label: "Name",
    },
    {
      id: "systemMessage",
      label: "System message",
    },
    {
      id: "userMessage",
      label: "User message",
    },
    {
      id: "expectedResult",
      label: "Expected result",
    },
    {
      id: "actions",
      label: "Actions",
    },
  ];

  const fetchPrompts = async () => {
    try {
      setIsLoading(true);

      const res = await PromptsApiClient.getAllAsync();

      const fetchedPrompts = res.map((e: PromptModel) => ({ ...e } as Prompt));

      setPrompts(fetchedPrompts);

      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const deletePrompt = async (prompt: Prompt) => {
    try {
      if (!prompt.id) {
        return;
      }

      await PromptsApiClient.deleteOneAsync(prompt.id);

      setPrompts(prompts.filter((prompt) => prompt.id !== prompt.id));
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleCreatePrompt = () => {};

  const renderActions = (prompt: Prompt) => {
    return (
      <IconButton
        onClick={() => {
          setPromptToDelete(prompt);
          setOpenDeletePopup(true);
        }}
      >
        <Delete color="primary" fontSize="large" />
      </IconButton>
    );
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <Box className="prompts-wrapper">
      <Stack flexDirection="row" justifyContent="center" alignItems="center">
        <Box className="prompts-title">Prompts</Box>
      </Stack>
      <Box>
        <Box>
          <IconButton onClick={handleCreatePrompt}>
            <AddCircle color="primary" fontSize="large" />
          </IconButton>
        </Box>
        <TableContainer component={Paper} className={"prompts-table-container"}>
          <Table>
            <TableHeader columns={columns} />
            <TableBody>
              {prompts && prompts.length ? (
                <>
                  {prompts.map((prompt: Prompt, index: number) => (
                    <TableRow key={index} className={"prompts-table-row"}>
                      <TableCell align="center">{prompt.id}</TableCell>
                      <TableCell align="center">{prompt.name}</TableCell>
                      <TableCell align="center">
                        {prompt.systemMessage}
                      </TableCell>
                      <TableCell align="center">{prompt.userMessage}</TableCell>
                      <TableCell align="center">
                        {prompt.expectedResult}
                      </TableCell>
                      <TableCell align="center">
                        {renderActions(prompt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : isLoading ? (
                <LoadingRow />
              ) : (
                <EmptyTableRow />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className={"prompts-table-footer"}>
          {renderLabelDisplayedRows(prompts.length, "prompts")}
        </Box>
      </Box>
      <DeletePopup
        entityTitle={promptToDelete?.name ?? "Unknown"}
        open={openDeletePopup}
        onClose={() => {
          setOpenDeletePopup(false);
          setPromptToDelete(undefined);
        }}
        onConfirm={() => {
          if (promptToDelete) {
            deletePrompt(promptToDelete);
          }
          setOpenDeletePopup(false);
          setPromptToDelete(undefined);
        }}
      />
    </Box>
  );
};
