import React, { useState, Fragment } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  styled,
  Snackbar
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import Alert from "../../components/Alert";
import Member from "../../Member";

const RemoveButton = styled(Button)({
  fontWeight: 600,
  color: red[700]
});

interface DeleteMemberDialogProps {
  db: firebase.firestore.Firestore;
  member: Member | null;
  setMember: (member: Member | null) => void;
  editCallback: (member: Member) => void;
}

const EditMemberDialog = ({
  db,
  member,
  setMember,
  editCallback
}: DeleteMemberDialogProps) => {
  const [lastNotBlankName, setLastNotBlankName] = useState("");
  if (member !== null && lastNotBlankName !== member.name) {
    setLastNotBlankName(member?.name);
  }

  const [successSnackbarIsOpen, setSuccessSnackbarIsOpen] = useState(false);

  const handleClose = () => setMember(null);

  const deleteMember = () => {
    if (member === null) {
      return;
    }
    db.collection("members")
      .doc(member.key)
      .delete()
      .then(() => {
        setSuccessSnackbarIsOpen(true);
        editCallback(member);
        handleClose();
      });
  };

  return (
    <Fragment>
      <Dialog
        open={member !== null}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText>
            החבר.ה <b>{lastNotBlankName}</b> עומד.ת להמחק מהמערכת,
            <br />
            באמת לזה התכוונת?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteMember} color="primary" autoFocus>
            בעצם לא
          </Button>
          <RemoveButton onClick={handleClose} color="primary">
            כןכן
          </RemoveButton>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={successSnackbarIsOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackbarIsOpen(false)}
      >
        <Alert
          onClose={() => setSuccessSnackbarIsOpen(false)}
          severity="success"
        >
          החבר.ה נערכ.ה בהצלחה
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default EditMemberDialog;
