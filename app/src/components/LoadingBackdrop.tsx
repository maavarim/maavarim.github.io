import React from "react";
import { makeStyles, Backdrop, Typography, Box } from "@material-ui/core";
import MultiColorProgressSpinner from "./MultiColorProgressSpinner";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    "@supports (backdrop-filter: blur(0.5rem) brightness(25%))": {
      backdropFilter: "blur(0.5rem) brightness(25%)",
      backgroundColor: "rgba(0,0,0,0)"
    }
  },
  loadingTitle: {
    color: "white",
    fontWeight: 600,
    fontSize: "1.5rem"
  }
}));

interface LoadingBackdropProps {
  open: boolean;
}

const LoadingBackdrop = ({ open }: LoadingBackdropProps) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Box display="flex" alignItems="center">
        <MultiColorProgressSpinner size="1.5rem" />
        <Box ml={1}>
          <Typography className={classes.loadingTitle}>
            האפליקציה בטעינה
          </Typography>
        </Box>
      </Box>
    </Backdrop>
  );
};

export default LoadingBackdrop;
