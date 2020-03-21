import React, { useState, Fragment } from "react";
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
import SearchFilter, { searchFilters } from "../searchFilters";
import { splitIntoPairs } from "../utils/ArrayUtils";

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
  const [selectedFilters, setSelectedFilters] = useState(
    new Map<string, string[]>() // filter.firebaseFieldName => selected options
  );

  const handleChange = (filter: SearchFilter) => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedOptions = event.target.value as string[];
    const updatedSelectedFilters = new Map(selectedFilters);
    updatedSelectedFilters.set(filter.firebaseFieldName, selectedOptions);
    setSelectedFilters(updatedSelectedFilters);
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
              {splitIntoPairs(searchFilters).map((row, rowIndex) => (
                <Grid item container spacing={1} xs={12} key={rowIndex}>
                  {row.map((filter: SearchFilter) => {
                    const selectedOptions = selectedFilters.get(
                      filter.firebaseFieldName
                    );
                    return (
                      <Grid item xs={12} md={6} key={filter.firebaseFieldName}>
                        <FormControl color="secondary" variant="filled">
                          <InputLabel id={`select-${filter.firebaseFieldName}`}>
                            {filter.title}
                          </InputLabel>
                          <Select
                            labelId={`select-${filter.firebaseFieldName}`}
                            multiple
                            renderValue={selected =>
                              (selected as string[])
                                .join(" · ")
                            }
                            value={selectedOptions ?? []}
                            onChange={handleChange(filter)}
                          >
                            {filter.options.map((option, optionIndex) => (
                              <MenuItem value={option} key={optionIndex}>
                                <Checkbox
                                  checked={
                                    (selectedOptions?.indexOf(option) ??
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
    </Fragment>
  );
}

export default SearchContainer;
