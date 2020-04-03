import React, { Fragment, useState } from "react";
import { Box, makeStyles, TextField, InputAdornment } from "@material-ui/core";
import SearchFilter, { searchFilters } from "../../searchFilters";
import {
  CallTwoTone,
  PlaceTwoTone,
  AccountCircleTwoTone
} from "@material-ui/icons";
import { setMap } from "../../utils/Map";
import ServerRecommendation from "../../types/ServerRecommendation";

const useStyles = makeStyles(theme => ({
  fieldsContainer: {
    width: "calc(100% + 16px)",
    "& .MuiFormControl-root": {
      width: "100%"
    }
  },
  generalDetailsContainer: {
    display: "grid",
    gridGap: theme.spacing(1),
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "1fr"
    }
  },
  topGridLeftColumn: {
    height: "100%",
    gridRow: "1 / 4",
    gridColumn: 2,
    [theme.breakpoints.down("xs")]: {
      height: "unset",
      gridRow: 4,
      gridColumn: 1
    }
  },
  moreDetailsTextField: {
    flexGrow: 1,
    "& .MuiInputBase-root": {
      height: "100%"
    },
    [theme.breakpoints.down("xs")]: {
      "& .MuiInputBase-root": {
        height: "unset"
      }
    }
  },
  searchFilterContainer: {
    display: "grid",
    gridGap: theme.spacing(1),
    gridTemplateColumns: "repeat(2, 1fr)",
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr"
    }
  }
}));

interface OngoingRecommendationProps {
  serverRecommendation: ServerRecommendation;
}
const OngoingRecommendation = ({
  serverRecommendation
}: OngoingRecommendationProps) => {
  const classes = useStyles();

  const [name, setName] = useState(serverRecommendation.name);
  const [location, setLocation] = useState(serverRecommendation.location ?? "");
  const [phone, setPhone] = useState(serverRecommendation.phone ?? "");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Map<string, string[]>>(
    new Map(searchFilters.map(searchFilter => [searchFilter.filterKey, []]))
  );

  return (
    <Fragment>
      <Box className={classes.generalDetailsContainer}>
        <TextField
          fullWidth
          label="שם"
          value={name}
          onChange={event => setName(event.target.value)}
          color="secondary"
          variant="filled"
          placeholder="ישראל ישראלית"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleTwoTone />
              </InputAdornment>
            )
          }}
          style={{ gridRow: 1, gridColumn: 1 }}
        />
        <TextField
          fullWidth
          label="טלפון"
          value={phone}
          onChange={event => setPhone(event.target.value)}
          color="secondary"
          variant="filled"
          placeholder="053-1234567"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CallTwoTone />
              </InputAdornment>
            )
          }}
          style={{ gridRow: 2, gridColumn: 1 }}
        />
        <TextField
          fullWidth
          label="כתובת"
          value={location}
          onChange={event => setLocation(event.target.value)}
          variant="filled"
          color="secondary"
          placeholder="גולדשטיין 2, תל אביב-יפו"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PlaceTwoTone />
              </InputAdornment>
            )
          }}
          style={{ gridRow: 3, gridColumn: 1 }}
        />
        <Box
          className={classes.topGridLeftColumn}
          display="flex"
          flexDirection="column"
        >
          <TextField
            label="פרטים נוספים"
            multiline
            className={classes.moreDetailsTextField}
            fullWidth
            rows={5}
            value={additionalInfo}
            onChange={event => setAdditionalInfo(event.target.value)}
            variant="filled"
            color="secondary"
          />
        </Box>
      </Box>

      <Box className={classes.searchFilterContainer} mt={1}>
        {searchFilters.map((searchFilter: SearchFilter) => (
          <searchFilter.render
            key={searchFilter.filterKey}
            onChange={selectedOptions =>
              setSelectedFilters(
                setMap(selectedFilters, searchFilter.filterKey, selectedOptions)
              )
            }
          />
        ))}
      </Box>
    </Fragment>
  );
};

export default OngoingRecommendation;
