import truncate from "lodash/truncate";
import { Movie } from "./types/interfaces";

export const excerpt = (string: string) => {
  return truncate(string, {
    length: 400,
    separator: /,?\.* +/,
  });
};

export const titleFilter = (movie: Movie, value: string): boolean => {
  return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (movie: Movie, value: string) => {
  const genreId = Number(value);
  const genreIds = movie.genre_ids;
  return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};
