import { Config } from "../utils/Config";
import { fetchAuthenticated } from "../firebase/auth";
import Recommendation from "../types/Recommendation";

const apiBase = Config.debug
  ? "http://localhost:5000/"
  : "https://maavarim.herokuapp.com/";

const get = (path: string, params: any = {}, auth: boolean = true) => {
  const url = new URL(apiBase + path);
  Object.keys(params).forEach(key =>
    url.searchParams.append(key, JSON.stringify(params[key]))
  );

  return (auth ? fetchAuthenticated : fetch)(url.href, {
    method: "get"
  });
};

const post = (path: string, body: any = {}, auth: boolean = true) =>
  (auth ? fetchAuthenticated : fetch)(apiBase + path, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

export async function createRecommendation(
  recommendation: Recommendation
): Promise<void> {
  return post("recommendation/", recommendation).then(({ status }) => {
    if (status !== 200) throw new Error();
  });
}

export async function fetchRecommendations(
  query: any
): Promise<Recommendation[]> {
  const jsonRes = await (await get("recommendation/", query, false)).json();
  return jsonRes["recommendations"] as Recommendation[];
}
