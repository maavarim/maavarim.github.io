import * as mongoose from "mongoose";
import config from "../config/";

export default async (): Promise<any> => {
  const uri = `mongodb+srv://${config.mongoDB.username}:${encodeURIComponent(
    config.mongoDB.password
  )}@${config.mongoDB.clusterUrl}/${
    config.mongoDB.databaseName
  }?retryWrites=true&w=majority`;

  const connection = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return connection.connection.db;
};
