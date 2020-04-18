import { IsString, IsArray, IsOptional } from "class-validator";

class FindBusinessesDTO {
  @IsString()
  freeText: string;

  @IsOptional() @IsArray() @IsString({ each: true }) area?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) expertise?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) gender?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) healthCare?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) language?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) profession?: string[];
}

export default FindBusinessesDTO;
