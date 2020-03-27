import React from "react";
import { withStyles } from "@material-ui/core";
import { Rating as MuiRating, RatingProps } from "@material-ui/lab";
import { StarBorder, StarTwoTone } from "@material-ui/icons";

const Rating = withStyles({
  iconFilled: {
    color: "#8e24aa"
  },
  iconHover: {
    color: "#a739c6"
  }
})(MuiRating);

export default (props: RatingProps) => (
  <Rating
    precision={0.5}
    emptyIcon={<StarBorder fontSize="inherit" />}
    icon={<StarTwoTone fontSize="inherit" />}
    color="secondary"
    {...props}
  />
);
