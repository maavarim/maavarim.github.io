import React, { useState, useEffect, Fragment } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  makeStyles,
  Button,
  useMediaQuery,
  useTheme,
  Paper,
  Typography,
} from "@material-ui/core";
import { AccountCircleTwoTone } from "@material-ui/icons";
import ServerRecommendation from "../../types/ServerRecommendation";
import server from "../../server";
import RecommendationsContainer from "../../components/RecommendationsContainer";
import {
  ContainedPrimaryButton,
  PrimaryButton,
} from "../../components/StyledButtons";
import { isBlankOrEmpty } from "../../utils/String";

const useStyles = makeStyles((theme) => ({
  textField: {
    flexGrow: 1,
    "& .MuiFilledInput-root": {
      borderTopRightRadius: 0,
    },
  },
  button: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  resultsContainer: {
    display: "flex",
    alignItems: "center",
    margin: 0,
    overflowX: "scroll",
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    "& .MuiCard-root": {
      minWidth: "40%",
      marginLeft: theme.spacing(1),
    },
    "&::after": {
      content: "''",
      minWidth: theme.spacing(1),
      height: "1px",
    },
  },
  suggestionsContainerExtendedWidth: {
    width: theme.breakpoints.values.sm + 60,
    position: "relative",
    left:
      -theme.spacing(3) + // padding-start of the containing card
      (-24 * 2 - // horizontal padding of the main container
        60) / // this.width - containingCard.width
        2,
  },
}));

export enum Step1ResultType {
  useExisting,
  createNew,
}

type Step1Result =
  | {
      type: Step1ResultType.useExisting;
      recommendation: ServerRecommendation;
    }
  | {
      type: Step1ResultType.createNew;
      name: string;
    };

interface Step1Props {
  onResult: (result: Step1Result) => void;
}

const Step1 = ({ onResult }: Step1Props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState<ServerRecommendation[] | null>(
    null
  );

  const resultsShouldOverflowContainer =
    useMediaQuery(theme.breakpoints.up("sm")) &&
    suggestions &&
    suggestions.length > 2;

  const fetchSuggestions = () => {
    const searchQuery = {
      freeText: name,
    };

    server
      .fetchRecommendations(searchQuery)
      .then((suggestions) => {
        if (suggestions.length === 0)
          onResult({
            type: Step1ResultType.createNew,
            name,
          });
        else setSuggestions(suggestions);
      })
      .catch(console.error);
  };

  return (
    <Box>
      <Box mb={1}>
        <Typography variant="body1">
          מה השם של העסק או נותן.ת השירות?
        </Typography>
      </Box>
      <Box display="flex" mb={2}>
        <TextField
          fullWidth
          label="שם"
          value={name}
          className={classes.textField}
          onChange={(event) => setName(event.target.value)}
          color="secondary"
          variant="filled"
          placeholder="ישראל ישראלית"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleTwoTone />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          disableElevation
          onClick={fetchSuggestions}
          disabled={isBlankOrEmpty(name)}
        >
          הבא
        </Button>
      </Box>

      {suggestions && (
        <Fragment>
          <Box mt={3}>
            <Typography variant="body1">
              {suggestions.length > 1
                ? "יכול להיות שמה שחיפשת זה את אחד מהעסקים האלה?"
                : "יכול להיות שזה אותו העסק?"}
            </Typography>
          </Box>
          <Paper
            className={
              resultsShouldOverflowContainer
                ? classes.suggestionsContainerExtendedWidth
                : ""
            }
            elevation={resultsShouldOverflowContainer ? 1 : 0}
          >
            <RecommendationsContainer
              recommendations={suggestions}
              buttons={(recommendation) => (
                <ContainedPrimaryButton
                  size="small"
                  onClick={() =>
                    onResult({
                      type: Step1ResultType.useExisting,
                      recommendation,
                    })
                  }
                >
                  כן, זה אותו המקום!
                </ContainedPrimaryButton>
              )}
              containerProps={{ className: classes.resultsContainer }}
              disableElevation
              rating={false}
            />
          </Paper>
          <Box mt={3} mb={2}>
            <ContainedPrimaryButton
              onClick={() =>
                onResult({
                  type: Step1ResultType.createNew,
                  name,
                })
              }
              fullWidth
              variant="contained"
            >
              האמת? לא. בואו נמשיך
            </ContainedPrimaryButton>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

export default Step1;
