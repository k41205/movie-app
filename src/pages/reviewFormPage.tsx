import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie, getTVSerie } from "../api/tmdb-api";
import ReviewForm from "../components/reviewForm";
import Spinner from "../components/spinner";

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const ReviewFormPage: React.FC = () => {
  const query = useQueryParams();
  const mediaId = query.get("mediaId");
  const mediaType = query.get("mediaType") as "movie" | "tv";

  if (!mediaId || !mediaType) {
    return <h1>Invalid media data provided</h1>;
  }

  const fetchMedia = mediaType === "movie" ? getMovie : getTVSerie;

  const {
    data: media,
    error,
    isLoading,
    isError,
  } = useQuery([mediaType, mediaId], () => fetchMedia(mediaId));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error?.message}</h1>;
  }

  return media ? (
    <ReviewForm media={media} mediaType={mediaType} />
  ) : (
    <h1>Media not found</h1>
  );
};

export default ReviewFormPage;
