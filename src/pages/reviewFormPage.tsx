import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie, getTVSerie } from "../api/tmdb-api";
import ReviewForm from "../components/reviewForm";
import Spinner from "../components/spinner";
import { Movie, TVSerie } from "../types/interfaces";

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery<Movie | TVSerie, Error>([mediaType, mediaId], () =>
    fetchMedia(mediaId)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error?.message}</h1>;
  }

  if (!media) {
    return <h1>Media not found</h1>;
  }

  return <ReviewForm media={media} mediaType={mediaType} />;
};

export default ReviewFormPage;
