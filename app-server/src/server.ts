import * as express from "express";
import * as cors from "cors";
import log from "./log";
import { requireAuthenticated, requireStaff } from "./middleware/auth";

const app = express();
app.use(cors());

app.post("/testLogin", requireAuthenticated, async (req, res) => {
  return res.json(JSON.stringify({ email: req.userInfo.email })).send();
});

app.post("/testStaff", requireStaff, async (req, res) => {
  return res
    .json(JSON.stringify({ email: req.userInfo.email, isStaff: true }))
    .send();
});

app.listen(process.env.PORT || 5000, () => {
  log.info("app running");
});
