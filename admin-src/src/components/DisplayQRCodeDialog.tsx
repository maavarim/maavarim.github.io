import React, { Fragment } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  styled
} from "@material-ui/core";
import Member from "../Member";
import MaavarimQRCode from "./MaavarimQRCode";

interface DisplayQRCodeDialogProps {
  open: boolean;
  onClose: () => void;
  member: Member | null;
}

const DialogContentWithoutPadding = styled(DialogContent)({
  padding: "8px",
  "&.MuiDialogContent-root:first-child": {
    paddingTop: "8px"
  }
});

const DisplayQRCodeDialog = ({
  open,
  onClose,
  member
}: DisplayQRCodeDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Fragment>
      <Dialog
        open={open && member !== null}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {member && (
          <DialogContentWithoutPadding>
            <MaavarimQRCode memberKey={member.key} />
          </DialogContentWithoutPadding>
        )}
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            אוקיי
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DisplayQRCodeDialog;
