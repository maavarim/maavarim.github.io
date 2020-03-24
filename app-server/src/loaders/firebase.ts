import * as admin from "firebase-admin";
import config from "../config/";

export default async (): Promise<any> => {
  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "maavarimfriendly",
      privateKey: config.firebase.privateKey,
      clientEmail: config.firebase.clientEmail
    }),
    databaseURL: "https://maavarimfriendly.firebaseio.com"
  });
};
