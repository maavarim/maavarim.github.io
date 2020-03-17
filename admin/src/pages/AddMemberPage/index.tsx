import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  makeStyles,
  Card,
  CardContent,
  Snackbar,
  Container,
  CircularProgress
} from "@material-ui/core";
import { createRandomString } from "../../utils";
import firebase from "../../Firebase";
import MemberEditor from "../../components/MemberEditor";
import Alert from "../../components/Alert";
import MaavarimQRCode from "../../components/MaavarimQRCode";
import styles from "./style.module.scss";
import SuccessIllustrationSvg from "../../img/SuccessIllustration.svg";
import Member from "../../Member";

const useStyles = makeStyles({
  flex: {
    display: "flex"
  }
});

enum SubmitButtonState {
  Enabled,
  Loading,
  Disabled
}

const AddMemberPage = () => {
  const [newMember, setNewMember] = useState<Member | null>(null);
  const [showErrors, setShowErrors] = useState(false);

  const [submitButtonState, setSubmitButtonState] = useState(
    SubmitButtonState.Enabled
  );
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [key, setKey] = useState<string | null>(null);

  const classes = useStyles();

  const setGenericErrorMessage = () => {
    setSubmitButtonState(SubmitButtonState.Enabled);
    setShowErrorMessage(true);
  };

  useEffect(() => {
    setSubmitButtonState(
      newMember === null && showErrors
        ? SubmitButtonState.Disabled
        : SubmitButtonState.Enabled
    );
  }, [newMember, showErrors]);

  const create = async () => {
    if (newMember === null) {
      return setShowErrors(true);
    }

    setSubmitButtonState(SubmitButtonState.Loading);

    const generateNewKey = () => createRandomString(64);
    const isKeyAlreadyUsed = async (key: string) => {
      try {
        const doc = await db
          .collection("members")
          .doc(key)
          .get();
        return doc.exists;
      } catch {
        return null;
      }
    };

    const db = firebase.firestore();

    let key: string;
    let keyAlreadyUsed: boolean | null;
    do {
      key = generateNewKey();
      keyAlreadyUsed = await isKeyAlreadyUsed(key);
    } while (keyAlreadyUsed);

    if (keyAlreadyUsed === null) {
      return setGenericErrorMessage();
    }

    try {
      await db
        .collection("members")
        .doc(key)
        .set({
          ...newMember,
          registrationDate: firebase.firestore.Timestamp.fromDate(
            newMember.registrationDate
          )
        });
      setSubmitButtonState(SubmitButtonState.Disabled);
    } catch {
      return setGenericErrorMessage();
    }

    setKey(key);
  };

  return (
    <Box>
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Box mb={2}>
              <Typography variant="h5" component="h2">
                הוספת חבר.ה
              </Typography>
            </Box>
            <MemberEditor showErrors={showErrors} onResult={setNewMember} />
            <Box
              className={classes.flex}
              justifyContent="flex-end"
              mt={2}
            >
              <Button
                variant="contained"
                color="primary"
                disabled={submitButtonState === SubmitButtonState.Disabled}
                onClick={create}
              >
                {submitButtonState === SubmitButtonState.Loading && (
                  <Box mr={1}>
                    <CircularProgress size={12} thickness={4} color="inherit" />
                  </Box>
                )}
                יצירה
              </Button>
            </Box>
          </CardContent>
        </Card>
        {key !== null && (
          <Box mt={2}>
            <Card style={{ position: "relative" }}>
              <CardContent className={styles.successMessageContainer}>
                <MaavarimQRCode memberKey={key} />
                <Box
                  mb={2}
                  mt={2}
                  style={{ flexGrow: 1 }}
                  className={[
                    classes.flex,
                    styles.successMessage_textContainer
                  ].join(" ")}
                  alignItems="center"
                >
                  <Box style={{ zIndex: 1 }} ml={[0, 5]}>
                    <Typography variant="h5" component="h2">
                      החבר.ה נוספ.ה בהצלחה!
                    </Typography>
                    <Typography>לחצו על ה-QR code להורדה.</Typography>
                  </Box>
                  <img
                    src={SuccessIllustrationSvg}
                    alt="איור הצלחה"
                    className={styles.illustration}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
        <Snackbar
          open={showErrorMessage}
          autoHideDuration={6000}
          onClose={() => setShowErrorMessage(false)}
        >
          <Alert onClose={() => setShowErrorMessage(false)} severity="error">
            חלה שגיאה בהוספת החבר.ה החדש.ה, נסו שוב מאוחר יותר.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default AddMemberPage;
