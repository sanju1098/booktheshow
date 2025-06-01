import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Star, Play, ChevronLeft, ChevronRight} from "lucide-react";
import {useNavigate} from "react-router-dom";

const MovieCarousel = ({movies}: any) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [movies.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + movies.length) % movies.length);
  };

  const currentMovie = movies[currentSlide];

  if (!currentMovie) return null;

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{backgroundImage: `url(${currentMovie.banner})`}}>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all">
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="flex items-center gap-8 max-w-6xl">
          {/* Movie Poster */}
          <div className="hidden md:block">
            <img
              src={currentMovie.poster}
              alt={currentMovie.title}
              className="w-64 h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>

          {/* Movie Details */}
          <div className="text-white flex-1">
            <div className="mb-4">
              <Badge className="bg-yellow-500 text-black font-semibold mb-2">
                <Star className="w-3 h-3 fill-current mr-1" />
                {currentMovie.rating}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {currentMovie.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {currentMovie.genre.map((genre: any) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="border-white text-white">
                  {genre}
                </Badge>
              ))}
            </div>

            <p className="text-lg mb-2 opacity-90">
              {currentMovie.language} • {currentMovie.duration}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                onClick={() => navigate(`/movie/${currentMovie.id}`)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold">
                Book Tickets
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg font-semibold bg-transparent">
                <Play className="w-5 h-5 mr-2 fill-current" />
                Watch Trailer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {movies.map((_: unknown, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-red-600" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
