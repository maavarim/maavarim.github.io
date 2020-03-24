export default interface Recommendation {
  authorEmail: string;
  name: string;
  rating: number;
  phone?: string;
  location?: string;
  additionalInfo?: string;

  area: string[];
  expertise: string[];
  gender: string[];
  healthCare: string[];
  language: string[];
  profession: string[];

  accepted: boolean;
}
