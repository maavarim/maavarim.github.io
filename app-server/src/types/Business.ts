import Review from "./Review";

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

export default Business;
