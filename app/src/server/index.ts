import { Config } from "../utils/Config";
import { fetchAuthenticated } from "../firebase/auth";
import Business from "../types/Business";
import { Proposal } from "../types/Proposal";

import fetchBusinessesMockData from "./mock-data/fetchBusinesses";

const apiBase = Config.debug
  ? "http://localhost:5000/"
  : "https://maavarim.herokuapp.com/";

const get = (path: string, params: any = {}, auth: boolean = true) => {
  const url = new URL(apiBase + path);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, JSON.stringify(params[key]))
  );

  return (auth ? fetchAuthenticated : fetch)(url.href, {
    method: "get",
  });
};

const post = (path: string, body: any = {}, auth: boolean = true) =>
  (auth ? fetchAuthenticated : fetch)(apiBase + path, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

async function propose(proposal: Proposal): Promise<void> {
  return post("propose/", proposal).then(({ status }) => {
    if (status !== 200) throw new Error();
  });
}

async function fetchBusinesses(query: any): Promise<Business[]> {
  if (fetchBusinessesMockData) {
    return fetchBusinessesMockData(query);
  }

  const jsonRes = await (await get("recommendation/", query, false)).json();
  return jsonRes["recommendations"] as Business[];
}

const server = {
  propose,
  fetchBusinesses,
};

export default server;
