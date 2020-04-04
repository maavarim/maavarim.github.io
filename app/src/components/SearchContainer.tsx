import React, { useState, Fragment, useReducer } from "react";
import {
  Typography,
  makeStyles,
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  ContainerProps,
} from "@material-ui/core";
import RecommendationView from "./RecommendationView";
import HomeSearchIcon from "../icons/HomeSearchIcon";
import SearchFilter, { searchFilters } from "../searchFilters";
import server from "../server";
import ServerRecommendation from "../types/ServerRecommendation";
import {
  PrimaryButton,
  ContainedPrimaryButton,
  DangerButton,
} from "./StyledButtons";
import RecommendationsContainer from "./RecommendationsContainer";

const useStyles = makeStyles((theme) => ({
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

function SearchContainer(props: ContainerProps) {
  const classes = useStyles();
  const [freeTextQuery, setFreeTextQuery] = useState("");
  const [selectedFilters, dispathSelectedFiltersAction] = useReducer(
    selectedFilterApplicatorsReducer,
    new Map<string, string[]>()
  );
  const [results, setResults] = useState<ServerRecommendation[] | null>(null);

  const [
    focusedRecommendation,
    setFocusedRecommendation,
  ] = useState<ServerRecommendation | null>(null);
  const [
    isFocusedRecommendationDialogOpen,
    setIsFocusedRecommendationDialogOpen,
  ] = useState(false);

  const fetchResults = () => {
    const searchQuery = {
      freeText: freeTextQuery,
      ...Object.fromEntries(selectedFilters),
    };

    server
      .fetchRecommendations(searchQuery)
      .then(setResults)
      .catch(console.error);
  };

  return (
    <Fragment>
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
                onChange={(event) => setFreeTextQuery(event.target.value)}
                color="secondary"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeSearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {searchFilters.map((searchFilter: SearchFilter) => (
                <searchFilter.render
                  key={searchFilter.filterKey}
                  value={selectedFilters.get(searchFilter.filterKey) ?? []}
                  onChange={(selectedOptions) =>
                    dispathSelectedFiltersAction({
                      type: "change",
                      filterKey: searchFilter.filterKey,
                      selectedOptions,
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
      {results !== null && (
        <RecommendationsContainer
          recommendations={results}
          buttons={(recommendation) => (
            <Fragment>
              <PrimaryButton
                size="small"
                style={{}}
                onClick={() => {
                  setFocusedRecommendation(recommendation);
                  setIsFocusedRecommendationDialogOpen(true);
                }}
              >
                פרטים נוספים
              </PrimaryButton>
              <ContainedPrimaryButton size="small" onClick={console.log}>
                יש לי מה להוסיף!
              </ContainedPrimaryButton>
            </Fragment>
          )}
        />
      )}
      <Dialog
        open={isFocusedRecommendationDialogOpen}
        onClose={() => setIsFocusedRecommendationDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box p={1} pb={2}>
          {focusedRecommendation && (
            <RecommendationView
              recommendation={focusedRecommendation}
              detailed
              buttons={
                <Fragment>
                  <ContainedPrimaryButton size="small" onClick={console.log}>
                    יש לי מה להוסיף!
                  </ContainedPrimaryButton>
                  <DangerButton size="small" onClick={console.log}>
                    דיווח
                  </DangerButton>
                </Fragment>
              }
            />
          )}
        </Box>
      </Dialog>
    </Fragment>
  );
}

export default SearchContainer;
