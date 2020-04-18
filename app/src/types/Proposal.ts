import User from "./User";
import { ReviewContent } from "./Review";
import Business from "./Business";

export enum BusinessResultType {
  useExisting = "useExisting",
  alterExisting = "alterExisting",
  createNew = "createNew",
}

export type BusinessResult = {
  type: BusinessResultType;
  business: Business;
};

export type Proposal = {
  author: User;
  business: BusinessResult;
  review: ReviewContent;
};
