import FindRecommendationDTO from "../dtos/FindBusinesses";
import { BusinessInfoDTO } from "../dtos/Proposal";
import Business from "Business";
import User from "../types/User";

type ProposeProps = {
  author: User;
  businessName: string;
  businessInfo: BusinessInfoDTO;
};

export default class BusinessService {
  static async proposeNew({
    author,
    businessName,
    businessInfo,
  }: ProposeProps): Promise<any> {
    console.log(JSON.stringify(author));
    console.log(businessName);
    console.log(JSON.stringify(businessInfo));
    // TODO: implementation

    return {};
  }
  static async proposeAltering({
    author,
    businessName,
    businessInfo: changes,
  }: ProposeProps): Promise<any> {
    console.log(JSON.stringify(author));
    console.log(businessName);
    console.log(JSON.stringify(changes));
    // TODO: implementation

    return {};
  }

  static find(
    findRecommendationDTO: FindRecommendationDTO
  ): Promise<Business[]> {
    // TODO: implementation
    return Promise.resolve([]);
  }
}
