export interface Movie {
  adult: boolean;
  backdrop_path: string;
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
}

export interface TVSerie {
  adult: boolean;
  backdrop_path: string;
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
}

export type KnownFor = Movie | TVSerie;

export interface Actor {
  id: number;
  name: string;
  original_name: string;
  media_type: "person";
  adult: boolean;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string;
  known_for: (Movie | TVSerie)[];
  mediaType: "actor";
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
  action: React.ReactNode;
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
  id: string;
  content: string;
  author: string;
}

export interface GenreData {
  genres: {
    id: string;
    name: string;
  }[];
}

export interface DiscoverMovies {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
}

export interface Review {
  author: string;
  content: string;
  agree: boolean;
  rating: number;
  movieId: number;
}

export interface RemoveFromFavouritesProps {
  item: Media;
}

export interface WriteReviewProps {
  item: Media;
}
