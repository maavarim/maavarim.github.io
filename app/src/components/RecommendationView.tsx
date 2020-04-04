import React, { Fragment } from "react";
import { Typography, makeStyles, Box } from "@material-ui/core";
import {
  PlaceTwoTone,
  LabelTwoTone,
  CallTwoTone,
  TranslateTwoTone,
  SpaTwoTone,
  BookTwoTone,
} from "@material-ui/icons";
import Rating from "./Rating";
import ServerRecommendation from "../types/ServerRecommendation";
import { formatForDisplaying } from "../utils/Array";

const useStyles = makeStyles((theme) => ({
  container: {
    fontSize: theme.typography.body1.fontSize,
  },
  name: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
    lineHeight: "1em",
  },
  rating: {
    fontSize: "1.1em",
  },
  tinyText: {
    fontSize: ".8em",
  },
  details: {
    display: "grid",
    gridTemplateColumns: "1.1em 1fr",
    gridGap: ".25em .5em",
    "& .MuiSvgIcon-root": {
      fontSize: "1.1em",
      height: "1.1em",
      width: "1.1em",
    },
  },
  buttonsConatiner: {
    display: "flex",
    [theme.breakpoints.up("xs")]: {
      borderTop: "1px solid #f7ecf9",
      "& .MuiButton-root": {
        borderRadius: 0,
        flexGrow: 1,
      },
    },
  },
}));

interface RecommendationViewProps {
  recommendation: ServerRecommendation;
  buttons?: JSX.Element;
  detailed?: boolean;
  rating?: boolean;
}

const RecommendationView = ({
  recommendation,
  buttons,
  detailed = false,
  rating = true,
}: RecommendationViewProps) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Box className={classes.container} p={2} pb={1}>
        <Box display="flex" alignItems="center" flexWrap="wrap" mb={1}>
          <Typography variant="h6" className={classes.name}>
            {recommendation.name}
          </Typography>
          {rating && (
            <Rating
              className={classes.rating}
              value={recommendation.rating}
              readOnly
            />
          )}
        </Box>

        <Box className={classes.details}>
          <LabelTwoTone />
          <Box>{formatForDisplaying(recommendation.profession)}</Box>

          {detailed && (
            <Fragment>
              <BookTwoTone />
              <Box>{formatForDisplaying(recommendation.expertise)}</Box>
            </Fragment>
          )}

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
      {buttons && <Box className={classes.buttonsConatiner}>{buttons}</Box>}
    </Fragment>
  );
};

export default RecommendationView;
