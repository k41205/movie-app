export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genres: Genre[];
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  mediaType: "movie";
  runtime?: number;
  revenue?: number;
}

export interface TVSerie {
  adult: boolean;
  backdrop_path: string;
  genres: Genre[];
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  mediaType: "tv";
  number_of_episodes?: number;
  number_of_seasons?: number;
}

export type KnownFor = Movie | TVSerie;

export interface Actor {
  biography?: string;
  birthday: string;
  id: number;
  name: string;
  original_name: string;
  media_type: "person";
  adult: boolean;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string;
  known_for: KnownForMedia[];
  mediaType: "actor";
  place_of_birth: string;
}

export type Media = Movie | TVSerie | Actor;

export interface MediaListPageTemplateProps {
  media: Media[];
  title: string;
  action: (item: Media) => JSX.Element;
}

export interface MediaListProps {
  media: Media[];
  action: (item: Media) => React.ReactNode;
}

export interface MediaCardProps {
  item: Media;
  action: (item: Media) => React.ReactNode;
}

export interface BaseMovieListProps {
  movies: Movie[];
  action: (m: Movie) => React.ReactNode;
}

export interface MovieDetailsProps extends Movie {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  runtime: number;
  revenue: number;
}

export interface TVSerieDetailsProps extends TVSerie {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface MovieImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}

export type FilterOption = "title" | "genre";

export interface Review {
  mediaId: number;
  mediaType: string;
  id: string;
  content: string;
  author: string;
  agree?: boolean;
  rating?: number;
  movieId?: number;
}

export interface GenreData {
  genres: Genre[];
}

export interface DiscoverResponse<T> {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
}

export interface RemoveFromFavouritesProps {
  item: Media;
}

export interface WriteReviewProps {
  item: Media;
}

export type MediaDetailsProps = Movie | TVSerie | Actor;

export interface HeaderProps {
  title: string;
}
export interface AddToFavouritesIconProps {
  item: Media;
}

export interface TemplateMediaPageProps {
  media: MediaDetailsProps;
  children: React.ReactElement;
}

export interface Genre {
  id: number;
  name: string;
}

export interface KnownForMedia {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  media_type: string;
}

export interface SortOption {
  name: string;
  direction: "asc" | "desc";
}
