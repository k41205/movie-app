import React, { useContext, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMostPopularMovies } from "../api/tmdb-api";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI from "../components/movieFilterUI";
import { MoviesContext } from "../contexts/moviesContext";
import { genreFilter, titleFilter } from "../util";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const MostPopularMoviesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    "mostPopularMovies",
    getMostPopularMovies
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  const { mustWatch, addToMustWatch } = useContext(MoviesContext);

  useEffect(() => {
    console.log("Must Watch List:", mustWatch);
  }, [mustWatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title='Most Popular Movies'
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          const isMustWatch = mustWatch.includes(movie.id);
          return (
            <div>
              <PlaylistAddIcon
                onClick={() => {
                  addToMustWatch(movie);
                }}
                style={{ color: isMustWatch ? "red" : "inherit" }}
              />
            </div>
          );
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default MostPopularMoviesPage;
