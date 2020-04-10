import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import Rating from "../../components/Rating";
import { ContainedPrimaryButton } from "../../components/StyledButtons";

const useStyles = makeStyles({
  multilineTextFieldNoLabel: {
    "& .MuiFilledInput-multiline": {
      paddingTop: "10px",
    },
  },
});

interface Step2Props {
  rating: number | null;
  setRating: (rating: number | null) => void;
  moreDetails: string;
  setMoreDetails: (moreDetails: string) => void;
  handleBack: () => void;
  handleNext: () => void;
}
const Step3 = ({
  rating,
  setRating,
  moreDetails,
  setMoreDetails,
  handleBack,
  handleNext,
}: Step2Props) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="body1">
        עוד רגע מסיימים!
        <br />
        איך היית מדרג את החוויה הכללית אצל נותן.ת השירות?
      </Typography>
      <Box display="flex" justifyContent="center" mt={1} mb={2}>
        <Rating value={rating} onChange={(_, value) => setRating(value)} />
      </Box>

      <Typography variant="body1">
        ובנימה אישית יותר, בא לך להוסיף כמה מילים?
      </Typography>
      <Box mt={1}>
        <TextField
          className={classes.multilineTextFieldNoLabel}
          fullWidth
          multiline
          rows={4}
          variant="filled"
          value={moreDetails}
          name="more-details"
          placeholder="בוודאי!"
          onChange={(e) => setMoreDetails(e.target.value)}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="outlined" onClick={handleBack}>
          חזרה להוספת מידע
        </Button>

        <ContainedPrimaryButton
          variant="contained"
          onClick={handleNext}
          disabled={rating === null}
        >
          סיום!
        </ContainedPrimaryButton>
      </Box>
    </Box>
  );
};

export default Step3;
