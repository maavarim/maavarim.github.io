import React, { useState } from "react";
import {
  Typography,
  Button,
  Fade,
  CircularProgress,
  Box
} from "@material-ui/core";

import firebase from "../Firebase";

interface LoginPageProps {
  loginCallaback: () => void;
}

const AMDIN_EMAIL = "maavarim.club@gmail.com";

const LoginPage = ({ loginCallaback }: LoginPageProps) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setGenericError = () =>
    setErrorMessage("חלה שגיאה בנסיון ההתחברות. נסו שוב.");

  const auth = () => {
    setErrorMessage(null);
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        setLoading(false);
        if (result.user === null) {
          setGenericError();
          return;
        }
        var { email } = result.user;
        if (email === AMDIN_EMAIL) loginCallaback();
        else setErrorMessage("יש להתחבר עם חשבון המערכת הניהולי.");
      })
      .catch(_ => {
        setLoading(false);
        setGenericError();
      });
  };

  return (
    <div>
      <Typography paragraph variant="h4">
        התחברות
      </Typography>
      <Typography paragraph>
        על-מנת לגשת לפאנל הניהול, יש להתחבר לחשבון ה-Google הניהולי.
      </Typography>

      <Button variant="contained" onClick={auth} color="primary">
        {loading && (
          <Box mr={1}>
            <CircularProgress size={12} thickness={4} color="inherit" />
          </Box>
        )}
        התחברות באמצעות Google
      </Button>

      <Fade in={errorMessage !== null}>
        <Typography paragraph color="error" variant="body2">
          {errorMessage}
        </Typography>
      </Fade>
    </div>
  );
};

export default LoginPage;
