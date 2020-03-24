require("dotenv").config();

export default {
  port: process.env.PORT,
  mongoDB: {
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    clusterUrl: process.env.MONGODB_CLUSTER_URL,
    databaseName: "FrienedlyApp"
  },
  firebase: {
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  }
};
