import User from "./User";
import { ReviewContent } from "./Review";
import Business from "./Business";

export enum BusinessProposalType {
  useExisting = "useExisting",
  alterExisting = "alterExisting",
  createNew = "createNew",
}

export type BusinessProposal = {
  type: BusinessProposalType;
  business: Business;
};

export type Proposal = {
  author: User;
  business: BusinessProposal;
  review: ReviewContent;
};
