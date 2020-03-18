import React, { useState } from "react";
import { CssBaseline } from "@material-ui/core";
import AppBar from "./components/AppBar";
import Hero from "./components/Hero";
import SearchContainer from "./components/SearchContainer";
import LoginDialog from "./components/LoginDialog";
import SearchFilter from "./types/SearchFilter";
import LoggedInUser from "./types/LoggedInUser";
import { logout } from "./utils/firebaseLogin";

const FILTERS: SearchFilter[] = [
  {
    id: "1",
    title: "מקצוע",
    options: [
      {
        id: "1",
        title: "אחר",
        firestoreValues: ["אחר1"]
      },

      {
        id: "2",
        title: "מחלקה",
        firestoreValues: ["מחלקה1", "מחלקה2"]
      },

      {
        id: "3",
        title: "מטפל.ת",
        firestoreValues: ["מטפלת", "מטפל"]
      }
    ],
    firestoreFieldName: "mikzoa"
  },
  {
    id: "2",
    title: "התמחות",
    options: [
      {
        id: "1",
        title: "התמחות אחר",
        firestoreValues: ["התמחות אחר1"]
      },

      {
        id: "2",
        title: "התמחות מחלקה",
        firestoreValues: ["התמחות מחלקה1", "מחלקה2 התמחות"]
      },

      {
        id: "3",
        title: "התמחות מטפל.ת",
        firestoreValues: ["התמחות מטפלת", "מטפל"]
      }
    ],
    firestoreFieldName: "profession"
  }
];

function App() {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        loggedInUser={loggedInUser}
        onLoginButtonClick={() => setIsLoginDialogOpen(true)}
        onLogoutButtonClick={() => logout().then(() => setLoggedInUser(null))}
      />
      <main>
        <Hero onLoginButtonClick={() => setIsLoginDialogOpen(true)} />
        <SearchContainer filters={FILTERS} />
      </main>
      <LoginDialog
        open={isLoginDialogOpen}
        setOpen={setIsLoginDialogOpen}
        setLoggedInUser={setLoggedInUser}
      />
    </React.Fragment>
  );
}

export default App;
