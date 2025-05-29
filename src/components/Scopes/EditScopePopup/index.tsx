import { FC, useState } from "react";

import "./EditScopePopup.css";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ScopeModel } from "../../../api/Models/ScopeModel";
import { Scope } from "../../shared/types/Scope";
import { ScopesApiClient } from "../../../api/Clients/ScopesApiClient";

interface EditScopePopupProps {
  open: boolean;
  onClose: () => void;
  onEditing: (scope: Scope) => void;
  editableScope: Scope;
}

export const EditScopePopup: FC<EditScopePopupProps> = ({
  open,
  onClose,
  onEditing,
  editableScope,
}: EditScopePopupProps) => {
  const [id, setId] = useState(`${editableScope.id}`);
  const [scopeName, setScopeName] = useState(editableScope.name);

  const editScope = async () => {
    const model: ScopeModel = { ...editableScope, name: scopeName };

    try {
      const res = await ScopesApiClient.updateOneAsync(model);
      return res;
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setScopeName("");
    onClose();
  };

  const handleSave = async () => {
    const scopeModel = await editScope();
    const newScope = scopeModel as Scope;
    onEditing(newScope);
    handleClose();
  };

  return (
    <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={handleClose}>
      <DialogTitle
        fontSize={24}
      >{`Edit scope ${editableScope.name}`}</DialogTitle>
      <DialogContent className={"edit-scope-modal-content"}>
        <TextField
          fullWidth
          label="Id"
          value={id}
          disabled
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setId(event.target.value);
          }}
        />
        <TextField
          fullWidth
          label="Name"
          value={scopeName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setScopeName(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions className={"edit-scope-modal-actions"}>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!scopeName || scopeName === editableScope.name}
          className="save-button"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
