import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Calendar, MapPin, Star, ArrowLeft, Play, X} from "lucide-react";
import {useCityContext} from "@/components/Navbar";
import {motion} from "framer-motion";
import {auth} from "@/lib/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {useToast} from "@/hooks/use-toast";

const MovieDetails = () => {
  const navigate = useNavigate();
  const {selectedCity} = useCityContext();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [user, setUser] = useState<any>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const {toast} = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Sample movie data (in real app, fetch from Firebase using id)
  const movie = {
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
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    director: "Anthony Russo, Joe Russo",
    cast: [
      "Robert Downey Jr.",
      "Chris Evans",
      "Mark Ruffalo",
      "Chris Hemsworth",
    ],
    releaseDate: "2019-04-26",
    trailerUrl: "https://www.youtube.com/embed/TcMBFSGVi1c", // Avengers Endgame trailer
  };

  const theaters = [
    {
      id: 1,
      name: `PVR Cinemas - ${selectedCity === "Bangalore" ? "Forum Mall" : selectedCity === "Delhi" ? "Select City Walk" : "Phoenix MarketCity"}`,
      location: `${selectedCity === "Bangalore" ? "Koramangala" : selectedCity === "Delhi" ? "Saket" : "Kurla"}, ${selectedCity}`,
      distance: "2.3 km",
      showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
      prices: {gold: 450, premium: 350, classic: 250},
    },
    {
      id: 2,
      name: `INOX - ${selectedCity === "Bangalore" ? "Mantri Square" : selectedCity === "Delhi" ? "India Gate" : "R City Mall"}`,
      location: `${selectedCity === "Bangalore" ? "Malleshwaram" : selectedCity === "Delhi" ? "CP" : "Ghatkopar"}, ${selectedCity}`,
      distance: "4.1 km",
      showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"],
      prices: {gold: 420, premium: 320, classic: 220},
    },
    {
      id: 3,
      name: `Cinepolis - ${selectedCity === "Bangalore" ? "Nexus Mall" : selectedCity === "Delhi" ? "DLF Mall" : "Viviana Mall"}`,
      location: `${selectedCity === "Bangalore" ? "Whitefield" : selectedCity === "Delhi" ? "Vasant Kunj" : "Thane"}, ${selectedCity}`,
      distance: "8.2 km",
      showtimes: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"],
      prices: {gold: 480, premium: 380, classic: 280},
    },
  ];

  const next7Days = Array.from({length: 7}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleBooking = (theater: any, showtime: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book tickets",
        variant: "destructive",
      });
      return;
    }

    navigate(`/booking/${movie.id}`, {
      state: {
        movie,
        theater,
        showtime,
        date: selectedDate,
      },
    });
  };

  const openTrailer = () => {
    setShowTrailer(true);
  };

  const closeTrailer = () => {
    setShowTrailer(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Movie Banner */}
      <div
        className="relative h-80 md:h-96 bg-cover bg-center"
        style={{backgroundImage: `url(${movie.banner})`}}>
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
              src={movie.poster}
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
                  {movie.rating}
                </Badge>
                <span className="text-lg">
                  {movie.language} • {movie.duration}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genre.map(genre => (
                  <Badge
                    key={genre}
                    variant="outline"
                    className="border-white text-white">
                    {genre}
                  </Badge>
                ))}
              </div>

              <p className="text-lg opacity-90 max-w-2xl mb-6">
                {movie.description}
              </p>

              <Button
                onClick={openTrailer}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black bg-transparent">
                <Play className="w-5 h-5 mr-2 fill-current" />
                Watch Trailer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <Button
              onClick={closeTrailer}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
              variant="ghost">
              <X className="w-6 h-6" />
            </Button>
            <iframe
              src={movie.trailerUrl}
              title={`${movie.title} Trailer`}
              className="w-full h-full rounded-lg"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Date Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="text-red-600" />
            Select Date
          </h2>
          <div className="overflow-x-auto">
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
                    <span className="text-xs">{dayName}</span>
                    <span className="text-lg font-bold">{dayNum}</span>
                    <span className="text-xs">{month}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Theaters */}
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
                          <span>{theater.distance} away</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm font-medium text-gray-700">
                            Show Times:
                          </span>
                          {theater.showtimes.map(time => (
                            <Button
                              key={time}
                              variant="outline"
                              size="sm"
                              onClick={() => handleBooking(theater, time)}
                              className="border-red-200 text-red-600 hover:bg-red-600 hover:text-white">
                              {time}
                            </Button>
                          ))}
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
