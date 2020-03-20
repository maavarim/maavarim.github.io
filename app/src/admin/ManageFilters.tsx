import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  Typography,
  Box,
  makeStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  TextField,
  Button
} from "@material-ui/core";
import {
  ExpandMoreTwoTone,
  DeleteTwoTone,
  KeyboardArrowUp
} from "@material-ui/icons";
import DeleteButton from "../components/DeleteButton";
import SearchFilter, { getEmptySearchFilter } from "../types/SearchFilter";
import logger from "../utils/logger";
import {
  getAllSearchFilters,
  createOrUpdateSearchFilter,
  deleteSearchFilter as remoteDeleteSearchFilter
} from "../firebase/db";
import { firebaseDocToSearchFilter } from "../converters";
import { reduceNulls, moveElementUp } from "../utils/ArrayUtils";
import { newRandomString } from "../utils/random";
import { Config } from "../utils/Config";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold
  },
  optionsList: {
    width: "100%"
  },
  newOptionTextField: {
    "& .MuiOutlinedInput-root": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    }
  },
  newOptionButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  newFilterTitleField: {
    "& .MuiInputBase-root": {
      fontSize: "1.4em",
      fontWeight: 600
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: 0,
      borderLeftWidth: "0 !important",
      borderRightWidth: "0 !important"
    }
  }
}));

interface AddOptionFieldProps {
  onSubmit: (value: string) => void;
}
const AddOptionField = ({ onSubmit }: AddOptionFieldProps) => {
  const textField = useRef<any | null>(null);
  const classes = useStyles();
  const [value, setValue] = useState("");

  const submit = () => {
    onSubmit(value);
    setValue("");
    textField.current?.focus();
  };

  return (
    <Fragment>
      <TextField
        variant="outlined"
        size="small"
        label="אופציה חדשה"
        fullWidth
        value={value}
        onChange={e => setValue(e.target.value)}
        className={classes.newOptionTextField}
        inputRef={textField}
        onKeyPress={ev => {
          if (ev.key === "Enter") {
            submit();
            ev.preventDefault();
          }
        }}
      />
      <Button
        className={classes.newOptionButton}
        variant="contained"
        color="primary"
        disableElevation
        onClick={_ => {
          if (value.trim() !== "") submit();
        }}
      >
        הוספה
      </Button>
    </Fragment>
  );
};

