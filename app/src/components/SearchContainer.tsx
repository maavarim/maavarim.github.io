import React, { useState, Fragment, useReducer } from "react";
import {
  Container,
  Typography,
  makeStyles,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Button
} from "@material-ui/core";
import HomeSearchIcon from "./custom-icons/HomeSearchIcon";
import SearchFilter, { searchFilters } from "../searchFilters";
import { splitIntoPairs } from "../utils/ArrayUtils";
import { fetchRecommendations } from "../server/api";

const useStyles = makeStyles(theme => ({
  searchContainer: {
    marginTop: `-${theme.spacing(4)}px`
  },
  fieldsContainer: {
    width: "calc(100% + 16px)",
    "& .MuiFormControl-root": {
      width: "100%"
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
          <CardContent>
            <Box mb={2}>
              <Typography variant="h5" align="center" color="textPrimary">
                חיפוש אנשי.ות מקצוע
              </Typography>
              <Typography align="center" color="textSecondary" gutterBottom>
                חפשו בחיפוש חופשי או סננו לפי השדות
              </Typography>
            </Box>
            <Grid container spacing={1} className={classes.fieldsContainer}>
              <Grid item container spacing={1} xs={12}>
                <Grid item xs={12}>
                  <TextField
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
                </Grid>
              </Grid>
              {splitIntoPairs(searchFilters).map((row, rowIndex) => (
                <Grid item container spacing={1} xs={12} key={rowIndex}>
                  {row.map(
                    (searchFilter: SearchFilter, searchFilterIndexInRow) => (
                      <Grid item xs={12} md={6} key={searchFilterIndexInRow}>
                        {searchFilter({
                          onChange: (filterKey, selectedOptions) =>
                            dispathSelectedFiltersAction({
                              type: "change",
                              filterKey,
                              selectedOptions
                            })
                        })}
                      </Grid>
                    )
                  )}
                </Grid>
              ))}
            </Grid>
            <Button color="primary" variant="contained" onClick={fetchResults}>
              חיפוש
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Fragment>
  );
}

export default SearchContainer;
