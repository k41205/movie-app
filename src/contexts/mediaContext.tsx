import React, { useState, useCallback } from "react";
import { Movie, TVSerie, Actor, Review } from "../types/interfaces";

interface MediaContextInterface {
  favouriteMovies: number[];
  favouriteTVSeries: number[];
  mustWatch: number[];
  addToFavourites: (item: Movie | TVSerie | Actor) => void;
  removeFromFavourites: (item: Movie | TVSerie | Actor) => void;
  addToMustWatch: (item: Movie | TVSerie | Actor) => void;
  addReview: (item: Movie | TVSerie, review: Review) => void;
}

const initialContextState: MediaContextInterface = {
  favouriteMovies: [],
  favouriteTVSeries: [],
  mustWatch: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addToMustWatch: () => {},
  addReview: (item, review) => {
    item.id, review;
  },
};

export const MediaContext =
  React.createContext<MediaContextInterface>(initialContextState);

const MediaContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [myReviews, setMyReviews] = useState<Record<number, Review>>({});
  const [favouriteMovies, setFavouriteMovies] = useState<number[]>([]);
  const [favouriteTVSeries, setFavouriteTVSeries] = useState<number[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);

  const addToFavourites = useCallback((item: Movie | TVSerie | Actor) => {
    if (item.mediaType === "movie") {
      setFavouriteMovies((prevFavourites) => {
        if (!prevFavourites.includes(item.id)) {
          return [...prevFavourites, item.id];
        }
        return prevFavourites;
      });
    } else if (item.mediaType === "tv") {
      setFavouriteTVSeries((prevFavourites) => {
        if (!prevFavourites.includes(item.id)) {
          return [...prevFavourites, item.id];
        }
        return prevFavourites;
      });
    }
  }, []);

  const removeFromFavourites = useCallback((item: Movie | TVSerie | Actor) => {
    if (item.mediaType === "movie") {
      setFavouriteMovies((prevFavourites) =>
        prevFavourites.filter((mId) => mId !== item.id)
      );
    } else if (item.mediaType === "tv") {
      setFavouriteTVSeries((prevFavourites) =>
        prevFavourites.filter((mId) => mId !== item.id)
      );
    }
  }, []);

  const addToMustWatch = useCallback((item: Movie | TVSerie | Actor) => {
    setMustWatch((prevMustWatch) => {
      if (!prevMustWatch.includes(item.id)) {
        return [...prevMustWatch, item.id];
      }
      return prevMustWatch;
    });
  }, []);

  const addReview = (item: Movie | TVSerie, review: Review) => {
    setMyReviews((prevReviews) => ({
      ...prevReviews,
      [item.id]: review,
    }));
  };

  return (
    <MediaContext.Provider
      value={{
        favouriteMovies,
        favouriteTVSeries,
        mustWatch,
        addToFavourites,
        removeFromFavourites,
        addToMustWatch,
        addReview,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContextProvider;
