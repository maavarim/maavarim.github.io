import React, { Fragment, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import Step1, { Step1ResultType } from "./Step1";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Business from "../../types/Business";
import { requireAuthenticated } from "../../hocs/requiredAuthenticated";
import { Proposal, BusinessResult } from "../../types/Proposal";
import Step2 from "./Step2";
import server from "../../server";

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
  return ["מה השם?", "פרטים נוספים", "דירוג", "אישור ושליחה"];
}

const steps = getSteps();

const AddRecommendationScreen = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Step 1 result
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [existingBusiness, setExistingBusiness] = useState<Business | null>(
    null
  );

  // Step 2 result
  const [businessResult, setBusinessResult] = useState<BusinessResult | null>(
    null
  );

  // Step 3 result
  const [rating, setRating] = useState<number | null>(null);
  const [moreDetails, setMoreDetails] = useState<string>("");

  const [sent, setSent] = useState(false);
  const [sentSuccessfully, setSentSuccessfully] = useState(false);

  const send = (proposal: Proposal) => {
    server
      .propose(proposal)
      .then(() => {
        setSent(true);
        setSentSuccessfully(true);
      })
      .catch(() => {
        setSent(true);
        setSentSuccessfully(false);
      });
  };

  return (
    <Fragment>
      <Card style={{ overflow: "visible" }}>
        <CardContent style={{ padding: 0 }}>
          <Box p={3}>
            <div className={classes.root}>
              {activeStep < steps.length && (
                <Box mb={2}>
                  <Typography variant="h5" color="textPrimary">
                    הוספת מידע - {steps[activeStep]}
                  </Typography>
                </Box>
              )}
              <Box>
                {activeStep === 0 && (
                  <Step1
                    onResult={(result) => {
                      switch (result.type) {
                        case Step1ResultType.createNew:
                          setBusinessName(result.businessName);
                          return handleNext();
                        case Step1ResultType.useExisting:
                          setExistingBusiness(result.business);
                          return handleNext();
                      }
                    }}
                  />
                )}
                {activeStep === 1 && (
                  <Step2
                    name={businessName}
                    existingBusiness={existingBusiness}
                    handleBack={handleBack}
                    onResult={(result) => {
                      setBusinessResult(result);
                      handleNext();
                    }}
                  />
                )}
                {activeStep === 2 && (
                  <Step3
                    rating={rating}
                    setRating={setRating}
                    moreDetails={moreDetails}
                    setMoreDetails={setMoreDetails}
                    handleBack={handleBack}
                    handleNext={handleNext}
                  />
                )}
                {activeStep === 3 &&
                  businessResult !== null &&
                  rating !== null && (
                    <Step4
                      businessResult={businessResult}
                      rating={rating}
                      moreDetails={moreDetails}
                      handleBack={handleBack}
                      handleNext={handleNext}
                      onResult={(proposal) => {
                        handleNext();
                        send(proposal);
                      }}
                    />
                  )}
                {activeStep === steps.length && (
                  <Box mb={2}>
                    <Typography variant="h5" color="textPrimary" gutterBottom>
                      תודה שתרמת למאגר שלנו!
                    </Typography>
                    <Typography>
                      צוות מעברים יבחן את ההצעה שלך ויוסיף אותה בקרוב.&nbsp;
                      <span role="img" aria-label="לב ירוק">
                        💚
                      </span>
                    </Typography>
                  </Box>
                )}
              </Box>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </Box>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default requireAuthenticated(AddRecommendationScreen);
