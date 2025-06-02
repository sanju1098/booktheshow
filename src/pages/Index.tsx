// import MovieCarousel from "@/components/MovieCarousel";
// import Footer from "@/components/Footer";
// import {Card, CardContent} from "@/components/ui/card";
// import {Badge} from "@/components/ui/badge";
// import {Star, Calendar, Clock} from "lucide-react";
// import {Button} from "@/components/ui/button";
// import {useNavigate} from "react-router-dom";
// import {
//   useFilteredMovies,
//   useNowPlayingMovies,
//   usePopularMovies,
//   useUpcomingMovies,
// } from "@/api/api";

// const Index = () => {
//   const navigate = useNavigate();

//   const {data: movies = [], isLoading, error} = useFilteredMovies();
//   const {data: popular = [], isLoading: loadingPopular} = usePopularMovies();
//   const {data: nowPlaying = [], isLoading: loadingNow} = useNowPlayingMovies();
//   const {data: upcoming = [], isLoading: loadingUpcoming} = useUpcomingMovies();

//   if (isLoading)
//     return (
//       <div className="flex items-center justify-center h-screen bg-white">
//         <span className="loader relative inline-block w-12 h-12 border-4 border-black rounded-full animate-spin"></span>
//       </div>
//     );
//   if (error)
//     return (
//       <div className="flex items-center justify-center h-screen flex-col space-y-6">
//         <div className="text-center text-2xl text-red-500">
//           Error loading movies.
//         </div>
//       </div>
//     );

//   const renderMovieCard = (movie: any, withButton = true) => (
//     <Card
//       key={movie.id}
//       className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
//       <div className="relative">
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.title}
//           className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//         <div className="absolute top-2 right-2">
//           <Badge className="bg-yellow-500 text-black font-semibold">
//             <Star className="w-3 h-3 fill-current mr-1" />
//             {movie.vote_average}
//           </Badge>
//         </div>
//       </div>

//       <CardContent className="p-4">
//         <h3 className="font-bold text-lg mb-2 line-clamp-1">{movie.title}</h3>
//         <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
//           <span className="flex items-center gap-1">
//             <Calendar className="w-4 h-4" />
//             {movie.original_language.toUpperCase()}
//           </span>
//           <span className="flex items-center gap-1">
//             <Clock className="w-4 h-4" />
//             {movie.release_date}
//           </span>
//         </div>
//         {withButton && (
//           <Button
//             onClick={() => navigate(`/movie/${movie.id}`)}
//             className="w-full bg-red-600 hover:bg-red-700 text-white">
//             Book Tickets
//           </Button>
//         )}
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Carousel */}
//       {movies?.length > 0 && <MovieCarousel movies={movies} />}

//       {popular.length > 0 && (
//         <>
//           <h2 className="text-3xl font-bold mb-6 text-center">Most Playing</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {popular.slice(0, 8).map((m: any) => (
//               <Card
//                 key={m.id}
//                 className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
//                 <div className="relative">
//                   <img
//                     src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
//                     alt={m.title}
//                     className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                   <div className="absolute top-2 right-2">
//                     <Badge className="bg-yellow-500 text-black font-semibold">
//                       <Star className="w-3 h-3 fill-current mr-1" />
//                       {m.vote_average}
//                     </Badge>
//                   </div>
//                 </div>

//                 <CardContent className="p-4">
//                   <h3 className="font-bold text-lg mb-2 line-clamp-1">
//                     {m.title}
//                   </h3>

//                   <div className="flex flex-wrap gap-1 mb-3">
//                     {(m.genres || []).slice(0, 2).map((genre: string) => (
//                       <Badge key={genre} variant="outline" className="text-xs">
//                         {genre}
//                       </Badge>
//                     ))}
//                   </div>

//                   <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
//                     <span className="flex items-center gap-1">
//                       <Calendar className="w-4 h-4" />
//                       {m.original_language.toUpperCase()}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Clock className="w-4 h-4" />
//                       {m.release_date}
//                     </span>
//                   </div>

//                   <Button
//                     onClick={() => navigate(`/movie/${m.id}`)}
//                     className="w-full bg-red-600 hover:bg-red-700 text-white">
//                     Book Tickets
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </>
//       )}

//       {/* New Movies */}
//       <div className="container mx-auto px-4 py-12">
//         <h2 className="text-3xl font-bold mb-6 text-center">Now Showing</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {(loadingNow ? Array(4).fill(null) : nowPlaying).map(
//             (movie: any, index: number) =>
//               movie ? (
//                 renderMovieCard(movie)
//               ) : (
//                 <div
//                   key={index}
//                   className="h-96 bg-gray-300 animate-pulse rounded-lg"></div>
//               ),
//           )}
//         </div>
//       </div>

