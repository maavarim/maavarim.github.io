import React, { Fragment, useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import User from "../../types/User";
import {
  Box,
  Snackbar,
  ContainerProps,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import MediaQueryBreakpoint from "../../types/MediaQueryBreakpoint";
import Step1, { Step1ResultType } from "./Step1";
import Step2, { Step2Result } from "./Step2";
import Step3 from "./Step3";
import ServerRecommendation from "../../types/ServerRecommendation";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  })
);

function getSteps() {
  return ["מה השם?", "פרטים נוספים", "תגיות למיניהן"];
}

interface AddRecommendationScreenProps {
  loggedInUser: User;
}

const AddRecommendationScreen = ({
  loggedInUser,
  ...props
}: AddRecommendationScreenProps & ContainerProps) => {
  const theme = useTheme();

  const [maxWidth, setMaxWidth] = useState<MediaQueryBreakpoint>("xs");
  const [isErrorSnackBarOpened, setIsErrorSnackBarOpened] = useState(false);
  const [isSuccessSnackBarOpened, setIsSuccessSnackBarOpened] = useState(false);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Step 1 result
  const [name, setName] = useState<string | null>(null);
  const [
    existingRecommendation,
    setExistingRecommendation,
  ] = useState<ServerRecommendation | null>(null);

  // Step 2 result
  const [step2Result, setStep2Result] = useState<Step2Result | null>(null);

  // Step 3 result
  const [rating, setRating] = useState<number | null>(null);
  const [moreDetails, setMoreDetails] = useState<string | null>(null);

  return (
    <Fragment>
      <Card style={{ overflow: "visible" }}>
        <CardContent style={{ padding: 0 }}>
          <Box p={3}>
            <div className={classes.root}>
              <Box mb={2}>
                <Typography variant="h5" color="textPrimary">
                  הוספת מידע
                </Typography>
              </Box>

              <Box>
                {activeStep === 0 && (
                  <Step1
                    onResult={(result) => {
                      switch (result.type) {
                        case Step1ResultType.createNew:
                          setName(result.name);
                          return handleNext();
                        case Step1ResultType.useExisting:
                          setExistingRecommendation(result.recommendation);
                          return handleNext();
                      }
                    }}
                  />
                )}
                {activeStep === 1 && (
                  <Step2
                    loggedInUser={loggedInUser}
                    name={name}
                    existingRecommendation={existingRecommendation}
                    onResult={setStep2Result}
                  />
                )}
                {activeStep === 2 && (
                  <Step3
                    setRating={setRating}
                    setMoreDetails={setMoreDetails}
                  />
                )}
              </Box>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <Typography>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} className={classes.button}>
                    Reset
                  </Button>
                </Paper>
              )}
            </div>
          </Box>
        </CardContent>
      </Card>
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

export default AddRecommendationScreen;
