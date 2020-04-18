import React, { Fragment } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { ContainedPrimaryButton } from "../../components/StyledButtons";
import BusinessView from "../../components/BusinessView";
import { Proposal, BusinessResult, BusinessResultType } from "../../types/Proposal";
import User from "../../types/User";
import { withAuthenticated } from "../../hocs/requiredAuthenticated";

interface Step4Props {
  businessResult: BusinessResult;
  rating: number;
  moreDetails: string;
  handleBack: () => void;
  handleNext: () => void;
  onResult: (proposal: Proposal) => void;
  loggedInUser: User;
}

const Step4 = ({
  businessResult,
  rating,
  moreDetails,
  handleBack,
  onResult,
  loggedInUser,
}: Step4Props) => {
  const ratingText = (
    <Fragment>
      והדירוג שנתת הוא <b>{rating} כוכבים</b>
      {moreDetails ? (
        <Fragment>
          ,
          <br />
          בתוספת ההערה:
          <br /> {moreDetails}
        </Fragment>
      ) : (
        "."
      )}
    </Fragment>
  );

  let changeDescription: JSX.Element;
  switch (businessResult.type) {
    case BusinessResultType.createNew:
      changeDescription = (
        <Fragment>
          <Typography>זה העסק שרצית להוסיף:</Typography>
          <BusinessView
            business={businessResult.business}
            rating={false}
            detailed
          />
        </Fragment>
      );
      break;
    case BusinessResultType.useExisting:
      changeDescription = (
        <Fragment>
          <Typography>זה העסק שרצית לדרג:</Typography>
          <BusinessView
            business={businessResult.business}
            rating={false}
            detailed
          />
        </Fragment>
      );
      break;
    case BusinessResultType.alterExisting:
      changeDescription = (
        <Fragment>
          <Typography>
            בחרת לערוך את המידע על העסק <b>{businessResult.business.name}</b>,
            לפרטים הבאים:
          </Typography>
          <BusinessView
            business={businessResult.business}
            rating={false}
            detailed
          />
        </Fragment>
      );
      break;
  }

  const send = () => {
    let result: Proposal = {
      author: loggedInUser,
      business: businessResult,
      review: {
        rating,
        moreDetails,
      },
    };
    onResult(result);
  };

  return (
    <Fragment>
      <Typography>
        לפני שנשלח את המידע, בואו נעבור פעם אחרונה על הפרטים.
        <br />
        אחרי השליחה אנחנו נבחן את ההצעה שלך לשיפור המידע, ונכניס את הפרטים
        הנכונים.&nbsp;😇
      </Typography>
      {changeDescription}
      <Typography>{ratingText}</Typography>
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="outlined" onClick={handleBack}>
          חזרה לדירוג
        </Button>

        <ContainedPrimaryButton variant="contained" onClick={send}>
          כן, הכל פה נכון, בואו נשלח!
        </ContainedPrimaryButton>
      </Box>
    </Fragment>
  );
};

export default withAuthenticated(Step4);
