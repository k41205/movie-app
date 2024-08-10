import React from "react";
import PageTemplate from "../components/templateMediaListPage";
import { getActors } from "../api/tmdb-api";
import { Media, DiscoverResponse, Actor } from "../types/interfaces";
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

const ActorsPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<
    DiscoverResponse<Actor>,
    Error
  >("actors", getActors);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    nameFiltering,
  ]);

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

  const actors = data ? data.results : [];
  const displayedActors = filterFunction(actors);

  const action = (actor: Media) => {
    return <AddToFavouritesIcon item={actor as Actor} />;
  };

  return (
    <>
      <PageTemplate
        title='Popular Actors'
        media={displayedActors}
        action={action}
      />
      <MediaFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={""}
      />
    </>
  );
};

export default ActorsPage;
