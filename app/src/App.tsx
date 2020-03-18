import React, { useState } from "react";
import { makeStyles, CssBaseline } from "@material-ui/core";
import AppBar from "./components/AppBar";
import Hero from "./components/Hero";
import SearchContainer from "./components/SearchContainer";

const useStyles = makeStyles(theme => ({}));

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar />
      <main>
        <Hero />
        <SearchContainer />
      </main>
    </React.Fragment>
  );
}

export default App;
