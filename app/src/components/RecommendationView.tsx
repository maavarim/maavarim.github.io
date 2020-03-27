import React from "react";
import {
  Typography,
  makeStyles,
  Box,
  Card,
  CardContent
} from "@material-ui/core";
import {
  PlaceTwoTone,
  LabelTwoTone,
  CallTwoTone,
  TranslateTwoTone,
  HealingTwoTone,
  SpaTwoTone
} from "@material-ui/icons";
import Rating from "./Rating";
import ServerRecommendation from "../types/ServerRecommendation";
import { formatForDisplaying } from "../utils/Array";

const useStyles = makeStyles(theme => ({
  container: {
    fontSize: theme.typography.body1.fontSize
  },
  name: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
    lineHeight: "1em",
    marginBottom: ".25em"
  },
  rating: {
    fontSize: "1.1em",
    marginBottom: ".25em"
  },
  tinyText: {
    fontSize: ".8em"
  },
  details: {
    display: "grid",
    gridTemplateColumns: "1.1em 1fr",
    gridGap: ".25em .5em",
    marginTop: ".25em",
    "& .MuiSvgIcon-root": {
      fontSize: "1.1em",
      height: "1.1em",
      width: "1.1em"
    }
  }
}));

interface RecommendationViewProps {
  recommendation: ServerRecommendation;
}

const RecommendationView = ({ recommendation }: RecommendationViewProps) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent style={{ padding: 0 }}>
        <Box className={classes.container} p={2}>
          <Box display="flex" alignItems="center" flexWrap="wrap">
            <Typography variant="h6" className={classes.name}>
              {recommendation.name}
            </Typography>
            <Rating
              className={classes.rating}
              value={recommendation.rating}
              readOnly
            />
          </Box>

          <Box className={classes.details}>
            <LabelTwoTone />
            <Box>{formatForDisplaying(recommendation.profession)}</Box>

            <PlaceTwoTone />
            <Box>{recommendation.location}</Box>

            <CallTwoTone />
            <Box>{recommendation.phone}</Box>

            <TranslateTwoTone />
            <Box>{formatForDisplaying(recommendation.language)}</Box>

            <SpaTwoTone />
            <Box>{formatForDisplaying(recommendation.healthCare)}</Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecommendationView;
