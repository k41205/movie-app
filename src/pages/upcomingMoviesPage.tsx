import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMoviesUpcoming } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";

const UpcomingMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);
  const favourites = movies.filter((m) => m.favourite);
  console.log(movies);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  const addToFavourites = (movieId: number) => {
    const updatedMovies = movies.map((m: BaseMovieProps) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getMoviesUpcoming().then((movies) => {
      setMovies(movies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      selectFavourite={addToFavourites}
    />
  );
};
export default UpcomingMoviesPage;
