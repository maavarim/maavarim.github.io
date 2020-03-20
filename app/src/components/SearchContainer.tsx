import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  makeStyles,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputAdornment
} from "@material-ui/core";
import HomeSearchIcon from "./custom-icons/HomeSearchIcon";
import SearchFilter from "../types/SearchFilter";
import { splitIntoPairs } from "../utils/ArrayUtils";
import { getAllSearchFilters } from "../firebase/db";
import { reduceNulls } from "../utils/ArrayUtils";
import { firebaseDocToSearchFilter } from "../converters";
import logger from "../utils/logger";

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

function SearchContainer() {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<SearchFilter[] | null>(
    null
  );
  const [selectedFilters, setSelectedFilters] = useState(
    new Map<string, number[]>() // filter.id => indeices of selected options
  );

  const handleChange = (filter: SearchFilter) => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedOptions = event.target.value as number[];
    console.log(selectedOptions);
    const updatedSelectedFilters = new Map(selectedFilters);
    updatedSelectedFilters.set(filter.id, selectedOptions);
    setSelectedFilters(updatedSelectedFilters);
  };

  useEffect(() => {
    getAllSearchFilters()
      .then(docs => {
        const remoteExistingFilters = reduceNulls(
          docs.map(firebaseDocToSearchFilter)
        );
        if (remoteExistingFilters !== null) {
          setSearchFilters(remoteExistingFilters);
        }
      })
      .catch(logger.error);
  }, []);

  return (
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
                  value={searchQuery}
                  onChange={event => setSearchQuery(event.target.value)}
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
            {searchFilters !== null &&
              splitIntoPairs(searchFilters).map((row, rowIndex) => (
                <Grid item container spacing={1} xs={12} key={rowIndex}>
                  {row.map((filter: SearchFilter) => {
                    const selectedOptions = selectedFilters.get(filter.id);
                    return (
                      <Grid item xs={12} md={6} key={filter.id}>
                        <FormControl color="secondary" variant="filled">
                          <InputLabel id={`select-${filter.id}`}>
                            {filter.title}
                          </InputLabel>
                          <Select
                            labelId={`select-${filter.id}`}
                            multiple
                            renderValue={selected =>
                              (selected as number[])
                                .map(
                                  optionIndex =>
                                    filter.options[optionIndex] ?? ""
                                )
                                .join(" · ")
                            }
                            value={selectedOptions ?? []}
                            onChange={handleChange(filter)}
                          >
                            {filter.options.map((option, optionIndex) => (
                              <MenuItem value={optionIndex} key={optionIndex}>
                                <Checkbox
                                  checked={
                                    (selectedOptions?.indexOf(optionIndex) ??
                                      -1) > -1
                                  }
                                />
                                <ListItemText primary={option} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    );
                  })}
                </Grid>
              ))}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SearchContainer;
