import React, { useState } from "react";
import { CssBaseline } from "@material-ui/core";
import MainAppBar from "./components/MainAppBar";
import Hero from "./components/Hero";
import SearchContainer from "./components/SearchContainer";
import LoginDialog from "./dialogs/LoginDialog";
import User from "./types/User";
import AdminDialogPanel from "./admin";
import AddRecommendationDialog from "./dialogs/AddRecommendationDialog";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [
    isAddRecommendationDialogOpen,
    setIsAddRecommendationDialogOpen
  ] = useState(false);
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
          onAddButtonClick={() => setIsAddRecommendationDialogOpen(true)}
        />
        <SearchContainer />
      </main>
      <LoginDialog
        open={isLoginDialogOpen}
        setOpen={setIsLoginDialogOpen}
        setLoggedInUser={setLoggedInUser}
      />
      {loggedInUser && (
        <AddRecommendationDialog
          open={isAddRecommendationDialogOpen}
          setOpen={setIsAddRecommendationDialogOpen}
          loggedInUser={loggedInUser}
        />
      )}
      <AdminDialogPanel
        open={isAdminDialogOpen}
        onClose={() => setIsAdminDialogOpen(false)}
      />
    </React.Fragment>
  );
}

export default App;
