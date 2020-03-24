import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  Equals,
  IsArray,
  ArrayNotEmpty
} from "class-validator";
import Recommendation from "../types/Recommendation";

class CreateRecommendationDTO implements Recommendation {
  @IsString()
  @IsNotEmpty()
  authorEmail: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  rating: number;

  phone?: string;
  location?: string;
  additionalInfo?: string;

  @IsArray() @ArrayNotEmpty() area: string[] = [];
  @IsArray() @ArrayNotEmpty() expertise: string[] = [];
  @IsArray() @ArrayNotEmpty() gender: string[] = [];
  @IsArray() @ArrayNotEmpty() healthCare: string[] = [];
  @IsArray() @ArrayNotEmpty() language: string[] = [];
  @IsArray() @ArrayNotEmpty() profession: string[] = [];

  @IsBoolean()
  @Equals(false)
  accepted: boolean;
}

export default CreateRecommendationDTO;
