import * as express from "express";
import { objectMap } from "../utils";

function parseQueryMiddleware(): express.RequestHandler {
  return (req, _, next) => {
    if (req.method === "GET") {
      req.query = objectMap(req.query, JSON.parse);
    }
    next();
  };
}

export default parseQueryMiddleware;
