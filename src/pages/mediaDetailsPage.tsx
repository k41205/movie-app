import React from "react";
import { useParams, useLocation } from "react-router-dom";
import MediaDetails from "../components/mediaDetails";
import PageTemplate from "../components/templateMediaPage";
import { getMediaDetails, getMediaImages } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { MediaDetailsProps } from "../types/interfaces";

const MediaDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  let mediaType = "movie";
  if (location.pathname.includes("/movies/")) {
    mediaType = "movie";
  } else if (location.pathname.includes("/tvseries/")) {
    mediaType = "tv";
  } else if (location.pathname.includes("/actors/")) {
    mediaType = "actor";
  }

  const fetchFunction = () => getMediaDetails(id || "", mediaType);

  const {
    data: media,
    error,
    isLoading,
    isError,
  } = useQuery<MediaDetailsProps, Error>(["media", id], fetchFunction);

  const {
    data: images,
    error: imagesError,
    isLoading: isImagesLoading,
  } = useQuery(["mediaImages", id], () => getMediaImages(id || "", mediaType), {
    enabled: !!media,
  });

  if (isLoading || isImagesLoading) {
    return <Spinner />;
  }

  if (isError || imagesError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {media ? (
        <PageTemplate media={media}>
          <MediaDetails {...media} images={images} />
        </PageTemplate>
      ) : (
        <p>Waiting for media details</p>
      )}
    </>
  );
};

export default MediaDetailsPage;
