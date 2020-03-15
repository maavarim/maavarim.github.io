import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  Grid,
  makeStyles,
  Card,
  CardContent,
  Snackbar,
  Container
} from "@material-ui/core";
import {
  AccountCircleTwoTone,
  PhoneTwoTone,
  CalendarTodayTwoTone
} from "@material-ui/icons";
import Alert from "../components/Alert";
import { createRandomString, parseDate } from "../utils";
import firebase from "../Firebase";
import MaavarimQRCode from "../components/MaavarimQRCode";
import styles from "./AddMemberPage.module.scss";
import SuccessIllustrationSvg from "../img/SuccessIllustration.svg";

const useStyles = makeStyles({
  fieldsContainer: {
    "& .MuiFormControl-root": {
      width: "100%"
    }
  },
  fullHeightTextField: {
    height: "100%",
    "& .MuiTextField-root": {
      height: "100%",
      "& .MuiInputBase-root": {
        height: "100%"
      }
    }
  },
  flex: {
    display: "flex"
  },
  ltrTextField: {
    "& .MuiInputBase-input": {
      direction: "rtl"
    }
  }
});

const AddMemberPage = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registrationDate, setRegistrationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [moreDetails, setMoreDetails] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [key, setKey] = useState<string | null>(null);

  const classes = useStyles();

  const handleRegistrationDateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRegistrationDate(event.target.value);
  };

  const setGenericErrorMessage = () =>
    setErrorMessage("חלה שגיאה בהוספת החבר.ה החדש.ה, נסו שוב מאוחר יותר.");

  const create = async () => {
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
          name,
          isActive: true,
          registrationDate: firebase.firestore.Timestamp.fromDate(
            parseDate(registrationDate)
          ),
          phoneNumber,
          moreDetails
        });
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
            <Grid className={classes.fieldsContainer} container spacing={1}>
              <Grid item container spacing={1} xs={12} md={6}>
                <Grid item xs={12}>
                  <TextField
                    label="שם החבר.ה"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    variant="filled"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleTwoTone />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="טלפון"
                    value={phoneNumber}
                    className={classes.ltrTextField}
                    type="tel"
                    onChange={event => setPhoneNumber(event.target.value)}
                    variant="filled"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneTwoTone />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="תאריך הצטרפות"
                    defaultValue={registrationDate}
                    type="date"
                    onChange={handleRegistrationDateChange}
                    variant="filled"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayTwoTone />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box mr={[1, 1, 0]} className={classes.fullHeightTextField}>
                  <TextField
                    label="פרטים נוספים"
                    multiline
                    rows={7}
                    value={moreDetails}
                    onChange={event => setMoreDetails(event.target.value)}
                    variant="filled"
                  />
                </Box>
              </Grid>
            </Grid>
            <Box
              className={classes.flex}
              justifyContent="flex-end"
              mt={2}
              mr={1}
            >
              <Button variant="contained" color="primary" onClick={create}>
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
          open={errorMessage !== null}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(null)}
        >
          <Alert onClose={() => setErrorMessage(null)} severity="success">
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default AddMemberPage;
