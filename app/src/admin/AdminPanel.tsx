import React, { useState, useEffect, Fragment } from "react";
import {
  Typography,
  Container,
  Box,
  makeStyles,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchFilter from "../types/SearchFilter";
import logger from "../utils/logger";
import { getAllSearchFilters } from "../firebase/db";
import { firebaseDocToSearchFilter } from "../converters";
import { reduceNulls } from "../utils/ArrayUtils";
import CircuitBoardPattern from "../img/CircuitBoard.svg";

const GRADIENT =
  "rgba(255,255,255,1) 0%, rgba(245,172,202,.3) 50%, rgba(107,175,225,.3) 100%";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold
  },
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
  const [existingFilters, setExistingFilters] = useState<SearchFilter[]>([]);

  useEffect(() => {
    getAllSearchFilters()
      .then(docs => {
        const remoteExistingFilters = reduceNulls(
          docs.map(firebaseDocToSearchFilter)
        );
        if (remoteExistingFilters !== null) {
          setExistingFilters(remoteExistingFilters);
        }
      })
      .catch(logger.error);
  }, []);

  const filtersSection = (
    <Fragment>
      <Box mb={2}>
        <Typography variant="h5">פילטרים</Typography>
      </Box>
      <Grid container></Grid>
      {existingFilters.map(existingFilter => (
        <ExpansionPanel key={existingFilter.id}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography className={classes.heading}>
              {existingFilter.title}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>פה אמורות לבוא האפשרויות לבחירה. </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Fragment>
  );

  return (
    <Container className={classes.container}>
      <Container maxWidth="md" className={classes.content}>
        <div className={classes.appBarMargin}></div>
        <Box pt={2}>
          <Box p={2}>{filtersSection}</Box>
        </Box>
      </Container>
    </Container>
  );
};

export default AdminPanel;
