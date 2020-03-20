import React, { useState } from "react";
import { CssBaseline } from "@material-ui/core";
import MainAppBar from "./components/MainAppBar";
import Hero from "./components/Hero";
import SearchContainer from "./components/SearchContainer";
import LoginDialog from "./components/LoginDialog";
import SearchFilter from "./types/SearchFilter";
import LoggedInUser from "./types/LoggedInUser";
import AdminDialogPanel from "./admin";

const FILTERS: SearchFilter[] = [
  {
    id: "1",
    title: "מקצוע",
    options: ["אחר", "מחלקה", "מטפל.ת"]
  },
  {
    id: "2",
    title: "התמחות",
    options: ["התמחות אחר", "התמחות מחלקה", "התמחות מטפל.ת"]
  }
];

function App() {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(true);

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
        <SearchContainer filters={FILTERS} />
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
