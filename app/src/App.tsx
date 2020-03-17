import React, { useState } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  CssBaseline,
  Box,
  ButtonBase
} from "@material-ui/core";
import LogoJpeg from "./img/Logo.jpeg";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  logoImage: {
    height: "3em"
  },
  hero: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    background: "white"
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  heroCta: {
    all: "unset",
    margin: "-0.25em 0",
    padding: "0 .25em",
    overflow: "hidden",
    display: "inline-flex",
    position: "relative",
    borderRadius: ".25em",
    border: "1px currentColor solid",
    cursor: "pointer"
  },
  heroRightGradient: {
    width: `calc(50vw - ${theme.breakpoints.values.md / 2}px)`,
    background:
      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(245,172,202,1) 50%, rgba(107,175,225,1) 100%)"
  },
  heroLeftGradient: {
    width: `calc(50vw - ${theme.breakpoints.values.md / 2}px)`,
    background:
      "linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(245,172,202,1) 50%, rgba(107,175,225,1) 100%)"
  }
}));

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="md">
            <Box display="flex" alignItems="center">
              <img src={LogoJpeg} className={classes.logoImage} />
              <Typography variant="h6" className={classes.title}>
                מעברים – חיפוש אנשי.ות מקצוע
              </Typography>
              <Button color="inherit">התחברות</Button>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <main>
        <Box className={classes.hero}>
          <Box className={classes.heroRightGradient} />
          <Container maxWidth="md" className={classes.heroContent}>
            <Typography
              variant="h5"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              ברוכות הבאים למערכת אנשי.ות המקצוע של הקהילה הטרנסית
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              כאן תוכלו למצוא מגוון של אנשות מקצוע, מומחים, רופאות ומטפלים.
              <br />
              אנחנו מזמינות אתכםן להרשם ולהשאיר משוב, לדרג ולשתף חוויות.
              <br />
              מכיריםות מישהו.י שלא ברשימה?{" "}
              <ButtonBase className={classes.heroCta}>התחברו</ButtonBase>{" "}
              והוסיפו אותםן!
            </Typography>
          </Container>
          <Box className={classes.heroLeftGradient} />
        </Box>

        <Container maxWidth="md">התוכן בא פה</Container>
      </main>
    </React.Fragment>
  );
}

export default App;
