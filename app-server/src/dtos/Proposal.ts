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
  Max,
  ValidateNested,
  IsIn,
} from "class-validator";
import UserDTO from "./User";
import Business, { BusinessInfo } from "../types/Business";
import { ReviewContent } from "../types/Review";
import {
  BusinessProposal,
  BusinessProposalType,
  Proposal,
} from "../types/Proposal";

export class BusinessInfoDTO implements BusinessInfo {
  @IsOptional()
  @IsString()
  phone?: string;
  @IsOptional()
  @IsString()
  location?: string;

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
}

export class BusinessDTO implements Business {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  info: BusinessInfoDTO;
}

export class BusinessProposalDTO implements BusinessProposal {
  @IsIn([
    BusinessProposalType.useExisting,
    BusinessProposalType.alterExisting,
    BusinessProposalType.createNew,
  ])
  type: BusinessProposalType;

  @ValidateNested()
  @IsNotEmpty()
  business: BusinessDTO;
}

export class ReviewContentDTO implements ReviewContent {
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsString()
  moreDetails: string;
}

class ProposalDTO implements Proposal {
  @ValidateNested()
  author: UserDTO;

  @ValidateNested()
  business: BusinessProposalDTO;

  @ValidateNested()
  review: ReviewContentDTO;
}

export default ProposalDTO;
