import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import { getMovieImages } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../../types/interfaces";
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

interface TemplateMoviePageProps {
  movie: MovieDetailsProps;
  children: React.ReactElement;
}

const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({
  movie,
  children,
}) => {
  const { error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["images", movie.id],
    () => getMovieImages(movie.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <MovieHeader {...movie} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          {movie.poster_path && (
            <div style={styles.gridListTile}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`${movie.title} Cover`}
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

export default TemplateMoviePage;
