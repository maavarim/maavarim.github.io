import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import LoggedInUser from "../types/LoggedInUser";
import { logout } from "../firebase/auth";
import AppBar from "./AppBar";

interface MainAppBarProps {
  setIsAdminDialogOpen: (isAdminDialogOpen: boolean) => void;
  setIsLoginDialogOpen: (isLoginDialogOpen: boolean) => void;
  loggedInUser: LoggedInUser | null;
  setLoggedInUser: (loggedInUser: LoggedInUser | null) => void;
}

const MainAppBar = ({
  setIsAdminDialogOpen,
  setIsLoginDialogOpen,
  loggedInUser,
  setLoggedInUser
}: MainAppBarProps) => (
  <AppBar
    title="מעברים – חיפוש אנשי.ות מקצוע"
    buttons={
      loggedInUser ? (
        <Fragment>
          {loggedInUser?.email?.endsWith("maavarim.org") && (
            <Button color="inherit" onClick={() => setIsAdminDialogOpen(true)}>
              ניהול
            </Button>
          )}
          <Button
            color="inherit"
            onClick={() => logout().then(() => setLoggedInUser(null))}
          >
            התנתקות
          </Button>
        </Fragment>
      ) : (
        <Button color="inherit" onClick={() => setIsLoginDialogOpen(true)}>
          התחברות
        </Button>
      )
    }
  />
);

export default MainAppBar;
