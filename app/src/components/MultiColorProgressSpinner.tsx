import React from "react";
import {
  CircularProgress,
  makeStyles,
  CircularProgressProps
} from "@material-ui/core";

const useStyles = makeStyles({
  "@keyframes MultiColorProgressSpinner": {
    "0%": {
      color: "rgb(245,172,202)"
    },
    "42%": {
      color: "rgb(245,172,202)"
    },
    "57%": {
      color: "rgb(107,175,225)"
    },
    "100%": {
      color: "rgb(107,175,225)"
    }
  },
  circularProgress: {
    "& .MuiCircularProgress-svg": {
      animation: "$MultiColorProgressSpinner 2.8s ease-in-out infinite"
    }
  }
});

const MultiColorProgressSpinner = (props: CircularProgressProps) => {
  const classes = useStyles();
  return (
    <CircularProgress
      {...props}
      thickness={5}
      className={classes.circularProgress}
    />
  );
};

export default MultiColorProgressSpinner;
