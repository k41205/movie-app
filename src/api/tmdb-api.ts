import { DiscoverResponse, Movie, TVSerie } from "../types/interfaces";

export const getMovies = (): Promise<DiscoverResponse<Movie>> => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .then((json) => ({
      ...json,
      results: json.results.map((movie: Movie) => ({
        ...movie,
        mediaType: "movie",
      })),
    }))
    .catch((error) => {
      throw error;
    });
};

export const getMoviesUpcoming = (): Promise<DiscoverResponse<Movie>> => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch upcoming movies. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((json) => ({
      ...json,
      results: json.results.map((movie: Movie) => ({
        ...movie,
        mediaType: "movie",
      })),
    }));
};

export const getGenres = (): Promise<{
  genres: { id: number; name: string }[];
}> => {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch genres. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMediaImages = (id: string | number, mediaType: string) => {
  const url =
    mediaType === "movie"
      ? `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
      : `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    })
    .then((json) => json.posters)
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = (
  id: string | number
): Promise<{ author: string; content: string; id: string }[]> => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};

export const getMostPopularMovies = (): Promise<DiscoverResponse<Movie>> => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch most popular movies. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((json) => ({
      ...json,
      results: json.results.map((movie: Movie) => ({
        ...movie,
        mediaType: "movie",
      })),
    }));
};

export const getTVSeriesReviews = (
  id: string | number
): Promise<{ author: string; content: string; id: string }[]> => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};

export const getTVSeries = (): Promise<DiscoverResponse<TVSerie>> => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch TV series. Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((json) => ({
      ...json,
      results: json.results.map((tvSerie: TVSerie) => ({
        ...tvSerie,
        mediaType: "tv",
      })),
    }));
};

export const getMovie = async (id: string): Promise<Movie> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to get movie data. Response status: ${response.status}`
    );
  }
  const movie = await response.json();
  return { ...movie, mediaType: "movie" };
};

export const getTVSerie = async (id: string): Promise<TVSerie> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to get TV series data. Response status: ${response.status}`
    );
  }
  const tvSerie = await response.json();
  return { ...tvSerie, mediaType: "tv" };
};

export const getMediaDetails = async (
  id: string,
  mediaType: "movie" | "tv"
): Promise<Movie | TVSerie> => {
  if (mediaType === "movie") {
    return getMovie(id);
  } else if (mediaType === "tv") {
    return getTVSerie(id);
  } else {
    throw new Error("Unknown media type");
  }
};
