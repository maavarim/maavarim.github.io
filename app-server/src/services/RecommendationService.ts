import RecommendationModel from "../model/Recommendation";
import { FilterQuery } from "mongoose";
import Recommendation from "../types/Recommendation";
import FindRecommendationDTO from "../dtos/FindRecommendation";
import { classToPlain } from "class-transformer";

export default class RecommendationService {
  static async create(recommendation: Recommendation): Promise<any> {
    const recommendationRecord = await RecommendationModel.create(
      recommendation
    );
    return { record: recommendationRecord };
  }

  static find(
    findRecommendationDTO: FindRecommendationDTO
  ): Promise<Recommendation[]> {
    const { freeText, ...filters } = findRecommendationDTO;
    let query: FilterQuery<Recommendation> = {
      accepted: true
    };

    if (freeText && freeText.trim() !== "") {
      query.name = { $regex: freeText };
    } else {
      const inIfNotEmpty = (selectedOptions: string[]) =>
        selectedOptions.length > 0 ? { $in: selectedOptions } : {};

      Object.entries(filters).forEach(
        ([filterName, selectedOptions]: [string, string[]]) => {
          query[filterName] = inIfNotEmpty(selectedOptions);
        }
      );
    }

    return new Promise((resolve, reject) => {
      RecommendationModel.find(query, (error, recommendations) => {
        if (error) reject(error);
        else resolve(recommendations);
      });
    });
  }
}
