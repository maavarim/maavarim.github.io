import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Box,
  Snackbar,
  makeStyles,
  TextField,
  InputAdornment,
  Typography,
  useTheme,
  useMediaQuery,
  withStyles
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Alert from "./Alert";
import Recommendation from "../types/Recommendation";
import SearchFilter, { searchFilters } from "../searchFilters";
import {
  StarBorder,
  CallTwoTone,
  PlaceTwoTone,
  AccountCircleTwoTone,
  StarTwoTone
} from "@material-ui/icons";
import { setMap } from "../utils/Map";
import { iterableSome } from "../utils/Array";
import { isBlankOrEmpty } from "../utils/String";

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
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "1fr"
    }
  },
  topGridLeftColumn: {
    height: "100%",
    gridRow: "1 / 4",
    gridColumn: 2,
    [theme.breakpoints.down("sm")]: {
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
    [theme.breakpoints.down("sm")]: {
      "& .MuiInputBase-root": {
        height: "unset"
      }
    }
  },
  searchFilterContainer: {
    display: "grid",
    gridGap: theme.spacing(1),
    gridTemplateColumns: "repeat(2, 1fr)",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr"
    }
  }
}));

const StyledRating = withStyles({
  iconFilled: {
    color: "#8e24aa"
  },
  iconHover: {
    color: "#a739c6"
  }
})(Rating);

interface AddRecommendationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddRecommendationDialog = ({
  open,
  setOpen
}: AddRecommendationDialogProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [isErrorSnackBarOpened, setIsErrorSnackBarOpened] = useState(false);
  const [isSuccessSnackBarOpened, setIsSuccessSnackBarOpened] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [moreDetails, setMoreDetails] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Map<string, string[]>>(
    new Map(searchFilters.map(searchFilter => [searchFilter.filterKey, []]))
  );

  const isInvalidRecommendation =
    isBlankOrEmpty(name) ||
    rating === null ||
    iterableSome(
      selectedFilters.entries(),
      ([_, selectedOptions]) => selectedOptions.length === 0
    );

  const create = () => {};
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
        fullScreen={fullScreen}
      >
        <DialogContent style={{ padding: 0 }}>
          <Box p={3} pt={2}>
            <Box mb={2}>
              <Typography variant="h5" color="textPrimary">
                הוספת מידע
              </Typography>
            </Box>
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
                value={phoneNumber}
                onChange={event => setPhoneNumber(event.target.value)}
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
                <Box
                  display="flex"
                  pb={1}
                  flexDirection="row"
                  justifyContent="center"
                >
                  <Box mr={1}>
                    <Typography color="textSecondary">דירוג: </Typography>
                  </Box>
                  <StyledRating
                    name="rating"
                    value={rating}
                    precision={0.5}
                    onChange={(_, newValue) => setRating(newValue)}
                    emptyIcon={<StarBorder fontSize="inherit" />}
                    icon={<StarTwoTone fontSize="inherit" />}
                    color="secondary"
                  />
                </Box>
                <TextField
                  label="פרטים נוספים"
                  multiline
                  className={classes.moreDetailsTextField}
                  fullWidth
                  rows={5}
                  value={moreDetails}
                  onChange={event => setMoreDetails(event.target.value)}
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

            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Box mr={1}>
                <Button variant="outlined" onClick={() => setOpen(false)}>
                  ביטול
                </Button>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={create}
                disabled={isInvalidRecommendation}
              >
                הוספה
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={isSuccessSnackBarOpened}
        autoHideDuration={6000}
        onClose={() => setIsSuccessSnackBarOpened(false)}
      >
        <Alert
          onClose={() => setIsSuccessSnackBarOpened(false)}
          severity="success"
        >
          תודה! צוות מעברים יבחן ויאשר את המידע בהקדם
        </Alert>
      </Snackbar>
      <Snackbar
        open={isErrorSnackBarOpened}
        autoHideDuration={6000}
        onClose={() => setIsErrorSnackBarOpened(false)}
      >
        <Alert onClose={() => setIsErrorSnackBarOpened(false)} severity="error">
          נתקלנו בשגיאה בנסיון להוסיף את המידע. נסו שוב, חכו קצת, או פנו אלינו
          לתמיכה{"\xa0"}
          <span role="img" aria-label="אמוג׳י ניצוצות">
            ✨
          </span>
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default AddRecommendationDialog;
