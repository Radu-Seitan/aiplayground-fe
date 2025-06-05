import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface DeletePopupProps {
  entityTitle: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeletePopup: FC<DeletePopupProps> = ({
  entityTitle,
  open,
  onClose,
  onConfirm,
}: DeletePopupProps) => {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={handleClose}>
      <DialogTitle fontSize={24}>
        {`Are you sure you want to delete ${entityTitle}?`}
      </DialogTitle>
      <DialogContent className={"delete-modal-content"}>
        <Typography>
          This action cannot be undone. Please confirm that you want to delete{" "}
          <strong>{entityTitle}</strong>.
        </Typography>
      </DialogContent>
      <DialogActions className={"delete-modal-actions"}>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          className="confirm-button"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
