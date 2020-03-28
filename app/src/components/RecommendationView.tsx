import React, { Fragment } from "react";
import { Typography, makeStyles, Box, Button } from "@material-ui/core";
import {
  PlaceTwoTone,
  LabelTwoTone,
  CallTwoTone,
  TranslateTwoTone,
  SpaTwoTone,
  BookTwoTone
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
    marginRight: theme.spacing(2),
    lineHeight: "1em"
  },
  rating: {
    fontSize: "1.1em"
  },
  tinyText: {
    fontSize: ".8em"
  },
  details: {
    display: "grid",
    gridTemplateColumns: "1.1em 1fr",
    gridGap: ".25em .5em",
    "& .MuiSvgIcon-root": {
      fontSize: "1.1em",
      height: "1.1em",
      width: "1.1em"
    }
  },
  buttonsConatiner: {
    display: "grid",
    gridTemplateColumns: "1fr",
    [theme.breakpoints.up("xs")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      borderTop: "1px solid #f7ecf9",
      "& .MuiButton-root": {
        borderRadius: 0
      }
    }
  },
  moreDetailsButton: {
    background: "#f9f9f9",
    color: "#8e24aa"
  },
  addButton: {
    background: "#9c27b0",
    color: "#f1efef",
    "&:hover": {
      background: "rgba(156, 39, 176, 0.85)"
    }
  }
}));

interface RecommendationViewProps {
  recommendation: ServerRecommendation;
  onShowMoreDetails?: () => void;
  detailed?: boolean;
}

const RecommendationView = ({
  recommendation,
  onShowMoreDetails,
  detailed = false
}: RecommendationViewProps) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Box className={classes.container} p={2} pb={1}>
        <Box display="flex" alignItems="center" flexWrap="wrap" mb={1}>
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
      {!detailed && (
        <Box className={classes.buttonsConatiner}>
          {onShowMoreDetails && (
            <Button
              size="small"
              className={classes.moreDetailsButton}
              onClick={onShowMoreDetails}
            >
              פרטים נוספים
            </Button>
          )}
          <Button size="small" className={classes.addButton}>
            יש לי מה להוסיף!
          </Button>
        </Box>
      )}
    </Fragment>
  );
};

export default RecommendationView;
