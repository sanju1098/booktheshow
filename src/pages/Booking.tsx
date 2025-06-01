import {useState, useEffect, useMemo} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {ArrowLeft, MapPin, Clock, Calendar} from "lucide-react";
import {auth} from "@/lib/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {useToast} from "@/hooks/use-toast";

const Booking = () => {
  const {id} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {toast} = useToast();
  const [user, setUser] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<any>([]);

  const bookingData = location.state;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to book tickets",
          variant: "destructive",
        });
        navigate(`/movie/${id}`);
      }
    });
    return () => unsubscribe();
  }, [id, navigate, toast]);

  // Memoize seat layout to prevent re-rendering
  const seatLayout = useMemo(
    () =>
      Array.from({length: 10}, (_, row) =>
        Array.from({length: 12}, (_, seat) => ({
          id: `${String.fromCharCode(65 + row)}${seat + 1}`,
          row: String.fromCharCode(65 + row),
          number: seat + 1,
          price: row < 3 ? 450 : row < 7 ? 350 : 250,
          type: row < 3 ? "Gold" : row < 7 ? "Premium" : "Classic",
          isBooked: Math.random() < 0.3,
        })),
      ),
    [],
  );

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
            <Button
              onClick={() => navigate("/")}
              className="bg-red-600 hover:bg-red-700">
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const {movie, theater, showtime, date} = bookingData;

  const handleSeatClick = (seatId: string) => {
    setSelectedSeats((prev: any) =>
      prev.includes(seatId)
        ? prev.filter((id: any) => id !== seatId)
        : [...prev, seatId],
    );
  };

  const totalAmount = selectedSeats.reduce((total: any, seatId: any) => {
    const seat = seatLayout.flat().find(s => s.id === seatId);
    return total + (seat?.price || 0);
  }, 0);

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "No Seats Selected",
        description: "Please select at least one seat",
        variant: "destructive",
      });
      return;
    }

    // Navigate to confirmation page
    navigate(`/confirmation/${id}`, {
      state: {
        ...bookingData,
        selectedSeats,
        totalAmount,
        user: {
          name: user?.displayName || user?.email?.split("@")[0] || "Guest",
          email: user?.email,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4 md:mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Booking Header */}
        <Card className="mb-6 md:mb-8">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-20 h-28 md:w-24 md:h-36 object-cover rounded-lg mx-auto md:mx-0"
              />
              <div className="text-center md:text-left">
                <h1 className="text-xl md:text-2xl font-bold mb-2">
                  {movie.title}
                </h1>
                <div className="space-y-2 text-gray-600 text-sm md:text-base">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MapPin className="w-4 h-4" />
                    {theater.name}, {theater.location}
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(date).toLocaleDateString("en-IN")}
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Clock className="w-4 h-4" />
                    {showtime}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seat Selection */}
        <Card className="mb-6 md:mb-8">
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-4">Select Seats</h2>

            {/* Screen */}
            <div className="text-center mb-6 md:mb-8">
              <div className="w-full h-3 md:h-4 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300 rounded-t-3xl mb-2"></div>
              <p className="text-sm text-gray-500">Screen</p>
            </div>

            {/* Seat Layout */}
            <div className="space-y-1 md:space-y-2 mb-6 overflow-x-auto">
              {seatLayout.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex items-center gap-1 md:gap-2 min-w-max">
                  <span className="w-6 md:w-8 text-center font-semibold text-gray-600 text-sm md:text-base">
                    {String.fromCharCode(65 + rowIndex)}
                  </span>
                  <div className="flex gap-0.5 md:gap-1">
                    {row.map(seat => (
                      <button
                        key={seat.id}
                        onClick={() =>
                          !seat.isBooked && handleSeatClick(seat.id)
                        }
                        disabled={seat.isBooked}
                        className={`w-6 h-6 md:w-8 md:h-8 rounded-md text-xs font-semibold transition-colors ${
                          seat.isBooked
                            ? "bg-gray-300 cursor-not-allowed"
                            : selectedSeats.includes(seat.id)
                              ? "bg-red-600 text-white"
                              : "bg-green-100 hover:bg-green-200 text-green-800"
                        }`}>
                        {seat.number}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-4 md:gap-6 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-green-100 rounded"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-red-600 rounded"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-300 rounded"></div>
                <span>Booked</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Summary */}
        {selectedSeats.length > 0 && (
          <Card className="mb-6 md:mb-8">
            <CardContent className="p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm md:text-base">
                  <span>Selected Seats:</span>
                  <span>{selectedSeats.join(", ")}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span>Number of Tickets:</span>
                  <span>{selectedSeats.length}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
              <Button
                onClick={handleBooking}
                className="w-full mt-4 bg-red-600 hover:bg-red-700">
                Proceed to Confirm Booking
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Booking;
