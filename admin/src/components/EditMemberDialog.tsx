import React, { useState, Fragment } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Box,
  Typography,
  styled
} from "@material-ui/core";
import Alert from "./Alert";
import Member from "../Member";
import MemberEditor from "./MemberEditor";
import { red } from "@material-ui/core/colors";

interface EditMemberDialogProps {
  db: firebase.firestore.Firestore;
  open: boolean;
  onClose: () => void;
  member: Member | null;
  editCallback: (member: Member) => void;
  deleteCallback: (member: Member) => void;
}

const DialogContentWithoutPadding = styled(DialogContent)({
  padding: "8px"
});

const DeleteButton = styled(Button)({
  color: red[700]
});

const EditMemberDialog = ({
  db,
  open,
  onClose,
  member,
  editCallback,
  deleteCallback
}: EditMemberDialogProps) => {
  const [editedMember, setEditedMember] = useState<Member | null>(null);
  console.log(editedMember);
  
  const [successEditSnackbarIsOpen, setSuccessEditSnackbarIsOpen] = useState(
    false
  );
  const [
    successDeleteSnackbarIsOpen,
    setSuccessDeleteSnackbarIsOpen
  ] = useState(false);
  const [deleteSafeSwitchIsOn, setDeleteSafeSwitchIsOn] = useState(false);

  const handleClose = () => {
    onClose();
    setDeleteSafeSwitchIsOn(false);
  };

  const deleteMember = () => {
    if (!deleteSafeSwitchIsOn) {
      return setDeleteSafeSwitchIsOn(true);
    }

    if (editedMember === null || editedMember.key === "") {
      return;
    }
    db.collection("members")
      .doc(editedMember.key)
      .delete()
      .then(() => {
        setSuccessDeleteSnackbarIsOpen(true);
        deleteCallback(editedMember);
        handleClose();
      });
  };

  const editMember = () => {
    if (editedMember === null || editedMember.key === "") {
      return;
    }
    db.collection("members")
      .doc(editedMember.key)
      .set(editedMember)
      .then(() => {
        setSuccessDeleteSnackbarIsOpen(true);
        editCallback(editedMember);
        handleClose();
      });
  };

  return (
    <Fragment>
      <Dialog
        open={open && member !== null}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContentWithoutPadding>
          <Box m={2} mt={0}>
            <Typography gutterBottom variant="h5" component="h2">
              עריכת חבר.ה
            </Typography>
          </Box>
          {member && (
            <MemberEditor
              initialMember={member}
              showErrors
              onResult={setEditedMember}
            />
          )}
        </DialogContentWithoutPadding>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ביטול
          </Button>
          <DeleteButton
            onClick={deleteMember}
            disabled={editedMember === null}
            variant="outlined"
            color="inherit"
          >
            {deleteSafeSwitchIsOn ? `באמת למחוק את ${member?.name}?` : "מחיקה"}
          </DeleteButton>
          <Button
            onClick={editMember}
            disabled={editedMember === null}
            variant="contained"
            color="primary"
          >
            עריכה
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={successEditSnackbarIsOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessEditSnackbarIsOpen(false)}
      >
        <Alert
          onClose={() => setSuccessEditSnackbarIsOpen(false)}
          severity="success"
        >
          החבר.ה נערכ.ה בהצלחה
        </Alert>
      </Snackbar>
      <Snackbar
        open={successDeleteSnackbarIsOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessDeleteSnackbarIsOpen(false)}
      >
        <Alert
          onClose={() => setSuccessDeleteSnackbarIsOpen(false)}
          severity="success"
        >
          החבר.ה נמחק.ה בהצלחה
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default EditMemberDialog;
