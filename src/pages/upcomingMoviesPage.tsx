import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMoviesUpcoming } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { MoviesContext } from "../contexts/moviesContext";

const UpcomingMoviesPage: React.FC = () => {
  const {
    data: movies,
    error,
    isLoading,
    isError,
  } = useQuery<BaseMovieProps[], Error>("upcomingMovies", getMoviesUpcoming);

  const { addToFavourites } = useContext(MoviesContext);

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
        return (
          <AddToFavouritesIcon
            movie={movie}
            onClick={() => addToFavourites(movie.id)}
          />
        );
      }}
    />
  );
};

export default UpcomingMoviesPage;
