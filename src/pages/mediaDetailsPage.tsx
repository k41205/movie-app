import React from "react";
import { useParams } from "react-router-dom";
import MediaDetails from "../components/mediaDetails";
import PageTemplate from "../components/templateMediaPage";
import { getMovie } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { MovieDetailsProps } from "../types/interfaces";

const MediaDetailsPage: React.FC = () => {
  const { id } = useParams();
  const {
    data: media,
    error,
    isLoading,
    isError,
  } = useQuery<MovieDetailsProps, Error>(["media", id], () =>
    getMovie(id || "")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {media ? (
        <>
          <PageTemplate media={media}>
            <MediaDetails {...media} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for media details</p>
      )}
    </>
  );
};

export default MediaDetailsPage;
