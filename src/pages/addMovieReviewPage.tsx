import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { MovieDetailsProps } from "../types/interfaces";

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const WriteReviewPage: React.FC = () => {
  const query = useQueryParams();
  const mediaId = query.get("mediaId");

  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery<MovieDetailsProps, Error>(["movie", mediaId], () =>
    getMovie(mediaId!)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <ReviewForm {...movie} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie review details</p>
      )}
    </>
  );
};

export default WriteReviewPage;
