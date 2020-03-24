import React, { useState } from "react";
import RecommendationBaseDetails from "../types/Recommendation";

const AddRecommendationDialog = () => {
  const [
    newRecommendation,
    setNewRecommendation
  ] = useState<RecommendationBaseDetails | null>(null);


};

export default AddRecommendationDialog;
