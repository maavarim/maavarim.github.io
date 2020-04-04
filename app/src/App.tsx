import React, { useState } from "react";
import {
  CssBaseline,
  Collapse,
  useTheme,
  Fade,
  Container,
} from "@material-ui/core";
import MainAppBar from "./components/MainAppBar";
import Hero from "./components/Hero";
import SearchContainer from "./components/SearchContainer";
import LoginDialog from "./dialogs/LoginDialog";
import User from "./types/User";
import AdminDialogPanel from "./admin";
import AddRecommendationScreen from "./dialogs/AddRecommendation";
import LoggedInUserContext from "./context/LoggedInUserContext";

function App() {
  const theme = useTheme();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [
    isAddRecommendationDialogOpen,
    setIsAddRecommendationDialogOpen,
  ] = useState(true);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);

  return (
    <React.Fragment>
      <CssBaseline />
      <LoggedInUserContext.Provider value={loggedInUser}>
        <MainAppBar
          setIsAdminDialogOpen={setIsAdminDialogOpen}
          setIsLoginDialogOpen={setIsLoginDialogOpen}
          setLoggedInUser={setLoggedInUser}
        />
        <main>
          <Collapse
            in={!isAddRecommendationDialogOpen}
            timeout={300}
            style={{
              transitionDelay: isAddRecommendationDialogOpen ? "0s" : "200ms",
            }}
          >
            <Hero
              onLoginButtonClick={() => setIsLoginDialogOpen(true)}
              onAddButtonClick={() => setIsAddRecommendationDialogOpen(true)}
            />
          </Collapse>

          {!isAddRecommendationDialogOpen && (
            <Fade
              in={!isAddRecommendationDialogOpen}
              timeout={{
                enter: 300,
                exit: !isAddRecommendationDialogOpen ? 1 : 290,
              }}
              style={{
                transitionDelay: isAddRecommendationDialogOpen ? "200ms" : "0s",
              }}
            >
              <Container
                maxWidth="md"
                style={{
                  position: "relative",
                  marginTop: -`${theme.spacing(4)}px`,
                }}
              >
                <SearchContainer />
              </Container>
            </Fade>
          )}

          {isAddRecommendationDialogOpen && (
            <Fade
              in={isAddRecommendationDialogOpen}
              timeout={{
                enter: 300,
                exit: isAddRecommendationDialogOpen ? 1 : 290,
              }}
              style={{
                transitionDelay: isAddRecommendationDialogOpen ? "200ms" : "0s",
              }}
            >
              <Container
                maxWidth="sm"
                style={{
                  position: "relative",
                  marginTop: `${theme.spacing(3)}px`,
                }}
              >
                  <AddRecommendationScreen />
              </Container>
            </Fade>
          )}
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
      </LoggedInUserContext.Provider>
    </React.Fragment>
  );
}

export default App;
