import expressLoader from "./express";
import firebaseLoader from "./firebase";
import { Express } from "express";

export const init = async (expressApp: Express) => {
  await firebaseLoader();
  console.log("Firebase Intialized");
  await expressLoader({ app: expressApp });
  console.log("Express Intialized");
};
