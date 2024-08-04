import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMediaPage";
import MovieReview from "../components/mediaReview";

const MovieReviewPage: React.FC = () => {
  const {
    state: { movie, review },
  } = useLocation();
  return (
    <PageTemplate movie={movie}>
      <MovieReview {...review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
