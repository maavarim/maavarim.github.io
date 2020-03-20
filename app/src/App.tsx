import React, { useState } from "react";
import { CssBaseline } from "@material-ui/core";
import MainAppBar from "./components/MainAppBar";
import Hero from "./components/Hero";
import SearchContainer from "./components/SearchContainer";
import LoginDialog from "./components/LoginDialog";
import LoggedInUser from "./types/LoggedInUser";
import AdminDialogPanel from "./admin";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);

  return (
    <React.Fragment>
      <CssBaseline />
      <MainAppBar
        setIsAdminDialogOpen={setIsAdminDialogOpen}
        setIsLoginDialogOpen={setIsLoginDialogOpen}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
      <main>
        <Hero
          isLoggedIn={loggedInUser !== null}
          onLoginButtonClick={() => setIsLoginDialogOpen(true)}
          onAddButtonClick={console.log}
        />
        <SearchContainer />
      </main>
      <LoginDialog
        open={isLoginDialogOpen}
        setOpen={setIsLoginDialogOpen}
        setLoggedInUser={setLoggedInUser}
      />
      <AdminDialogPanel
        open={isAdminDialogOpen}
        onClose={() => setIsAdminDialogOpen(false)}
      />
    </React.Fragment>
  );
}

export default App;
