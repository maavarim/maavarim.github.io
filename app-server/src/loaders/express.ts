import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import parseQueryMiddleware from "../middleware/parseQuery";
import errorMiddleware from "../middleware/error";
import validationMiddleware from "../middleware/validation";
import { requireAuthenticated } from "../middleware/auth";

import { BusinessProposalType } from "../types/Proposal";

import HttpException from "../exceptions/HttpException";

import ReviewService from "../services/ReviewService";
import BusinessService from "../services/BusinessService";

import ProposalDTO from "../dtos/Proposal";
import FindBusinessesDTO from "../dtos/FindBusinesses";

const initializeRoutes = (app: express.Application) => {
  app.post(
    "/propose/",
    requireAuthenticated,
    validationMiddleware(ProposalDTO),
    async (req, res) => {
      const proposal: ProposalDTO = req.body;

      if (proposal.author.email !== req.userInfo.email) {
        throw new HttpException(
          400,
          "Recommendation.authorEmail doesn't match logged in user's email."
        );
      }

      switch (proposal.business.type) {
        case BusinessProposalType.useExisting:
          break;
        case BusinessProposalType.createNew:
          BusinessService.proposeNew({
            author: proposal.author,
            businessName: proposal.business.business.name,
            businessInfo: proposal.business.business.info,
          });
          break;
        case BusinessProposalType.alterExisting:
          BusinessService.proposeAltering({
            author: proposal.author,
            businessName: proposal.business.business.name,
            businessInfo: proposal.business.business.info,
          });
          break;
      }

      ReviewService.propose({
        author: proposal.author,
        businessName: proposal.business.business.name,
        review: proposal.review,
      });

      return res.json({});
    }
  );

  app.get(
    "/recommendation/",
    validationMiddleware(FindBusinessesDTO),
    async (req, res) => {
      const findRecommendationDTO: FindBusinessesDTO = req.query;
      const recommendations = await BusinessService.find(findRecommendationDTO);
      return res.json({ recommendations });
    }
  );
};

const initializeBodyParsers = (app: express.Application) => {
  app.use(parseQueryMiddleware());
  app.use(
    bodyParser.urlencoded({
      extended: true,
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