const FiltersMangment = () => {
  const classes = useStyles();
  const [existingFilters, setExistingFilters] = useState<SearchFilter[]>([]);

  const showErrorMessage = (message: string) => {
    // TODO
    console.log(message);
  };

  const updateSearchFilter = (searchFilter: SearchFilter) => {
    createOrUpdateSearchFilter(searchFilter);
    setExistingFilters(
      existingFilters.map(existingFilter =>
        existingFilter.id === searchFilter.id ? searchFilter : existingFilter
      )
    );
  };

  const addSearchFilterOption = (searchFilter: SearchFilter, option: string) =>
    updateSearchFilter({
      ...searchFilter,
      options: [...searchFilter.options, option]
    });

  const deleteSearchFilterOption = (
    searchFilter: SearchFilter,
    option: string
  ) =>
    updateSearchFilter({
      ...searchFilter,
      options: searchFilter.options.filter(
        existingOption => existingOption !== option
      )
    });

  const moveSearchFilterOptionUp = (
    searchFilter: SearchFilter,
    optionIndex: number
  ) =>
    updateSearchFilter({
      ...searchFilter,
      options: moveElementUp(searchFilter.options, optionIndex)
    });

  const deleteSearchFilter = (searchFilter: SearchFilter) =>
    remoteDeleteSearchFilter(searchFilter).then(_ =>
      setExistingFilters(
        existingFilters.filter(({ id }) => searchFilter.id !== id)
      )
    );

  const [newSearchFilter, setNewSearchFilter] = useState<SearchFilter>(
    getEmptySearchFilter(existingFilters.length)
  );

  const addNewSearchFilterOption = (option: string) =>
    setNewSearchFilter({
      ...newSearchFilter,
      options: [...newSearchFilter.options, option]
    });

  const deleteNewSearchFilterOption = (option: string) =>
    setNewSearchFilter({
      ...newSearchFilter,
      options: newSearchFilter.options.filter(
        existingOption => existingOption !== option
      )
    });

  const moveNewSearchFilterOptionUp = (optionIndex: number) =>
    setNewSearchFilter({
      ...newSearchFilter,
      options: moveElementUp(newSearchFilter.options, optionIndex)
    });

  const createNewSearchFilter = () => {
    const id = newRandomString(
      existingFilters.map(existingFilter => existingFilter.id),
      Config.searchFilterLength
    );
    const newSearchFilterWithRealId = { ...newSearchFilter, id };
    createOrUpdateSearchFilter(newSearchFilterWithRealId)
      .then(_ => {
        setExistingFilters([...existingFilters, newSearchFilterWithRealId]);
        setNewSearchFilter(getEmptySearchFilter(existingFilters.length + 1));
      })
      .catch(() => showErrorMessage("חלה שגיאה, נסו שוב."));
  };

  useEffect(() => {
    getAllSearchFilters()
      .then(docs => {
        const remoteExistingFilters = reduceNulls(
          docs.map(firebaseDocToSearchFilter)
        );
        if (remoteExistingFilters !== null) {
          setExistingFilters(remoteExistingFilters);
          setNewSearchFilter(
            getEmptySearchFilter(remoteExistingFilters.length)
          );
        }
      })
      .catch(logger.error);
  }, []);

  return (
    <Fragment>
      <Box mb={2}>
        <Typography variant="h5">פילטרים</Typography>
      </Box>
      {existingFilters.map(searchFilter => (
        <ExpansionPanel key={searchFilter.id}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreTwoTone />}
            aria-controls={`panel${searchFilter.id}-content`}
          >
            <Typography className={classes.heading}>
              {searchFilter.title}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Box display="flex" flexDirection="column" width="100%">
              <List className={classes.optionsList}>
                {searchFilter.options.map((option, optionIndex) => (
                  <Fragment key={optionIndex}>
                    <ListItem>
                      <ListItemText primary={option} />
                      <ListItemSecondaryAction>
                        {optionIndex > 0 && (
                          <IconButton
                            edge="end"
                            aria-label="העלאה במעלה הרשימה"
                            onClick={_ =>
                              moveSearchFilterOptionUp(
                                searchFilter,
                                optionIndex
                              )
                            }
                          >
                            <KeyboardArrowUp />
                          </IconButton>
                        )}
                        {searchFilter.options.length > 1 && (
                          <IconButton
                            edge="end"
                            aria-label="מחיקה"
                            onClick={_ =>
                              deleteSearchFilterOption(searchFilter, option)
                            }
                          >
                            <DeleteTwoTone />
                          </IconButton>
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component="li" />
                  </Fragment>
                ))}
                <ListItem style={{ paddingRight: 0, paddingLeft: 0 }}>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="stretch">
                        <AddOptionField
                          onSubmit={value =>
                            addSearchFilterOption(searchFilter, value)
                          }
                        />
                      </Box>
                    }
                  />
                </ListItem>
              </List>
              <Box display="flex" justifyContent="flex-end" mt={1}>
                <DeleteButton
                  variant="contained"
                  onClick={() => deleteSearchFilter(searchFilter)}
                >
                  מחיקת פילטר
                </DeleteButton>
              </Box>
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreTwoTone />}
          aria-controls="panelAddNew-content"
        >
          <Typography className={classes.heading}>פילטר חדש</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: 0 }}>
          <Box display="flex" flexDirection="column" width="100%">
            <TextField
              label="שם הפילטר"
              fullWidth
              variant="outlined"
              value={newSearchFilter.title}
              className={classes.newFilterTitleField}
              onChange={e =>
                setNewSearchFilter({
                  ...newSearchFilter,
                  title: e.target.value
                })
              }
            />
            <Box p={2}>
              <Box mt={3}>
                <Typography style={{ fontWeight: 600 }}>
                  אפשרויות בחירה
                </Typography>
              </Box>
              <List className={classes.optionsList} disablePadding>
                {newSearchFilter.options.map((option, optionIndex) => (
                  <Fragment key={optionIndex}>
                    <ListItem>
                      <ListItemText primary={option} />
                      <ListItemSecondaryAction>
                        {optionIndex > 0 && (
                          <IconButton
                            edge="end"
                            aria-label="העלאה במעלה הרשימה"
                            onClick={_ =>
                              moveNewSearchFilterOptionUp(optionIndex)
                            }
                          >
                            <KeyboardArrowUp />
                          </IconButton>
                        )}
                        <IconButton
                          edge="end"
                          aria-label="מחיקה"
                          onClick={_ => deleteNewSearchFilterOption(option)}
                        >
                          <DeleteTwoTone />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component="li" />
                  </Fragment>
                ))}
                <ListItem style={{ paddingRight: 0, paddingLeft: 0 }}>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="stretch">
                        <AddOptionField
                          onSubmit={value => addNewSearchFilterOption(value)}
                        />
                      </Box>
                    }
                  />
                </ListItem>
              </List>
              <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={createNewSearchFilter}
                  disabled={
                    newSearchFilter.title.trim() === "" ||
                    newSearchFilter.options.length === 0
                  }
                >
                  יצירת פילטר חדש
                </Button>
              </Box>
            </Box>
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Fragment>
  );
};

export default FiltersMangment;
