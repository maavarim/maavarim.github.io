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
  useMediaQuery
} from "@material-ui/core";
import Alert from "../components/Alert";
import Recommendation from "../types/Recommendation";
import SearchFilter, { searchFilters } from "../searchFilters";
import {
  CallTwoTone,
  PlaceTwoTone,
  AccountCircleTwoTone
} from "@material-ui/icons";
import { setMap } from "../utils/Map";
import { iterableSome } from "../utils/Array";
import { isBlankOrEmpty } from "../utils/String";
import server from "../server";
import User from "../types/User";
import Rating from "../components/Rating";

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

interface AddRecommendationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  loggedInUser: User;
}

const AddRecommendationDialog = ({
  open,
  setOpen,
  loggedInUser
}: AddRecommendationDialogProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const [isErrorSnackBarOpened, setIsErrorSnackBarOpened] = useState(false);
  const [isSuccessSnackBarOpened, setIsSuccessSnackBarOpened] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState("");
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

  const create = () => {
    if (isInvalidRecommendation) return;

    const recommendation = ({
      authorEmail: loggedInUser.email,
      name,
      rating: rating ?? 0,
      phone,
      location,
      additionalInfo,

      ...Object.fromEntries(selectedFilters.entries()),

      accepted: false
    } as unknown) as Recommendation;

    server
      .createRecommendation(recommendation)
      .then(() => {
        setIsSuccessSnackBarOpened(true);
        setOpen(false);
      })
      .catch(() => setIsErrorSnackBarOpened(true));
  };

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
