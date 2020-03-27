import * as mongoose from "mongoose";
import Recommendation from "../types/Recommendation";

export class RecommendationDocument extends mongoose.Document
  implements Recommendation {
  authorEmail: string;
  name: string;
  rating: number;
  phone?: string;
  location?: string;
  additionalInfo?: string;
  createdAt: Date;

  area: string[];
  expertise: string[];
  gender: string[];
  healthCare: string[];
  language: string[];
  profession: string[];

  accepted: boolean;
}

const recommendationSchema = new mongoose.Schema(
  {
    authorEmail: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      required: true
    },
    createdAt: Date,
    phone: String,
    location: String,
    additionalInfo: String,

    area: {
      type: [String],
      required: true
    },
    expertise: {
      type: [String],
      required: true
    },
    gender: {
      type: [String],
      required: true
    },
    healthCare: {
      type: [String],
      required: true
    },
    language: {
      type: [String],
      required: true
    },
    profession: {
      type: [String],
      required: true
    },

    accepted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<RecommendationDocument>(
  "Recommendation",
  recommendationSchema
);
