import React from "react";
import MediaHeader from "../headerMedia";
import Grid from "@mui/material/Grid";
import { getMediaImages } from "../../api/tmdb-api";
import {
  MovieImage,
  MediaDetailsProps,
  TemplateMediaPageProps,
  Movie,
  TVSerie,
  Actor,
} from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../spinner";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridListTile: {
    width: 450,
    height: "100vh",
  },
  poster: {
    maxWidth: "100%",
    height: "auto",
  },
};

const isMovie = (media: MediaDetailsProps): media is Movie => {
  return (media as Movie).runtime !== undefined;
};

const isTVSerie = (media: MediaDetailsProps): media is TVSerie => {
  return (media as TVSerie).number_of_episodes !== undefined;
};

const isActor = (media: MediaDetailsProps): media is Actor => {
  return (media as Actor).known_for_department === "Acting";
};

const determineMediaType = (
  media: MediaDetailsProps
): "movie" | "tv" | "actor" => {
  if (isMovie(media)) {
    return "movie";
  } else if (isTVSerie(media)) {
    return "tv";
  } else if (isActor(media)) {
    return "actor";
  } else {
    throw new Error("Unknown media type");
  }
};

const TemplateMediaPage: React.FC<TemplateMediaPageProps> = ({
  media,
  children,
}) => {
  const mediaType = determineMediaType(media);

  const { error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["images", media.id],
    () => getMediaImages(media.id, mediaType)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <MediaHeader {...media} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          {(media.poster_path || media.profile_path) && (
            <div style={styles.gridListTile}>
              <img
                src={`https://image.tmdb.org/t/p/w500${
                  media.poster_path || media.profile_path
                }`}
                alt={
                  isMovie(media)
                    ? `${media.title} Cover`
                    : isTVSerie(media)
                      ? `${media.name} Cover`
                      : `${media.name} Portrait`
                }
                style={styles.poster}
              />
            </div>
          )}
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMediaPage;
