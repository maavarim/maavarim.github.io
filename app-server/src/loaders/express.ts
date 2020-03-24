import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import RecommendationService from "../services/RecommendationService";
import parseQueryMiddleware from "../middleware/parseQuery";
import errorMiddleware from "../middleware/error";
import validationMiddleware from "../middleware/validation";
import CreateRecommendationDTO from "../dtos/CreateRecommendation";
import FindRecommendationDTO from "../dtos/FindRecommendation";
import { requireAuthenticated } from "../middleware/auth";
import HttpException from "../exceptions/HttpException";

const initializeRoutes = (app: express.Application) => {
  app.post(
    "/recommendation/",
    requireAuthenticated,
    validationMiddleware(CreateRecommendationDTO),
    async (req, res) => {
      const recommendation: CreateRecommendationDTO = req.body;
      if (recommendation.authorEmail !== req.userInfo.email) {
        throw new HttpException(
          400,
          "Recommendation.authorEmail doesn't match logged in user's email."
        );
      }

      const newRecord = await RecommendationService.create(recommendation);
      return res.json({ recommendation: newRecord });
    }
  );

  app.get(
    "/recommendation/",
    validationMiddleware(FindRecommendationDTO),
    async (req, res) => {
      const filters: FindRecommendationDTO = req.query;
      const recommendations = await RecommendationService.find(filters);
      return res.json({ recommendations });
    }
  );
};

const initializeBodyParsers = (app: express.Application) => {
  app.use(parseQueryMiddleware());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
};

export default async ({ app }: { app: express.Application }) => {
  app.use(cors());
  initializeBodyParsers(app);
  initializeRoutes(app);
  // errorMiddleware should also handle errors that were raised by routes, so we'll write it in the end.
  app.use(errorMiddleware);

  return app;
};
