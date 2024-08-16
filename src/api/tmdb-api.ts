import {
  Actor,
  DiscoverResponse,
  GenreData,
  KnownForMedia,
  Media,
  Movie,
  TVSerie,
} from "../types/interfaces";

export const getMovies = (
  page: number = 1
): Promise<DiscoverResponse<Movie>> => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}&sort_by=vote_count.desc`
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

export const getMoviesUpcoming = (
  page: number = 1
): Promise<DiscoverResponse<Movie>> => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
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

export const getGenres = (): Promise<GenreData> => {
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
  let url: string;

  switch (mediaType) {
    case "movie":
      url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`;
      break;
    case "tv":
      url = `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`;
      break;
    case "actor":
      url = `https://api.themoviedb.org/3/person/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`;
      break;
    default:
      throw new Error("Unknown media type");
  }

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      return response.json();
    })
    .then((json) => {
      if (mediaType === "actor") {
        return json.profiles;
      }
      return json.posters;
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = (
  id: string | number
): Promise<
  {
    rating: number;
    agree: boolean;
    author: string;
    content: string;
    id: string;
  }[]
> => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};

export const getMostPopularMovies = (
  page: number = 1
): Promise<DiscoverResponse<Movie>> => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
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
): Promise<
  {
    rating: number;
    agree: boolean;
    author: string;
    content: string;
    id: string;
  }[]
> => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};

export const getTVSeries = (
  page: number = 1
): Promise<DiscoverResponse<TVSerie>> => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${import.meta.env.VITE_TMDB_KEY}`
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
  mediaType: "movie" | "tv" | "actor"
): Promise<Movie | TVSerie | Actor> => {
  if (mediaType === "movie") {
    return getMovie(id);
  } else if (mediaType === "tv") {
    return getTVSerie(id);
  } else if (mediaType === "actor") {
    return getActor(id);
  } else {
    throw new Error("Unknown media type");
  }
};

export const getActors = (
  page: number = 1
): Promise<DiscoverResponse<Actor>> => {
  return fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch actors. Response status: ${response.status}`
        );
      return response.json();
    })
    .then((json) => ({
      ...json,
      results: json.results.map((actor: Actor) => ({
        ...actor,
        mediaType: "actor",
      })),
    }))
    .catch((error) => {
      throw error;
    });
};

export const getActor = async (id: string): Promise<Actor> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to get actor data. Response status: ${response.status}`
    );
  }

  const actor = (await response.json()) as Actor;

  actor.mediaType = "actor";

  if (!actor.known_for || actor.known_for.length === 0) {
    const knownForResponse = await fetch(
      `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    );

    if (knownForResponse.ok) {
      const creditsData = await knownForResponse.json();

      actor.known_for = creditsData.cast.slice(0, 5).map((media: Media) => {
        if ("poster_path" in media) {
          return {
            id: media.id,
            title: "title" in media ? media.title : media.name,
            poster_path: media.poster_path,
            media_type: media.mediaType,
          };
        } else {
          return {
            id: media.id,
            title: media.name,
            media_type: media.mediaType,
          };
        }
      }) as KnownForMedia[];
    }
  }

  return actor;
};
