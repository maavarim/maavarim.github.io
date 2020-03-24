import { IsString, IsArray, IsOptional } from "class-validator";

class FindRecommendationDTO {
  @IsString()
  freeText: string;

  @IsOptional() @IsArray() area?: string[];
  @IsOptional() @IsArray() expertise?: string[];
  @IsOptional() @IsArray() gender?: string[];
  @IsOptional() @IsArray() healthCare?: string[];
  @IsOptional() @IsArray() language?: string[];
  @IsOptional() @IsArray() profession?: string[];
}

export default FindRecommendationDTO;
