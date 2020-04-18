import Review from "./Review";
import { average } from "../utils/Array";

export interface BusinessInfo {
  phone?: string;
  location?: string;

  area: string[];
  expertise: string[];
  gender: string[];
  healthCare: string[];
  language: string[];
  profession: string[];
}

interface Business {
  name: string;
  info: BusinessInfo;
  reviews?: Review[];
}

export const averageRating = (business: Business) =>
  average((business?.reviews ?? []).map((review) => review.content.rating));

export default Business;
