import React from "react";
import { Box } from "@material-ui/core";

interface Step2Props {
  setRating: (rating: number) => void;
  setMoreDetails: (moreDetails: string) => void;
}
const Step3 = ({ setRating, setMoreDetails }: Step2Props) => <Box></Box>;

export default Step3;
