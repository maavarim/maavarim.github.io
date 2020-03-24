import * as express from "express";
import * as loaders from "./loaders";
import config from "./config";

async function startServer() {
  const app = express();
  await loaders.init(app);

  const port = config.port || '5000';
  app.listen(port, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server is running in port ${port}.`);
  });
}

startServer();
