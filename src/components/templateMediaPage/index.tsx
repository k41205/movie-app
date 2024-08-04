import React from "react";
import MediaHeader from "../headerMedia";
import Grid from "@mui/material/Grid";
import { getMediaImages } from "../../api/tmdb-api";
import {
  MovieImage,
  MediaDetailsProps,
  TemplateMediaPageProps,
  Movie,
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

const TemplateMediaPage: React.FC<TemplateMediaPageProps> = ({
  media,
  children,
}) => {
  const mediaType = isMovie(media) ? "movie" : "tv";

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
          {media.poster_path && (
            <div style={styles.gridListTile}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                alt={
                  isMovie(media)
                    ? `${media.title} Cover`
                    : `${media.name} Cover`
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
