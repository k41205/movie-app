import React from "react";
import PageTemplate from "../components/templateMediaListPage";
import { getTVSeries } from "../api/tmdb-api";
import { Media, DiscoverResponse, TVSerie } from "../types/interfaces";
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

const TVSeriesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<
    DiscoverResponse<TVSerie>,
    Error
  >("tvSeries", getTVSeries);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

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

  const tvSeries = data ? data.results : [];
  const displayedTVSeries = filterFunction(tvSeries);

  const action = (tvSerie: Media) => {
    return <AddToFavouritesIcon item={tvSerie as TVSerie} />;
  };

  return (
    <>
      <PageTemplate
        title='Popular TV Series'
        media={displayedTVSeries}
        action={action}
      />
      <MediaFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default TVSeriesPage;