//       {/* Upcoming Movies */}
//       <div className="container mx-auto px-4 py-12">
//         <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Movies</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {(loadingUpcoming ? Array(4).fill(null) : upcoming).map(
//             (movie: any, index: number) =>
//               movie ? (
//                 renderMovieCard(movie, false)
//               ) : (
//                 <div
//                   key={index}
//                   className="h-96 bg-gray-300 animate-pulse rounded-lg"></div>
//               ),
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Index;

import MovieCarousel from "@/components/MovieCarousel";
import Footer from "@/components/Footer";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Star, Calendar, Globe, Ticket, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useNavigate} from "react-router-dom";
import {
  useFilteredMovies,
  useNowPlayingMovies,
  usePopularMovies,
  useUpcomingMovies,
} from "@/api/api";
import {Input} from "@/components/ui/input";
import {useToast} from "@/hooks/use-toast";
import {useState} from "react";
import {useCityContext} from "@/components/Navbar";

const Index = () => {
  const navigate = useNavigate();
  const {toast} = useToast();
  const {selectedCity} = useCityContext();

  const {data: movies = [], isLoading, error} = useFilteredMovies();
  const {data: popular = [], isLoading: loadingPopular} = usePopularMovies();
  const {data: nowPlaying = [], isLoading: loadingNow} = useNowPlayingMovies();
  const {data: upcoming = [], isLoading: loadingUpcoming} = useUpcomingMovies();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search Feature",
        description: `Searching for "${searchQuery}" in ${selectedCity}`,
      });
    }
  };

  const allMovies = [...nowPlaying, ...popular, ...upcoming];
  const filteredMovies = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <span className="loader relative inline-block w-12 h-12 border-4 border-black rounded-full animate-spin"></span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen flex-col space-y-6">
        <div className="text-center text-2xl text-red-500">
          Error loading movies.
        </div>
      </div>
    );

  const renderMovieCard = (
    movie: any,
    options?: {variant?: "popular" | "upcoming"; showButton?: boolean},
  ) => {
    const {variant = "default", showButton = true} = options || {};

    const cardStyles = {
      base: "overflow-hidden transition-shadow bg-gray-100 cursor-pointer group",
      popular: "border-4 border-yellow-500 bg-gray-100 shadow-md",
      upcoming: "bg-gray-100 opacity-90",
    };

    return (
      <Card
        key={movie.id}
        className={`${cardStyles.base} ${
          variant === "popular" ? cardStyles.popular : ""
        } ${variant === "upcoming" ? cardStyles.upcoming : "hover:shadow-xl"}`}>
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {variant === "popular" && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-yellow-500 text-black font-semibold">
                <Star className="w-3 h-3 fill-current mr-1" />
                {movie.vote_average}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{movie.title}</h3>

          {movie.genres?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {movie.genres.slice(0, 2).map((genre: string) => (
                <Badge key={genre} variant="outline" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              {movie.original_language?.toUpperCase()}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {movie.release_date}
            </span>
          </div>

          {showButton && (
            <Button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center gap-1">
              <Ticket className="w-4 h-4" /> Book Tickets
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      {movies?.length > 0 && <MovieCarousel movies={movies} />}

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-8 mt-6">
        <form onSubmit={handleSearch} className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search for Movies, Events, Plays, Sports and Activities"
            className="pl-10 w-full bg-gray-50 border-gray-200 focus:border-red-300"
          />
        </form>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
            Search Results
          </h2>
          {filteredMovies.length === 0 ? (
            <p className="text-center text-gray-500">No movies found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMovies.map((movie: any) => renderMovieCard(movie))}
            </div>
          )}
        </section>
      )}

      {/* Don't show these sections while searching */}
      {!searchQuery && (
        <>
          {/* Popular Movies */}
          {popular.length > 0 && (
            <section className="bg-[#3b3b3b] py-12 my-2">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">
                  Most Popular
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {popular
                    .slice(0, 8)
                    .map((movie: any) =>
                      renderMovieCard(movie, {variant: "popular"}),
                    )}
                </div>
              </div>
            </section>
          )}

          {/* Now Showing */}
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
              Now Showing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(loadingNow ? Array(4).fill(null) : nowPlaying).map(
                (movie: any, index: number) =>
                  movie ? (
                    renderMovieCard(movie)
                  ) : (
                    <div
                      key={index}
                      className="h-96 bg-gray-300 animate-pulse rounded-lg"></div>
                  ),
              )}
            </div>
          </section>

          {/* Upcoming */}
          <section className="bg-gradient-to-b from-gray-100 to-white py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
                Coming Soon
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(loadingUpcoming ? Array(4).fill(null) : upcoming).map(
                  (movie: any, index: number) =>
                    movie ? (
                      renderMovieCard(movie, {
                        variant: "upcoming",
                        showButton: false,
                      })
                    ) : (
                      <div
                        key={index}
                        className="h-96 bg-gray-300 animate-pulse rounded-lg"></div>
                    ),
                )}
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Index;
