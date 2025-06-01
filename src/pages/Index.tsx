import {useQuery} from "@tanstack/react-query";
import MovieCarousel from "@/components/MovieCarousel";
import Footer from "@/components/Footer";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Star, Calendar, Clock} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useNavigate} from "react-router-dom";

const fetchMovies = async () => {
  // Replace this with your actual data fetching logic from Firebase or any other source
  // This is just a placeholder with dummy data
  return [
    {
      id: 1,
      title: "Avengers: Endgame",
      rating: 8.4,
      genre: ["Action", "Adventure", "Drama"],
      language: "English",
      duration: "181 min",
      poster:
        "https://images.unsplash.com/photo-1478720568477-b2709d01a50b?w=300&h=450&fit=crop",
      banner:
        "https://images.unsplash.com/photo-1478720568477-b2709d01a50b?w=1200&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Spider-Man: No Way Home",
      rating: 8.7,
      genre: ["Action", "Adventure", "Sci-Fi"],
      language: "English",
      duration: "148 min",
      poster:
        "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
      banner:
        "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Oppenheimer",
      rating: 8.6,
      genre: ["Biography", "Drama", "History"],
      language: "English",
      duration: "180 min",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODEtNzc2M2QyZGE5N2JkXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_FMjpg_UX1000_.jpg",
      banner:
        "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODEtNzc2M2QyZGE5N2JkXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_FMjpg_UX1000_.jpg",
    },
    {
      id: 4,
      title: "Inception",
      rating: 8.8,
      genre: ["Action", "Sci-Fi", "Thriller"],
      language: "English",
      duration: "148 min",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTY5OTM0Mw@@._V1_.jpg",
      banner:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTY5OTM0Mw@@._V1_.jpg",
    },
    {
      id: 5,
      title: "Interstellar",
      rating: 8.6,
      genre: ["Adventure", "Drama", "Sci-Fi"],
      language: "English",
      duration: "169 min",
      poster:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGE2LWFkNjEtODkwMTQ5OTQ0NWQ0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
      banner:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGE2LWFkNjEtODkwMTQ5OTQ0NWQ0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
    },
    {
      id: 6,
      title: "The Shawshank Redemption",
      rating: 9.3,
      genre: ["Drama"],
      language: "English",
      duration: "142 min",
      poster:
        "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2JiZS00NzMxLTk3OTQtM2U5NTU2ZTkyNDk0XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
      banner:
        "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2JiZS00NzMxLTk3OTQtM2U5NTU2ZTkyNDk0XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
    },
    {
      id: 7,
      title: "The Dark Knight",
      rating: 9.0,
      genre: ["Action", "Crime", "Drama"],
      language: "English",
      duration: "152 min",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
      banner:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
    },
    {
      id: 8,
      title: "Pulp Fiction",
      rating: 8.9,
      genre: ["Crime", "Drama"],
      language: "English",
      duration: "154 min",
      poster:
        "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtYmU5Ni00OWE3LTkwNWItZDdiMWMwNWQ3N2ZlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
      banner:
        "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtYmU5Ni00OWE3LTkwNWItZDdiMWMwNWQ3N2ZlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
    },
  ];
};

const Index = () => {
  const navigate = useNavigate();

  const {data: movies = [], isLoading} = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const featuredMovies = movies.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      {featuredMovies.length > 0 && <MovieCarousel movies={featuredMovies} />}

      {/* Movies Grid */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Now Showing</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map(movie => (
              <Card
                key={movie.id}
                className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="relative">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-yellow-500 text-black font-semibold">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      {movie.rating}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">
                    {movie.title}
                  </h3>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {movie.genre.slice(0, 2).map(genre => (
                      <Badge key={genre} variant="outline" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {movie.language}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {movie.duration}
                    </span>
                  </div>

                  <Button
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Book Tickets
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Index;
