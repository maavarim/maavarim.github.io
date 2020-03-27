import Recommendation from "./Recommendation";

interface ServerRecommendation extends Recommendation {
  _id: string;
  createdAt: Date;
}

export default ServerRecommendation;
