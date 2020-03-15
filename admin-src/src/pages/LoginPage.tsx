import React, { useState } from "react";
import {
  Typography,
  Button,
  Fade,
  CircularProgress,
  Box
} from "@material-ui/core";

import firebase from "../Firebase";
import config from "../config";

interface LoginPageProps {
  loginCallaback: () => void;
}

const AMDIN_EMAIL = "maavarim.club@gmail.com";

const LoginPage = ({ loginCallaback }: LoginPageProps) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setGenericError = () =>
    setErrorMessage("חלה שגיאה בנסיון ההתחברות. נסו שוב.");

  firebase.auth().onAuthStateChanged(user => {
    if (user !== null && user.email === AMDIN_EMAIL) loginCallaback();
  });

  const auth = async () => {
    setErrorMessage(null);
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase
      .auth()
      .setPersistence(
        config.DEBUG
          ? firebase.auth.Auth.Persistence.LOCAL
          : firebase.auth.Auth.Persistence.NONE
      );

    try {
      const { user } = await firebase.auth().signInWithPopup(provider);
      setLoading(false);
      if (user === null) {
        setGenericError();
        return;
      }
      if (user.email === AMDIN_EMAIL) loginCallaback();
      else setErrorMessage("יש להתחבר עם חשבון המערכת הניהולי.");
    } catch {
      setLoading(false);
      setGenericError();
    }
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
