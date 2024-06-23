import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMoviesUpcoming } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../contexts/moviesContext";

const UpcomingMoviesPage: React.FC = () => {
  const {
    data: movies,
    error,
    isLoading,
    isError,
  } = useQuery<BaseMovieProps[], Error>("upcomingMovies", getMoviesUpcoming);

  const { addToMustWatch } = useContext(MoviesContext); // Assuming you have this context function for 'Must watch' list

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies || []}
      action={(movie: BaseMovieProps) => {
        return <PlaylistAddIcon onClick={() => addToMustWatch(movie.id)} />;
      }}
    />
  );
};

export default UpcomingMoviesPage;
