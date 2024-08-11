import React, { useState } from "react";
import PageTemplate from "../components/templateMediaListPage";
import { getActors } from "../api/tmdb-api";
import {
  Media,
  DiscoverResponse,
  Actor,
  SortOption,
} from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MediaFilterUI from "../components/mediaFilterUI";
import { titleFilter } from "../util";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const nameFiltering = {
  name: "name",
  value: "",
  condition: titleFilter,
};

const initialSortOption: SortOption = {
  name: "title",
  direction: "asc",
};

const ActorsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery<
    DiscoverResponse<Actor>,
    Error
  >(["actors", currentPage], () => getActors(currentPage), {
    keepPreviousData: true,
  });

  const {
    filterValues,
    setFilterValues,
    sortOption,
    setSortOption,
    applyFilterAndSort,
  } = useFiltering([nameFiltering], initialSortOption);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = [changedFilter];
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

  const actors = data ? data.results : [];
  const displayedActors = applyFilterAndSort(actors);

  const action = (actor: Media) => {
    return <AddToFavouritesIcon item={actor as Actor} />;
  };

  return (
    <>
      <PageTemplate
        title='Popular Actors'
        media={displayedActors}
        action={action}
        page={currentPage}
        totalPages={data?.total_pages || 1}
        onPageChange={handlePageChange}
      />
      <MediaFilterUI
        onFilterValuesChange={changeFilterValues}
        onSortOptionChange={changeSortOption}
        titleFilter={filterValues[0].value}
        sortOption={sortOption}
        isActorPage={true}
      />
    </>
  );
};

export default ActorsPage;
