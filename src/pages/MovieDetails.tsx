import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Calendar, MapPin, Star, ArrowLeft} from "lucide-react";
import {useCityContext} from "@/components/Navbar";
import {motion} from "framer-motion";
import {auth} from "@/lib/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {useToast} from "@/hooks/use-toast";
import {useMovieById} from "@/api/api";
import {cities} from "@/config/cities";

const MovieDetails = () => {
  const navigate = useNavigate();
  const {selectedCity} = useCityContext();
  const {id: movieId} = useParams<{id: string}>();
  const {data: movie, isLoading, error} = useMovieById(movieId);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [user, setUser] = useState<any>(null);
  // const [showTrailer, setShowTrailer] = useState(false);
  const {toast} = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const next7Days = Array.from({length: 7}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const theaters = cities[selectedCity];

  const handleBooking = (theater: any, showtime: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book tickets",
        variant: "destructive",
      });
      return;
    }

    navigate(`/booking/${movie?.id}`, {
      state: {
        movie,
        theater,
        showtime,
        date: selectedDate,
        poster: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <span className="loader relative inline-block w-12 h-12 border-4 border-black rounded-full animate-spin"></span>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center h-screen flex-col space-y-6">
        <div className="text-center text-3xl text-red-500">
          Something went wrong.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div
        className="relative h-80 md:h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-black/50 border-white text-white hover:bg-black/70">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center gap-8 max-w-6xl">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-48 h-72 object-cover rounded-lg shadow-2xl hidden md:block"
            />

            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {movie.title}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-yellow-500 text-black font-semibold">
                  <Star className="w-3 h-3 fill-current mr-1" />
                  {movie.vote_average.toFixed(1)}
                </Badge>
                <span className="text-lg">
                  {movie.original_language.toUpperCase()} • {movie.runtime} min
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre: any) => (
                  <Badge
                    key={genre.id}
                    variant="outline"
                    className="border-white text-white">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <p className="text-lg opacity-90 max-w-2xl mb-6">
                {movie.overview}
              </p>

              {/* <Button
                onClick={() => setShowTrailer(true)}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black bg-transparent">
                <Play className="w-5 h-5 mr-2 fill-current" />
                Watch Trailer
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {/* {showTrailer && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <Button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
              variant="ghost">
              <X className="w-6 h-6" />
            </Button>
            <iframe
              src={`https://www.youtube.com/embed/${movie.videos?.results?.[0]?.key || "TcMBFSGVi1c"}`}
              title={`${movie.title} Trailer`}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        </div>
      )} */}

      {/* Dates and Theaters */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="text-red-600" />
            Select Date
          </h2>
          <div className="my-4 mx-2">
            <div className="flex gap-2 pb-2 min-w-max">
              {next7Days.map(date => {
                const dateStr = date.toISOString().split("T")[0];
                const isSelected = selectedDate === dateStr;
                const dayName = date.toLocaleDateString("en-US", {
                  weekday: "short",
                });
                const dayNum = date.getDate();
                const month = date.toLocaleDateString("en-US", {
                  month: "short",
                });

                return (
                  <Button
                    key={dateStr}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`flex flex-col items-center p-3 min-w-[80px] shrink-0 ${
                      isSelected
                        ? "bg-red-600 hover:bg-red-700"
                        : "border-red-200 hover:bg-red-50"
                    }`}>
                    <span
                      className={`text-lg ${isSelected ? "font-bold" : "font-normal"}`}>
                      {dayName}, {dayNum} {month}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="text-red-600" />
            Theaters in {selectedCity}
          </h2>

          <div className="space-y-4">
            {theaters.map(theater => (
              <motion.div
                key={theater.id}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3}}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {theater.name}
                        </h3>
                        <div className="flex items-center gap-4 text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {theater.location}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm font-medium text-gray-700">
                            Show Times:
                          </span>
                          {theater.showtimes.map(time => {
                            const [hour, minutePartRaw] = time.split(":");
                            const minute = parseInt(minutePartRaw);
                            const ampm = minutePartRaw.includes("AM")
                              ? "AM"
                              : "PM";
                            let hours = parseInt(hour);

                            // Convert to 24-hour format
                            if (ampm === "PM" && hours !== 12) hours += 12;
                            if (ampm === "AM" && hours === 12) hours = 0;

                            // Create full show datetime using selectedDate
                            const showDateTime = new Date(selectedDate);
                            showDateTime.setHours(hours, minute, 0, 0);

                            const now = new Date();
                            const isToday =
                              selectedDate === now.toISOString().split("T")[0];
                            const isPast =
                              isToday && showDateTime.getTime() < now.getTime();

                            return (
                              <Button
                                key={time}
                                variant="outline"
                                size="sm"
                                disabled={isPast}
                                onClick={() => handleBooking(theater, time)}
                                className={`border-red-200 text-red-600 hover:bg-red-600 hover:text-white ${
                                  isPast ? "opacity-50 cursor-not-allowed" : ""
                                }`}>
                                {time}
                              </Button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="lg:text-right">
                        <div className="text-sm text-gray-600 mb-2">
                          Starting from
                        </div>
                        <div className="text-2xl font-bold text-red-600">
                          ₹{theater.prices.classic}
                        </div>
                        <div className="text-sm text-gray-500">Classic</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
