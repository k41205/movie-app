import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateMediaListPage";
import { MediaContext } from "../contexts/mediaContext";
import { useQueries } from "react-query";
import { getTVSerie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MediaFilterUI from "../components/mediaFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import { genreFilter, titleFilter } from "../util";
import { Media, SortOption, TVSerie } from "../types/interfaces";

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

const FavouriteTVSeriesPage: React.FC = () => {
  const { favouriteTVSeries: mediaIds } = useContext(MediaContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const totalPages = Math.ceil(mediaIds.length / itemsPerPage);

  const {
    filterValues,
    setFilterValues,
    sortOption,
    setSortOption,
    applyFilterAndSort,
  } = useFiltering([titleFiltering, genreFiltering], initialSortOption);

  const favouriteMediaQueries = useQueries(
    mediaIds
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((mediaId) => {
        return {
          queryKey: ["tvSeries", mediaId],
          queryFn: () => getTVSerie(mediaId.toString()),
        };
      })
  );

  const isLoading = favouriteMediaQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
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

  const allFavourites = favouriteMediaQueries.map((q) => q.data) as Media[];
  const favouriteTVSeries = allFavourites.filter(
    (media) => media?.mediaType === "tv"
  ) as TVSerie[];
  const displayedTVSeries = favouriteTVSeries
    ? applyFilterAndSort(favouriteTVSeries)
    : [];

  const action = (media: Media) => {
    return (
      <>
        <RemoveFromFavourites item={media} />
        <WriteReview item={media} />
      </>
    );
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <PageTemplate
        title='Favorite TV Series'
        media={displayedTVSeries}
        action={action}
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isFavoritesPage={true}
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

export default FavouriteTVSeriesPage;
