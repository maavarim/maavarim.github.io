import React from "react";
import { Container, Box, makeStyles } from "@material-ui/core";
import CircuitBoardPattern from "../img/CircuitBoard.svg";
import FiltersMangment from "./ManageFilters";

const GRADIENT =
  "rgba(255,255,255,1) 0%, rgba(245,172,202,.3) 50%, rgba(107,175,225,.3) 100%";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundImage: `url(${CircuitBoardPattern})`
  },
  content: {
    position: "relative",
    background: "white",
    minHeight: "100vh",
    [theme.breakpoints.up("md")]: {
      "&::before, &::after": {
        content: "''",
        position: "absolute",
        height: "100%",
        width: `calc(50vw - ${theme.breakpoints.values.md / 2}px)`,
        top: 0
      },
      "&::before": {
        background: `linear-gradient(90deg, ${GRADIENT})`,
        right: "100%"
      },
      "&::after": {
        background: `linear-gradient(270deg, ${GRADIENT})`,
        left: "100%"
      }
    }
  },
  appBarMargin: theme.mixins.toolbar
}));

const AdminPanel = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Container maxWidth="md" className={classes.content}>
        <div className={classes.appBarMargin}></div>
        <Box pt={2}>
          <Box p={2}>
            <FiltersMangment />
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default AdminPanel;
