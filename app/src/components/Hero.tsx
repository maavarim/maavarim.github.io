import React, { useContext } from "react";
import {
  Container,
  Typography,
  makeStyles,
  Box,
  ButtonBase,
  Paper,
} from "@material-ui/core";
import LoggedInUserContext from "../context/LoggedInUserContext";

const GRADIENT =
  "rgba(255,255,255,1) 0%, rgba(245,172,202,1) 50%, rgba(107,175,225,1) 100%";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    background: "white",
  },
  content: {
    padding: theme.spacing(8, 0, 10),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(8, 2, 10, 2),
    },
  },
  cta: {
    all: "unset",
    margin: "-0.25em 0",
    padding: "0 .25em",
    overflow: "hidden",
    display: "inline-flex",
    position: "relative",
    borderRadius: ".25em",
    border: "1px currentColor solid",
    cursor: "pointer",
  },
  rightGradient: {
    width: `calc(50vw - ${theme.breakpoints.values.md / 2}px)`,
    background: `linear-gradient(90deg, ${GRADIENT})`,
  },
  leftGradient: {
    width: `calc(50vw - ${theme.breakpoints.values.md / 2}px)`,
    background: `linear-gradient(270deg, ${GRADIENT})`,
  },
}));

interface HeroProps {
  onLoginButtonClick: () => void;
  onAddButtonClick: () => void;
}

function Hero({ onLoginButtonClick, onAddButtonClick }: HeroProps) {
  const classes = useStyles();
  const loggedInUser = useContext(LoggedInUserContext);
  const isLoggedIn = loggedInUser !== null;

  return (
    <Paper className={classes.container} elevation={2}>
      <Box className={classes.rightGradient} />
      <Container maxWidth="md" className={classes.content}>
        <Typography
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          ברוכות הבאים למערכת אנשי.ות המקצוע של הקהילה הטרנסית
        </Typography>
        {isLoggedIn ? (
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            כאן תוכלו למצוא מגוון של אנשות מקצוע, מומחים, רופאות ומטפלים.
            <br />
            אנחנו מזמינות אתכםן להשאיר משוב, לדרג ולשתף חוויות.
            <br />
            מכיריםות מישהו.י שלא ברשימה?{" "}
            <ButtonBase className={classes.cta} onClick={onAddButtonClick}>
              הוסיפו
            </ButtonBase>{" "}
            אותםן!
          </Typography>
        ) : (
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
            <ButtonBase className={classes.cta} onClick={onLoginButtonClick}>
              התחברו
            </ButtonBase>{" "}
            והוסיפו אותםן!
          </Typography>
        )}
      </Container>
      <Box className={classes.leftGradient} />
    </Paper>
  );
}

export default Hero;
