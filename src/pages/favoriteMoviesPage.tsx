import React, { useContext } from "react";
import PageTemplate from "../components/templateMediaListPage";
import { MediaContext } from "../contexts/mediaContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import { genreFilter, titleFilter } from "../util";
import { Media } from "../types/interfaces";

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

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: mediaIds } = useContext(MediaContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  const favouriteMediaQueries = useQueries(
    mediaIds.map((mediaId) => {
      return {
        queryKey: ["media", mediaId],
        queryFn: () => getMovie(mediaId.toString()),
      };
    })
  );

  const isLoading = favouriteMediaQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMediaQueries.map((q) => q.data) as Media[];
  const displayedMedia = allFavourites ? filterFunction(allFavourites) : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const action = (media: Media) => {
    return (
      <>
        <RemoveFromFavourites item={media} />
        <WriteReview item={media} />
      </>
    );
  };

  return (
    <>
      <PageTemplate
        title='Favourite Media'
        media={displayedMedia}
        action={action}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteMoviesPage;
