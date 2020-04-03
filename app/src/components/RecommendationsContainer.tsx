import React from "react";
import ServerRecommendation from "../types/ServerRecommendation";
import {
  makeStyles,
  Box,
  Card,
  CardContent,
  BoxProps
} from "@material-ui/core";
import RecommendationView from "./RecommendationView";

const useStyles = makeStyles(theme => ({
  searchContainer: {
    marginTop: `-${theme.spacing(4)}px`
  },
  fieldsContainer: {
    display: "grid",
    gridGap: theme.spacing(1),
    gridTemplateColumns: "repeat(2, 1fr)",
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr"
    }
  },
  freeTextField: {
    gridRow: 1,
    gridColumn: "1 / 3",
    [theme.breakpoints.down("xs")]: {
      gridColumn: 1
    }
  },
  resultsContainer: {
    display: "grid",
    gridGap: theme.spacing(1),
    gridTemplateColumns: "repeat(3, 1fr)",
    [theme.breakpoints.only("xs")]: {
      gridTemplateColumns: "repeat(2, 1fr)"
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr"
    }
  }
}));

interface RecommendationsContainerProps {
  recommendations: ServerRecommendation[];
  buttons: (recommendation: ServerRecommendation) => JSX.Element;
  containerProps?: BoxProps;
  disableElevation?: boolean;
  rating?: boolean;
}

const RecommendationsContainer = ({
  recommendations,
  buttons,
  containerProps,
  disableElevation,
  rating
}: RecommendationsContainerProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.resultsContainer} mt={2} mb={2} {...containerProps}>
      {recommendations.map(recommendation => (
        <Card key={recommendation._id} elevation={disableElevation ? 0 : 1}>
          <CardContent style={{ padding: 0 }}>
            <RecommendationView
              recommendation={recommendation}
              buttons={buttons(recommendation)}
              rating={rating}
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default RecommendationsContainer;
