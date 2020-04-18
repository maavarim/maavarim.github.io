import User from "./User";

export interface ReviewContent {
  rating: number;
  moreDetails: string;
}

interface Review {
  author: User;
  content: ReviewContent;
}

export default Review;
