import {useQuery} from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const getGenres = async () => {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
  );
  const data = await res.json();
  return data.genres; // array of { id, name }
};

const getNowPlaying = async () => {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=IN`,
  );
  const data = await res.json();
  return data.results;
};

export const useFilteredMovies = () => {
  return useQuery({
    queryKey: ["filteredMovies"],
    queryFn: async () => {
      const [genres, movies] = await Promise.all([
        getGenres(),
        getNowPlaying(),
      ]);
      const genreMap = Object.fromEntries(
        genres.map((g: any) => [g.id, g.name]),
      );

      const targetLangs = ["en", "hi", "te", "ml", "ta"];
      const langMap = new Map();

      const IMAGE_BASE = "https://image.tmdb.org/t/p";

      for (const movie of movies) {
        const lang = movie.original_language;
        if (
          targetLangs.includes(lang) &&
          !langMap.has(lang) &&
          movie.poster_path &&
          movie.backdrop_path
        ) {
          const genres = movie.genre_ids
            .map((id: number) => genreMap[id])
            .filter(Boolean);

          langMap.set(lang, {
            id: movie.id,
            title: movie.title,
            rating: movie.vote_average.toFixed(1),
            language: lang.toUpperCase(),
            duration: "2h",
            poster: `${IMAGE_BASE}/w500${movie.poster_path}`,
            banner: `${IMAGE_BASE}/w780${movie.backdrop_path}`,
            genre: genres,
          });
        }

        if (langMap.size === 5) break;
      }

      return Array.from(langMap.values());
    },
  });
};

const LANGUAGE = "en-US";
const REGION = "IN";

// Fetch genres only once
const fetchGenres = async () => {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`,
  );
  if (!res.ok) throw new Error("Failed to fetch genres");
  const data = await res.json();
  return data.genres; // [{ id: 28, name: "Action" }, ...]
};

// Query hook for genres
export const useGenres = () =>
  useQuery({queryKey: ["genres"], queryFn: fetchGenres});

// Hook to fetch movies and map genres
const fetchMoviesWithGenres = async (
  category: string,
  genreMap: Record<number, string>,
) => {
  const res = await fetch(
    `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=${LANGUAGE}&region=${REGION}`,
  );
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  return data.results.map((movie: any) => ({
    ...movie,
    genres: movie.genre_ids.map((id: number) => genreMap[id]).filter(Boolean),
  }));
};

// Wrapper hooks
export const usePopularMovies = () => {
  const {data: genres = []} = useGenres();
  const genreMap = Object.fromEntries(
    genres.map((g: {id: any; name: any}) => [g.id, g.name]),
  );

  return useQuery({
    queryKey: ["popular", genreMap],
    queryFn: () => fetchMoviesWithGenres("popular", genreMap),
    enabled: genres.length > 0,
  });
};

export const useNowPlayingMovies = () => {
  const {data: genres = []} = useGenres();
  const genreMap = Object.fromEntries(
    genres.map((g: {id: any; name: any}) => [g.id, g.name]),
  );

  return useQuery({
    queryKey: ["now_playing", genreMap],
    queryFn: () => fetchMoviesWithGenres("now_playing", genreMap),
    enabled: genres.length > 0,
  });
};

export const useUpcomingMovies = () => {
  const {data: genres = []} = useGenres();
  const genreMap = Object.fromEntries(
    genres.map((g: {id: any; name: any}) => [g.id, g.name]),
  );

  return useQuery({
    queryKey: ["upcoming", genreMap],
    queryFn: () => fetchMoviesWithGenres("upcoming", genreMap),
    enabled: genres.length > 0,
  });
};

// Fetch movie details by ID
const fetchMovieById = async (id: string | number) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${LANGUAGE}`,
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  const data = await res.json();
  return data;
};

// React Query hook to get movie details by ID
export const useMovieById = (id?: string | number) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(id!),
    enabled: !!id, // only fetch if id is provided
  });
};
