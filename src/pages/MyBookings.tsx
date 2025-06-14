import {useState, useEffect} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Calendar, Clock, MapPin, User, Download, QrCode} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {auth} from "@/lib/firebase";
import {onAuthStateChanged} from "firebase/auth";

const MyBookings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      if (!user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Sample booking data (in real app, fetch from Firebase/Supabase)
  const bookings: any = [
    // {
    //   id: 1,
    //   movieTitle: "Avengers: Endgame",
    //   moviePoster:
    //     "https://images.unsplash.com/photo-1478720568477-b2709d01a50b?w=300&h=450&fit=crop",
    //   theaterName: "PVR Cinemas - Forum Mall",
    //   location: "Koramangala, Bangalore",
    //   date: "2024-06-15",
    //   time: "6:00 PM",
    //   seats: ["E5", "E6"],
    //   amount: 700,
    //   bookingId: "BTS001",
    //   status: "confirmed",
    // },
    // {
    //   id: 2,
    //   movieTitle: "Spider-Man: No Way Home",
    //   moviePoster:
    //     "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
    //   theaterName: "INOX - Mantri Square",
    //   location: "Malleshwaram, Bangalore",
    //   date: "2024-06-10",
    //   time: "9:30 PM",
    //   seats: ["F3", "F4", "F5"],
    //   amount: 950,
    //   bookingId: "BTS002",
    //   status: "completed",
    // },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Please sign in to view your bookings
            </h1>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <User className="text-red-600 w-8 h-8" />
          <h1 className="text-3xl font-bold">My Bookings</h1>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">No bookings found</h2>
            <p className="text-gray-600 mb-6">
              You haven't booked any tickets yet.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-red-600 hover:bg-red-700">
              Book Your First Ticket
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings?.map((booking: any) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Movie Poster */}
                    <div className="md:w-32 md:h-48 w-full h-32">
                      <img
                        src={booking.moviePoster}
                        alt={booking.movieTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-bold">
                              {booking.movieTitle}
                            </h3>
                            <Badge
                              variant={
                                booking.status === "confirmed"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                booking.status === "confirmed"
                                  ? "bg-green-500"
                                  : ""
                              }>
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </Badge>
                          </div>

                          <div className="space-y-2 text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>
                                {booking.theaterName}, {booking.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(booking.date).toLocaleDateString(
                                  "en-IN",
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{booking.time}</span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <p className="text-sm text-gray-600">
                              Seats:{" "}
                              <span className="font-semibold">
                                {booking.seats.join(", ")}
                              </span>
                            </p>
                            <p className="text-sm text-gray-600">
                              Booking ID:{" "}
                              <span className="font-semibold">
                                {booking.bookingId}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600 mb-4">
                            ₹{booking.amount}
                          </div>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                navigate(`/confirmation/${booking.id}`)
                              }
                              className="w-full">
                              <QrCode className="w-4 h-4 mr-2" />
                              View Ticket
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
