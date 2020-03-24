import User from "./User";

interface Recommendation {
  author: User;
  name: string;
  rating: number;
  phone?: string;
  city?: string;
  fullAddress?: string;
  additionalInfo?: string;
  accepted: boolean;
}

export default Recommendation;