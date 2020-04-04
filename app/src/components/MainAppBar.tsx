import React, { Fragment, useContext } from "react";
import { Button } from "@material-ui/core";
import User from "../types/User";
import { logout } from "../firebase/auth";
import AppBar from "./AppBar";
import LoggedInUserContext from "../context/LoggedInUserContext";

interface MainAppBarProps {
  setIsAdminDialogOpen: (isAdminDialogOpen: boolean) => void;
  setIsLoginDialogOpen: (isLoginDialogOpen: boolean) => void;
  setLoggedInUser: (loggedInUser: User | null) => void;
}

const MainAppBar = ({
  setIsAdminDialogOpen,
  setIsLoginDialogOpen,
  setLoggedInUser,
}: MainAppBarProps) => {
  const loggedInUser = useContext(LoggedInUserContext);
  
  return (
    <AppBar
      title="מעברים – חיפוש אנשי.ות מקצוע"
      buttons={
        loggedInUser ? (
          <Fragment>
            {loggedInUser?.isStaff && (
              <Button
                color="inherit"
                onClick={() => setIsAdminDialogOpen(true)}
              >
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
};

export default MainAppBar;
