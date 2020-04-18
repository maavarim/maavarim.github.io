import React, { Fragment, useState } from "react";
import {
  Box,
  makeStyles,
  TextField,
  InputAdornment,
  Typography,
  Button,
} from "@material-ui/core";
import SearchFilter, { searchFilters } from "../../searchFilters";
import {
  CallTwoTone,
  PlaceTwoTone,
  AccountCircleTwoTone,
} from "@material-ui/icons";
import { setMap } from "../../utils/Map";
import BusinessView from "../../components/BusinessView";
import {
  ContainedPrimaryButton,
  PrimaryButton,
} from "../../components/StyledButtons";
import Business, { BusinessInfo } from "../../types/Business";
import { isBlankOrEmpty } from "../../utils/String";
import { iterableSome } from "../../utils/Array";
import User from "../../types/User";
import {
  WithAuthenticatedProps,
  withAuthenticated,
} from "../../hocs/requiredAuthenticated";
import { BusinessResult, BusinessResultType } from "../../types/Proposal";

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

interface Step2Props extends WithAuthenticatedProps {
  loggedInUser: User;
  name: string | null;
  existingBusiness: Business | null;
  onResult: (business: BusinessResult) => void;
  handleBack: () => void;
}

const Step2 = ({
  loggedInUser,
  name,
  existingBusiness,
  onResult,
  handleBack,
}: Step2Props) => {
  const classes = useStyles();

  const [location, setLocation] = useState(
    existingBusiness?.info.location ?? ""
  );
  const [phone, setPhone] = useState(existingBusiness?.info.phone ?? "");
  const [selectedFilters, setSelectedFilters] = useState<Map<string, string[]>>(
    new Map(
      searchFilters.map((searchFilter) => [
        searchFilter.filterKey,
        existingBusiness
          ? Object.entries(existingBusiness.info).find(
              ([filterName]) => filterName === searchFilter.filterKey
            )?.[1] ?? []
          : [],
      ])
    )
  );

  const [editMode, setEditMode] = useState(existingBusiness === null);
  const isInvalidRecommendation =
    ((name === null || isBlankOrEmpty(name)) &&
      (existingBusiness === null ||
        existingBusiness.name === null ||
        isBlankOrEmpty(existingBusiness.name))) ||
    iterableSome(
      selectedFilters.entries(),
      ([_, selectedOptions]) => selectedOptions.length === 0
    );

  const handleNextClick = () => {
    if (isInvalidRecommendation) return;

    const businessInfo = ({
      authorEmail: loggedInUser.email,
      phone,
      location,

      ...Object.fromEntries(selectedFilters.entries()),

      accepted: false,
    } as unknown) as BusinessInfo;

    onResult(
      existingBusiness === null
        ? {
            type: BusinessResultType.createNew,
            business: {
              name: name || "",
              info: businessInfo,
            },
          }
        : {
            type: BusinessResultType.alterExisting,
            business: {
              name: existingBusiness.name,
              info: businessInfo,
            },
          }
    );
  };

  return (
    <Fragment>
      {existingBusiness !== null && !editMode && (
        <Fragment>
          <Typography variant="body1">הפרטים הבאים נכונים?</Typography>
          <BusinessView rating={false} detailed business={existingBusiness} />
          <Box className={classes.dualColumnGrid} mt={1}>
            <PrimaryButton variant="outlined" onClick={() => setEditMode(true)}>
              לא, אני רוצה לערוך אותם
            </PrimaryButton>
            <ContainedPrimaryButton
              variant="outlined"
              onClick={() =>
                onResult({
                  type: BusinessResultType.useExisting,
                  business: existingBusiness,
                })
              }
            >
              כן, הם נכונים
            </ContainedPrimaryButton>
          </Box>
        </Fragment>
      )}

      {(existingBusiness === null || editMode) && (
        <Fragment>
          <Box mt={1} mb={1}>
            <Typography variant="h6">פרטים כלליים</Typography>
          </Box>
          <Box className={classes.dualColumnGrid}>
            <TextField
              fullWidth
              label="שם"
              value={existingBusiness?.name ?? name ?? ""}
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
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="outlined" onClick={handleBack}>
              חזרה לבחירת שם
            </Button>

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
