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
import { TableHeader } from "../common/TableHeader";
import { LoadingRow } from "../common/LoadingRow";
import { EmptyTableRow } from "../common/EmptyTableRow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { renderLabelDisplayedRows } from "../shared/utils/table.util";
import EditIcon from "@mui/icons-material/Edit";
import { AddScopePopup } from "./AddScopePopup";
import { EditScopePopup } from "./EditScopePopup";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Scopes.css";
import { Scope } from "../shared/types/Scope";
import { ScopesApiClient } from "../../api/Clients/ScopesApiClient";
import { ScopeModel } from "../../api/Models/ScopeModel";

export const Scopes: FC = () => {
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [openAddPopup, setOpenAddPopup] = useState(false);
  const handleOpenAddPopup = () => setOpenAddPopup(true);
  const handleCloseAddPopup = () => setOpenAddPopup(false);

  const [editableScope, setEditableScope] = useState<Scope>();
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const handleOpenEditPopup = () => setOpenEditPopup(true);
  const handleCloseEditPopup = () => setOpenEditPopup(false);

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
      id: "actions",
      label: "Actions",
    },
  ];

  const fetchScopes = async () => {
    try {
      setIsLoading(true);

      const res = await ScopesApiClient.getAllAsync();

      const fetchedScopes = res.map((e: ScopeModel) => ({ ...e } as Scope));

      setScopes(fetchedScopes);

      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteScope = async (deletedScope: Scope) => {
    try {
      if (!deletedScope.id) {
        return;
      }

      const res = await ScopesApiClient.deleteOneAsync(deletedScope.id);

      setScopes(scopes.filter((scope) => scope.id !== deletedScope.id));
    } catch (error: any) {
      console.log(error);
    }
  };

  const renderActions = (scope: Scope) => {
    return (
      <>
        <IconButton
          onClick={() => {
            setEditableScope(scope);
            handleOpenEditPopup();
          }}
        >
          <EditIcon color="primary" fontSize="large" />
        </IconButton>
        <IconButton
          onClick={() => {
            deleteScope(scope);
          }}
        >
          <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
      </>
    );
  };

  useEffect(() => {
    fetchScopes();
  }, []);

  return (
    <Box className={"scopes-wrapper"}>
      <Stack flexDirection="row" justifyContent="center" alignItems="center">
        <Box className={"scopes-title"}>Scopes</Box>
      </Stack>

      <Box>
        <Box>
          <IconButton onClick={handleOpenAddPopup}>
            <AddCircleIcon color="primary" fontSize="large" />
          </IconButton>
        </Box>

        <TableContainer component={Paper} className={"scopes-table-container"}>
          <Table>
            <TableHeader columns={columns} />
            <TableBody>
              {scopes && scopes.length ? (
                <>
                  {scopes.map((scope: Scope, index: number) => (
                    <TableRow key={index} className={"scopes-table-row"}>
                      <TableCell align="center">{scope.id}</TableCell>
                      <TableCell align="center">{scope.name}</TableCell>
                      <TableCell align="center">
                        {renderActions(scope)}
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
        <Box className={"scopes-table-footer"}>
          {renderLabelDisplayedRows(scopes.length, "scopes")}
        </Box>
      </Box>
      <AddScopePopup
        open={openAddPopup}
        onClose={handleCloseAddPopup}
        onEditing={(scope: Scope) => {
          setScopes([...scopes, scope]);
        }}
      />
      {editableScope && (
        <EditScopePopup
          open={openEditPopup}
          onClose={() => {
            setEditableScope(undefined);
            handleCloseEditPopup();
          }}
          onEditing={(updatedScope: Scope) => {
            setScopes(
              scopes.map((scope) =>
                scope.id === updatedScope.id ? updatedScope : scope
              )
            );
          }}
          editableScope={editableScope}
        />
      )}
    </Box>
  );
};
