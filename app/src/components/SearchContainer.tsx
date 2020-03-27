import React, { useState, Fragment, useReducer } from "react";
import {
  Container,
  Typography,
  makeStyles,
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button
} from "@material-ui/core";
import HomeSearchIcon from "./custom-icons/HomeSearchIcon";
import SearchFilter, { searchFilters } from "../searchFilters";
import { fetchRecommendations } from "../server/api";

const useStyles = makeStyles(theme => ({
  searchContainer: {
    marginTop: `-${theme.spacing(4)}px`
  },
  fieldsContainer: {
    display: "grid",
    gridGap: theme.spacing(1),
    gridTemplateColumns: "repeat(2, 1fr)",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr"
    }
  },
  freeTextField: {
    gridRow: 1,
    gridColumn: "1 / 3",
    [theme.breakpoints.down("sm")]: {
      gridColumn: 1
    }
  }
}));

type SelectedFilterApplicatorsState = Map<string, string[]>;
type SelectedFilterApplicatorsReducerAction = {
  type: "change";
  filterKey: string;
  selectedOptions: string[];
};

function selectedFilterApplicatorsReducer(
  state: SelectedFilterApplicatorsState,
  action: SelectedFilterApplicatorsReducerAction
): SelectedFilterApplicatorsState {
  switch (action.type) {
    case "change":
      const newState = new Map(state);
      if (action.selectedOptions.length === 0) {
        newState.delete(action.filterKey);
      } else {
        newState.set(action.filterKey, action.selectedOptions);
      }
      return newState;
  }
}

function SearchContainer() {
  const classes = useStyles();
  const [freeTextQuery, setFreeTextQuery] = useState("");
  const [selectedFilters, dispathSelectedFiltersAction] = useReducer(
    selectedFilterApplicatorsReducer,
    new Map<string, string[]>()
  );

  const fetchResults = () => {
    const searchQuery = {
      freeText: freeTextQuery,
      ...Object.fromEntries(selectedFilters)
    };

    fetchRecommendations(searchQuery)
      .then(console.log)
      .catch(console.error);
  };

  return (
    <Fragment>
      <Container maxWidth="md" className={classes.searchContainer}>
        <Card>
          <CardContent style={{ padding: 0 }}>
            <Box p={2}>
              <Box mb={2}>
                <Typography variant="h5" align="center" color="textPrimary">
                  חיפוש אנשי.ות מקצוע
                </Typography>
                <Typography align="center" color="textSecondary" gutterBottom>
                  חפשו בחיפוש חופשי או סננו לפי השדות
                </Typography>
              </Box>
              <Box className={classes.fieldsContainer}>
                <TextField
                  className={classes.freeTextField}
                  label="חיפוש חופשי"
                  value={freeTextQuery}
                  onChange={event => setFreeTextQuery(event.target.value)}
                  color="secondary"
                  variant="filled"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeSearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
                {searchFilters.map((searchFilter: SearchFilter) => (
                  <searchFilter.render
                    key={searchFilter.filterKey}
                    onChange={selectedOptions =>
                      dispathSelectedFiltersAction({
                        type: "change",
                        filterKey: searchFilter.filterKey,
                        selectedOptions
                      })
                    }
                  />
                ))}
              </Box>
              <Box display="flex" justifyContent="flex-end" mt={1}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={fetchResults}
                >
                  חיפוש
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Fragment>
  );
}

export default SearchContainer;
