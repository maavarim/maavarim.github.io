import React, { useState } from "react";
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
import SearchFilter from "../types/SearchFilter";
import { splitIntoPairs } from "../utils/ArrayUtils";
import HomeSearchIcon from "./custom-icons/HomeSearchIcon";

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

interface SearchContainerProps {
  filters: SearchFilter[];
}

function SearchContainer({ filters }: SearchContainerProps) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(
    new Map<string, string[]>() // filter.id => ids of selected options
  );

  const handleChange = (filter: SearchFilter) => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedOptions = event.target.value as string[];
    console.log(selectedOptions);
    const updatedSelectedFilters = new Map(selectedFilters);
    updatedSelectedFilters.set(filter.id, selectedOptions);
    setSelectedFilters(updatedSelectedFilters);
  };

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

            {splitIntoPairs(filters).map((row, rowIndex) => (
              <Grid item container spacing={1} xs={12} key={rowIndex}>
                {row.map((filter: SearchFilter) => {
                  const selectedOptions = selectedFilters.get(filter.id);
                  return (
                    <Grid item xs={12} md={6} key={filter.id}>
                      <FormControl color="secondary" variant="filled">
                        <InputLabel id={`select-${filter.firestoreFieldName}`}>
                          {filter.title}
                        </InputLabel>
                        <Select
                          labelId={`select-${filter.firestoreFieldName}`}
                          multiple
                          renderValue={selected =>
                            (selected as string[])
                              .map(
                                optionId =>
                                  filter.options.find(
                                    ({ id }) => id === optionId
                                  )?.title ?? ""
                              )
                              .join(" · ")
                          }
                          value={selectedOptions ?? []}
                          onChange={handleChange(filter)}
                        >
                          {filter.options.map(option => (
                            <MenuItem value={option.id} key={option.id}>
                              <Checkbox
                                checked={
                                  selectedOptions?.find(
                                    id => option.id === id
                                  ) !== undefined ?? false
                                }
                              />
                              <ListItemText primary={option.title} />
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
