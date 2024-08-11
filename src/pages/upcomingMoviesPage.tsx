import React from "react";
import PageTemplate from "../components/templateMediaListPage";
import { getMoviesUpcoming } from "../api/tmdb-api";
import {
  Movie,
  Media,
  DiscoverResponse,
  SortOption,
} from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import useFiltering from "../hooks/useFiltering";
import MediaFilterUI from "../components/mediaFilterUI";
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

const initialSortOption: SortOption = {
  name: "title",
  direction: "asc",
};

const UpcomingMoviesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<
    DiscoverResponse<Movie>,
    Error
  >("upcomingMovies", getMoviesUpcoming);

  const {
    filterValues,
    setFilterValues,
    sortOption,
    setSortOption,
    applyFilterAndSort,
  } = useFiltering([titleFiltering, genreFiltering], initialSortOption);

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

  const changeSortOption = (name: string, direction: "asc" | "desc") => {
    setSortOption({ name, direction });
  };

  const movies = data ? data.results : [];
  const displayedMovies = applyFilterAndSort(movies);

  const action = (movie: Media) => {
    return <AddToFavouritesIcon item={movie as Movie} />;
  };

  return (
    <>
      <PageTemplate
        title='Upcoming Movies'
        media={displayedMovies}
        action={action}
      />
      <MediaFilterUI
        onFilterValuesChange={changeFilterValues}
        onSortOptionChange={changeSortOption}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        sortOption={sortOption}
      />
    </>
  );
};

export default UpcomingMoviesPage;
