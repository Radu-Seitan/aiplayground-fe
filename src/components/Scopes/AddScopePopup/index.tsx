import { FC, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import "./AddScopePopup.css";
import { ScopeModel } from "../../../api/Models/ScopeModel";
import { ScopesApiClient } from "../../../api/Clients/ScopesApiClient";
import { Scope } from "../../shared/types/Scope";

interface AddScopePopupProps {
  open: boolean;
  onClose: () => void;
  onEditing: (scope: Scope) => void;
}

export const AddScopePopup: FC<AddScopePopupProps> = ({
  open,
  onClose,
  onEditing,
}: AddScopePopupProps) => {
  const [scopeName, setScopeName] = useState("");

  const createScope = async () => {
    const model: ScopeModel = { name: scopeName };

    try {
      const res = await ScopesApiClient.createOneAsync(model);
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
    const scopeModel = await createScope();
    const newScope = scopeModel as Scope;
    onEditing(newScope);
    handleClose();
  };

  return (
    <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={handleClose}>
      <DialogTitle fontSize={24}>Create a new scope</DialogTitle>
      <DialogContent className={"add-scope-modal-content"}>
        <TextField
          fullWidth
          label="Scope name"
          value={scopeName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setScopeName(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions className={"add-scope-modal-actions"}>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!scopeName}
          className="save-button"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
