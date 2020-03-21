import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Box,
  ButtonProps,
  Snackbar
} from "@material-ui/core";
import GoogleIcon from "../img/GoogleIcon.svg";
import FacebookIcon from "../img/FacebookIcon.svg";
import {
  signInWithGoogle,
  signInWithFacebook,
  checkIfAlreadyLoggedIn
} from "../firebase/auth";
import User from "../types/User";
import Alert from "./Alert";

interface LoginButtonProps extends ButtonProps {
  onLogin: (userCredential: firebase.auth.UserCredential) => void;
  onError: (error: any) => void;
}

const GoogleLoginButton = ({
  onLogin,
  onError,
  ...buttonProps
}: LoginButtonProps) => (
  <Button
    {...buttonProps}
    variant="contained"
    style={{ width: "100%", fontWeight: 600, background: "white" }}
    onClick={() => {
      signInWithGoogle()
        .then(u => {
          console.log("a");

          onLogin(u);
        })
        .catch(e => {
          console.log(e);

          onError(e);
        })
        .finally(() => {
          console.log("f");
        });
    }}
  >
    <Box display="flex" alignItems="center" py={0.5}>
      <Box mr={1} display="flex" alignItems="center">
        <img src={GoogleIcon} alt="Google" style={{ height: "1em" }} />
      </Box>
      רוצה להתחבר עם Google
    </Box>
  </Button>
);

const FacebookLoginButton = ({
  onLogin,
  onError,
  ...buttonProps
}: LoginButtonProps) => (
  <Button
    {...buttonProps}
    variant="contained"
    style={{
      width: "100%",
      fontWeight: 600,
      background: "#4267b2",
      color: "white"
    }}
    onClick={() =>
      signInWithFacebook()
        .then(onLogin)
        .catch(onError)
    }
  >
    <Box display="flex" alignItems="center" py={0.5}>
      <Box mr={1} display="flex" alignItems="center">
        <img src={FacebookIcon} alt="Facebook" style={{ height: "1.5em" }} />
      </Box>
      האמת, בא לי Facebook
    </Box>
  </Button>
);

interface LoginDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setLoggedInUser: (loggedInUser: User) => void;
}

export default function LoginDialog({
  open,
  setOpen,
  setLoggedInUser
}: LoginDialogProps) {
  const [isErrorSnackBarOpened, setIsErrorSnackBarOpened] = useState(false);
  const [isSuccessSnackBarOpened, setIsSuccessSnackBarOpened] = useState(false);

  const handleError = (error: any) => {
    console.error(error);
    setIsErrorSnackBarOpened(true);
  };

  const onLogin = (user: firebase.User) => {
    const { displayName: name, email, photoURL } = user;
    const loggedInUser = new User(email, name, photoURL);

    setIsSuccessSnackBarOpened(true);
    setLoggedInUser(loggedInUser);
    setOpen(false);
  };

  const handleUserCredntial = (
    userCredential: firebase.auth.UserCredential
  ) => {
    if (userCredential.user === null) {
      return setIsErrorSnackBarOpened(true);
    }
    onLogin(userCredential.user);
  };

  useEffect(() => {
    // We can't use `onLogin` as it's re-created every render
    checkIfAlreadyLoggedIn().then((user: firebase.User) => {
      const { displayName: name, email, photoURL } = user;
      const loggedInUser = new User(email, name, photoURL);

      setLoggedInUser(loggedInUser);
      setOpen(false);
    });
  }, [setLoggedInUser, setOpen]);

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ padding: "0", backgroundColor: "#dcdcdc" }}>
          <Box p={3}>
            <Box display="flex" justifyContent="stretch">
              <GoogleLoginButton
                onLogin={handleUserCredntial}
                onError={handleError}
              />
            </Box>
            <Box mt={2} display="flex" justifyContent="stretch">
              <FacebookLoginButton
                onLogin={handleUserCredntial}
                onError={handleError}
              />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={isSuccessSnackBarOpened}
        autoHideDuration={6000}
        onClose={() => setIsSuccessSnackBarOpened(false)}
      >
        <Alert
          onClose={() => setIsSuccessSnackBarOpened(false)}
          severity="success"
        >
          ברוכים הבאות!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isErrorSnackBarOpened}
        autoHideDuration={6000}
        onClose={() => setIsErrorSnackBarOpened(false)}
      >
        <Alert onClose={() => setIsErrorSnackBarOpened(false)} severity="error">
          נתקלנו בשגיאה בנסיון ההתחברות. נסו להתחבר בדרך אחרת, חכו קצת, או פנו
          אלינו לתמיכה{" "}
          <span role="img" aria-label="אמוג׳י ניצוצות">
            ✨
          </span>
        </Alert>
      </Snackbar>
    </Fragment>
  );
}
