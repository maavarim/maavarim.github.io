import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  Equals,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  Max
} from "class-validator";
import Recommendation from "../types/Recommendation";

class CreateRecommendationDTO implements Recommendation {
  @IsString()
  @IsNotEmpty()
  authorEmail: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  phone?: string;
  @IsOptional()
  @IsString()
  location?: string;
  @IsOptional()
  @IsString()
  additionalInfo?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  area: string[] = [];
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  expertise: string[] = [];
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  gender: string[] = [];
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  healthCare: string[] = [];
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  language: string[] = [];
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  profession: string[] = [];

  @IsBoolean()
  @Equals(false)
  accepted: boolean;
}

export default CreateRecommendationDTO;
