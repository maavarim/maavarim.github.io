import React, { Fragment, useState } from "react";
import {
  Box,
  makeStyles,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import SearchFilter, { searchFilters } from "../../searchFilters";
import {
  CallTwoTone,
  PlaceTwoTone,
  AccountCircleTwoTone,
} from "@material-ui/icons";
import { setMap } from "../../utils/Map";
import ServerRecommendation from "../../types/ServerRecommendation";
import RecommendationView from "../../components/RecommendationView";
import {
  ContainedPrimaryButton,
  PrimaryButton,
} from "../../components/StyledButtons";
import Recommendation from "../../types/Recommendation";
import { isBlankOrEmpty } from "../../utils/String";
import { iterableSome } from "../../utils/Array";
import User from "../../types/User";
import {
  WithAuthenticatedProps,
  withAuthenticated,
} from "../../hocs/requiredAuthenticated";

const useStyles = makeStyles((theme) => ({
  fieldsContainer: {
    width: "calc(100% + 16px)",
    "& .MuiFormControl-root": {
      width: "100%",
    },
  },
  dualColumnGrid: {
    display: "grid",
    gridGap: theme.spacing(1),
    gridTemplateColumns: "repeat(2, 1fr)",
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
    },
  },
  nameTextField: {
    gridRow: 1,
    gridColumn: "1 / -1",
    [theme.breakpoints.down("xs")]: {
      gridColumn: 1,
    },
  },
}));

export enum Step2ResultType {
  useExisting,
  alterExisting,
  createNew,
}

export type Step2Result =
  | {
      type: Step2ResultType.useExisting;
      existingRecommendation: ServerRecommendation;
    }
  | {
      type: Step2ResultType.alterExisting;
      existingRecommendation: ServerRecommendation;
      newRecommendation: Recommendation;
    }
  | {
      type: Step2ResultType.createNew;
      newRecommendation: Recommendation;
    };

interface Step2Props extends WithAuthenticatedProps {
  loggedInUser: User;
  name: string | null;
  existingRecommendation: ServerRecommendation | null;
  onResult: (result: Step2Result) => void;
}

const Step2 = ({
  loggedInUser,
  name,
  existingRecommendation,
  onResult,
}: Step2Props) => {
  const classes = useStyles();

  const [location, setLocation] = useState(
    existingRecommendation?.location ?? ""
  );
  const [phone, setPhone] = useState(existingRecommendation?.phone ?? "");
  const [selectedFilters, setSelectedFilters] = useState<Map<string, string[]>>(
    new Map(
      searchFilters.map((searchFilter) => [
        searchFilter.filterKey,
        existingRecommendation
          ? Object.entries(existingRecommendation).find(
              ([filterName]) => filterName === searchFilter.filterKey
            )?.[1] ?? []
          : [],
      ])
    )
  );

  const [editMode, setEditMode] = useState(existingRecommendation === null);
  const isInvalidRecommendation =
    ((name === null || isBlankOrEmpty(name)) &&
      (existingRecommendation === null ||
        existingRecommendation.name === null ||
        isBlankOrEmpty(existingRecommendation.name))) ||
    iterableSome(
      selectedFilters.entries(),
      ([_, selectedOptions]) => selectedOptions.length === 0
    );

  const handleNextClick = () => {
    if (isInvalidRecommendation) return;

    const newRecommendation = ({
      authorEmail: loggedInUser.email,
      name,
      phone,
      location,

      ...Object.fromEntries(selectedFilters.entries()),

      accepted: false,
    } as unknown) as Recommendation;

    onResult(
      existingRecommendation === null
        ? { type: Step2ResultType.createNew, newRecommendation }
        : {
            type: Step2ResultType.alterExisting,
            existingRecommendation,
            newRecommendation,
          }
    );
  };

  return (
    <Fragment>
      {existingRecommendation && !editMode && (
        <Fragment>
          <Typography variant="body1">הפרטים הבאים נכונים?</Typography>
          <RecommendationView
            rating={false}
            detailed
            recommendation={existingRecommendation}
          />
          <Box className={classes.dualColumnGrid} mt={1}>
            <PrimaryButton variant="outlined" onClick={() => setEditMode(true)}>
              לא, אני רוצה לערוך אותם
            </PrimaryButton>
            <ContainedPrimaryButton
              variant="outlined"
              onClick={() =>
                onResult({
                  type: Step2ResultType.useExisting,
                  existingRecommendation,
                })
              }
            >
              כן, הם נכונים
            </ContainedPrimaryButton>
          </Box>
        </Fragment>
      )}

      {(existingRecommendation === null || editMode) && (
        <Fragment>
          <Box mt={1} mb={1}>
            <Typography variant="h6">פרטים כלליים</Typography>
          </Box>
          <Box className={classes.dualColumnGrid}>
            <TextField
              fullWidth
              label="שם"
              value={existingRecommendation?.name ?? name ?? ""}
              className={classes.nameTextField}
              color="secondary"
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleTwoTone />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              label="טלפון"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              color="secondary"
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CallTwoTone />
                  </InputAdornment>
                ),
                readOnly: !editMode,
              }}
            />
            <TextField
              fullWidth
              label="כתובת"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              variant="filled"
              color="secondary"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PlaceTwoTone />
                  </InputAdornment>
                ),
                readOnly: !editMode,
              }}
            />
          </Box>

          <Box mt={2} mb={1}>
            <Typography variant="h6">תגיות למיניהן</Typography>
          </Box>
          <Box className={classes.dualColumnGrid}>
            {searchFilters.map((searchFilter: SearchFilter) => (
              <searchFilter.render
                key={searchFilter.filterKey}
                value={selectedFilters.get(searchFilter.filterKey) ?? []}
                selectProps={{
                  readOnly: !editMode,
                }}
                onChange={(selectedOptions) =>
                  setSelectedFilters(
                    setMap(
                      selectedFilters,
                      searchFilter.filterKey,
                      selectedOptions
                    )
                  )
                }
              />
            ))}
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <ContainedPrimaryButton
              variant="contained"
              onClick={handleNextClick}
              disabled={isInvalidRecommendation}
            >
              הבא
            </ContainedPrimaryButton>
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
};

export default withAuthenticated(Step2);
