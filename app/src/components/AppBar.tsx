import React, { Fragment } from "react";
import {
  Container,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  Box
} from "@material-ui/core";
import LogoJpeg from "../img/Logo.jpeg";
import LoggedInUser from "../types/LoggedInUser";

const useStyles = makeStyles(theme => ({
  appBarTitle: {
    flexGrow: 1
  },
  logoImage: {
    height: "3em"
  },
  profilePhoto: {
    height: "2em",
    borderRadius: "50%",
    marginInlineEnd: `${theme.spacing(1)}px`
  }
}));

interface AppBarProps {
  onLoginButtonClick: () => void;
  onLogoutButtonClick: () => void;
  onAdminButtonClick: () => void;
  loggedInUser: LoggedInUser | null;
}

function AppBar({
  onLoginButtonClick,
  onLogoutButtonClick,
  onAdminButtonClick,
  loggedInUser
}: AppBarProps) {
  const classes = useStyles();

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Container maxWidth="md">
          <Box display="flex" alignItems="center">
            <img src={LogoJpeg} className={classes.logoImage} alt="logo" />
            <Typography variant="h6" className={classes.appBarTitle}>
              מעברים – חיפוש אנשי.ות מקצוע
            </Typography>
            {loggedInUser && (
              <Fragment>
                {loggedInUser?.email?.endsWith("maavarim.org") && (
                  <Button color="inherit" onClick={onAdminButtonClick}>
                    ניהול
                  </Button>
                )}
                <Button color="inherit" onClick={onLogoutButtonClick}>
                  התנתקות
                </Button>
              </Fragment>
            )}
            {loggedInUser === null && (
              <Button color="inherit" onClick={onLoginButtonClick}>
                התחברות
              </Button>
            )}
          </Box>
        </Container>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
