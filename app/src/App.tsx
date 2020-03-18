import React, { useState } from "react";
import { makeStyles, CssBaseline } from "@material-ui/core";
import AppBar from "./components/AppBar";
import Hero from "./components/Hero";
import SearchContainer from "./components/SearchContainer";
import SearchFilter from "./types/SearchFilter";

const useStyles = makeStyles(theme => ({}));

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
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar />
      <main>
        <Hero />
        <SearchContainer filters={FILTERS} />
      </main>
    </React.Fragment>
  );
}

export default App;
