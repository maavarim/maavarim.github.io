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
import Alert from "../../components/Alert";
import Member from "../../Member";
import MemberEditor from "../../components/MemberEditor";

interface DeleteMemberDialogProps {
  db: firebase.firestore.Firestore;
  member: Member | null;
  setMember: (member: Member | null) => void;
  editCallback: (member: Member) => void;
}

const DialogContentWithoutPadding = styled(DialogContent)({
  padding: "8px"
});

const EditMemberDialog = ({
  db,
  member,
  setMember,
  editCallback
}: DeleteMemberDialogProps) => {
  const [editedMember, setEditedMember] = useState<Member | null>(null);
  const [successSnackbarIsOpen, setSuccessSnackbarIsOpen] = useState(false);

  const handleClose = () => setMember(null);

  const edit = () => {
    if (editedMember === null || editedMember.key === "") {
      return;
    }
    db.collection("members")
      .doc(editedMember.key)
      .set(editedMember)
      .then(() => {
        setSuccessSnackbarIsOpen(true);
        editCallback(editedMember);
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
          <Button
            onClick={edit}
            disabled={editedMember === null}
            variant="contained"
            color="primary"
          >
            עריכה
          </Button>
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
