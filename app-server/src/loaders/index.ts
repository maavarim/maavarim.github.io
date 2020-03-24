import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import firebaseLoader from "./firebase";
import { Express } from "express";

export const init = async (expressApp: Express) => {
  await mongooseLoader();
  console.log("MongoDB Intialized");
  await firebaseLoader();
  console.log("Firebase Intialized");
  await expressLoader({ app: expressApp });
  console.log("Express Intialized");
};
