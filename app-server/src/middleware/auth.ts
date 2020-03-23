import { RequestHandler } from "express";
import admin from "../config/firebase";

const getAuthToken: RequestHandler = (req, _, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  }
  next();
};

export const requireAuthenticated: RequestHandler = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      if (userInfo.email_verified && userInfo.email) {
        req.userInfo = { email: userInfo.email as string };
        return next();
      } else {
        return res
          .status(401)
          .send({ error: "You are not authorized to make this request" });
      }
    } catch (e) {
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
};

export const requireStaff: RequestHandler = (req, res, next) => {
  requireAuthenticated(req, res, () => {
    if (
      req.userInfo !== undefined &&
      req.userInfo.email.endsWith("@maavarim.org")
    ) {
      return next();
    } else {
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
};
