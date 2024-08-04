import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMediaPage";
import MediaReview from "../components/mediaReview";

const MediaReviewPage: React.FC = () => {
  const {
    state: { media, review },
  } = useLocation();
  return (
    <PageTemplate media={media}>
      <MediaReview {...review} />
    </PageTemplate>
  );
};

export default MediaReviewPage;
