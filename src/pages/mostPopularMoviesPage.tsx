import React, { useState } from "react";
import PageTemplate from "../components/templateMediaListPage";
import { getMostPopularMovies } from "../api/tmdb-api";
import { Media, Movie, DiscoverResponse } from "../types/interfaces";
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

const initialSortOption = {
  name: "title",
  direction: "asc",
};

const MostPopularMoviesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery<
    DiscoverResponse<Movie>,
    Error
  >(
    ["mostPopularMovies", currentPage],
    () => getMostPopularMovies(currentPage),
    {
      keepPreviousData: true,
    }
  );

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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (data?.total_pages || 1)) {
      setCurrentPage(newPage);
    }
  };

  const movies = data ? data.results : [];
  const displayedMovies = applyFilterAndSort(movies);

  const action = (movie: Media) => {
    return <AddToFavouritesIcon item={movie as Movie} />;
  };

  return (
    <>
      <PageTemplate
        title='Most Popular Movies'
        media={displayedMovies}
        action={action}
        page={currentPage}
        totalPages={data?.total_pages || 1}
        onPageChange={handlePageChange}
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

export default MostPopularMoviesPage;
