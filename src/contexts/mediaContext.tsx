import React, { useState, useCallback } from "react";
import { Movie, TVSerie, Actor, Review } from "../types/interfaces";

interface MediaContextInterface {
  favourites: number[];
  mustWatch: number[];
  addToFavourites: (item: Movie | TVSerie | Actor) => void;
  removeFromFavourites: (item: Movie | TVSerie | Actor) => void;
  addToMustWatch: (item: Movie | TVSerie | Actor) => void;
  addReview: (item: Movie | TVSerie, review: Review) => void;
}

const initialContextState: MediaContextInterface = {
  favourites: [],
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
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);

  const addToFavourites = useCallback((item: Movie | TVSerie | Actor) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(item.id)) {
        return [...prevFavourites, item.id];
      }
      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback((item: Movie | TVSerie | Actor) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((mId) => mId !== item.id)
    );
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
        favourites,
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
