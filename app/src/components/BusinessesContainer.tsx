import React from "react";
import Business from "../types/Business";
import {
  makeStyles,
  Box,
  Card,
  CardContent,
  BoxProps,
} from "@material-ui/core";
import BusinessView from "./BusinessView";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    marginTop: `-${theme.spacing(4)}px`,
  },
  fieldsContainer: {
    display: "grid",
    gridGap: theme.spacing(1),
    gridTemplateColumns: "repeat(2, 1fr)",
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
    },
  },
  freeTextField: {
    gridRow: 1,
    gridColumn: "1 / 3",
    [theme.breakpoints.down("xs")]: {
      gridColumn: 1,
    },
  },
  resultsContainer: {
    display: "grid",
    gridGap: theme.spacing(1),
    gridTemplateColumns: "repeat(3, 1fr)",
    [theme.breakpoints.only("xs")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
    },
  },
}));

interface BusinessesContainerProps {
  businesses: Business[];
  buttons: (business: Business) => JSX.Element;
  containerProps?: BoxProps;
  disableElevation?: boolean;
  rating?: boolean;
}

const BusinessesContainer = ({
  businesses,
  buttons,
  containerProps,
  disableElevation,
  rating,
}: BusinessesContainerProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.resultsContainer} mt={2} mb={2} {...containerProps}>
      {businesses.map((business) => (
        <Card key={business.name} elevation={disableElevation ? 0 : 1}>
          <CardContent style={{ padding: 0 }}>
            <BusinessView
              business={business}
              buttons={buttons(business)}
              rating={rating}
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default BusinessesContainer;
