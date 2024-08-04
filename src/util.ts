import truncate from "lodash/truncate";
import { Media, Movie, TVSerie } from "./types/interfaces";

export const excerpt = (string: string) => {
  return truncate(string, {
    length: 400,
    separator: /,?\.* +/,
  });
};

const isMovie = (media: Media): media is Movie => {
  return (media as Movie).title !== undefined;
};

const isTVSerie = (media: Media): media is TVSerie => {
  return (media as TVSerie).name !== undefined;
};

export const titleFilter = (media: Media, value: string): boolean => {
  const title = isMovie(media)
    ? media.title
    : isTVSerie(media)
      ? media.name
      : "";
  return title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (media: Media, value: string): boolean => {
  if (!isMovie(media) && !isTVSerie(media)) return true;

  const genreId = Number(value);
  const genreIds = media.genre_ids;
  return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};
