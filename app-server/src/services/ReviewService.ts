import User from "../types/User";
import { ReviewContentDTO } from "../dtos/Proposal";

type ProposeProps = {
  author: User;
  businessName: string;
  review: ReviewContentDTO;
};

export default class ReviewService {
  static async propose({
    author,
    businessName,
    review,
  }: ProposeProps): Promise<any> {
    // TODO: implementation
    console.log(JSON.stringify(author));
    console.log(businessName);
    console.log(JSON.stringify(review));

    return {};
  }
}
