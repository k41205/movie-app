import React, { useContext } from "react";
import PageTemplate from "../components/templateMediaListPage";
import { MediaContext } from "../contexts/mediaContext";
import { useQueries } from "react-query";
import { getActor } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MediaFilterUI from "../components/mediaFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import { titleFilter } from "../util";
import { Media, Actor } from "../types/interfaces";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

const FavouriteActorsPage: React.FC = () => {
  const { favouriteActors: mediaIds } = useContext(MediaContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
  ]);

  const favouriteMediaQueries = useQueries(
    mediaIds.map((mediaId) => {
      return {
        queryKey: ["actor", mediaId],
        queryFn: () => getActor(mediaId.toString()),
      };
    })
  );

  const isLoading = favouriteMediaQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMediaQueries.map((q) => q.data) as Media[];
  const favouriteActors = allFavourites.filter(
    (media) => media?.mediaType === "actor"
  ) as Actor[];
  const displayedActors = favouriteActors
    ? filterFunction(favouriteActors)
    : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = [changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const action = (media: Media) => {
    return <RemoveFromFavourites item={media} />;
  };

  return (
    <>
      <PageTemplate
        title='Favorite Actors'
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

export default FavouriteActorsPage;
