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
  Button,
  Dialog
} from "@material-ui/core";
import RecommendationView from "./RecommendationView";
import HomeSearchIcon from "../icons/HomeSearchIcon";
import SearchFilter, { searchFilters } from "../searchFilters";
import server from "../server";
import ServerRecommendation from "../types/ServerRecommendation";
import {
  PrimaryButton,
  ContainedPrimaryButton,
  DangerButton
} from "./StyledButtons";

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
  const [results, setResults] = useState<ServerRecommendation[] | null>([
    {
      area: ["גוש דן", "אזור אשקלון"],
      expertise: ["אנדוקרינולוגיה", "ילדים ומתבגרים", "משפחה"],
      gender: ["גבר"],
      healthCare: ["מכבי"],
      language: ["עברית"],
      profession: ["עוסק.ת מתחום הרפואה", "אחר"],
      accepted: true,
      _id: "5e7a3268e9ad56f642d738aa",
      authorEmail: "sophia@maavarim.com",
      name: "דר׳ פרינדלי",
      rating: 4,
      phone: "0538306666",
      location: "ג׳יי קיי רולינג 5, תל אביב-יפו",
      additionalInfo: "הוא ממש נחמד",
      createdAt: new Date("2020-03-26T15:59:50.467Z")
    },
    {
      area: ["גוש דן", "אזור נתניה"],
      expertise: ["אנדוקרינולוגיה", "משפחה"],
      gender: ["אישה"],
      healthCare: ["מכבי", "לאומית"],
      language: ["ערבית"],
      profession: ["עוסק.ת מתחום הרפואה"],
      accepted: true,
      _id: "5e7a32e51c6542f6680635ae",
      authorEmail: "sophia@maavarim.com",
      name: "דר׳ פרינדלית עם ",
      rating: 5,
      phone: "0538307777",
      location: "ג׳יי קיי רולינג 2, נתניה",
      additionalInfo: "היא סופר נחמדה",
      createdAt: new Date("2020-03-26T12:29:50.467Z")
    },
    {
      area: ["אזור נתניה", "גוש דן"],
      expertise: ["אחר", "ילדים ומתבגרים", "טיפול באמנות"],
      gender: ["אישה"],
      healthCare: ["מכבי"],
      language: ["עברית", "אנגלית"],
      profession: ["אחר"],
      accepted: true,
      _id: "5e7e067e66cc115be8f04765",
      authorEmail: "sophia@maavarim.org",
      name: "סופיה ציאדה",
      rating: 4,
      phone: "07989799",
      location: "הבית של סופי",
      additionalInfo: "עוד פרטים",
      createdAt: new Date("2020-03-27T12:59:50.467Z")
    },
    {
      area: ["אזור נתניה"],
      expertise: ["הסרת שיער בלייזר"],
      gender: ["אחר"],
      healthCare: ["מכבי"],
      language: ["אנגלית"],
      profession: ["מטפל.ת"],
      accepted: true,
      _id: "5e7e22f6ad70306284424f6b",
      authorEmail: "sophia@maavarim.org",
      name: "test",
      rating: 4,
      phone: "sd",
      location: "sds",
      additionalInfo: "sd",
      createdAt: new Date("2020-03-27T15:59:50.467Z")
    }
  ]);

  const [
    focusedRecommendation,
    setFocusedRecommendation
  ] = useState<ServerRecommendation | null>(null);
  const [
    isFocusedRecommendationDialogOpen,
    setIsFocusedRecommendationDialogOpen
  ] = useState(false);

  const fetchResults = () => {
    const searchQuery = {
      freeText: freeTextQuery,
      ...Object.fromEntries(selectedFilters)
    };

    server
      .fetchRecommendations(searchQuery)
      .then(setResults)
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
        {results !== null && (
          <Box className={classes.resultsContainer} mt={2} mb={2}>
            {results.map(recommendation => (
              <Card key={recommendation._id}>
                <CardContent style={{ padding: 0 }}>
                  <RecommendationView
                    recommendation={recommendation}
                    buttons={
                      <Fragment>
                        <PrimaryButton
                          size="small"
                          onClick={() => {
                            setFocusedRecommendation(recommendation);
                            setIsFocusedRecommendationDialogOpen(true);
                          }}
                        >
                          פרטים נוספים
                        </PrimaryButton>
                        <ContainedPrimaryButton
                          size="small"
                          onClick={console.log}
                        >
                          יש לי מה להוסיף!
                        </ContainedPrimaryButton>
                      </Fragment>
                    }
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
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
