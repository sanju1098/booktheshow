import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {ArrowLeft, Download, Share, CheckCircle} from "lucide-react";
import QRCode from "qrcode";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [bookingId] = useState(() => `BTS${Date.now()}`);

  const bookingData = location.state;

  useEffect(() => {
    if (bookingData) {
      generateQRCode();
    }
  }, [bookingData]);

  const generateQRCode = async () => {
    const qrData = {
      bookingId,
      movie: bookingData.movie.title,
      theater: bookingData.theater.name,
      location: bookingData.theater.location,
      date: new Date(bookingData.date).toLocaleDateString("en-IN"),
      showtime: bookingData.showtime,
      seats: bookingData.selectedSeats,
      totalAmount: bookingData.totalAmount,
      userName: bookingData.user.name,
      timestamp: new Date().toISOString(),
    };

    try {
      const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrData), {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrCodeUrl(qrCodeDataURL);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = `BookTheShow-${bookingId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareBooking = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "BookTheShow Ticket",
          text: `Movie: ${bookingData.movie.title}\nTheater: ${bookingData.theater.name}\nSeats: ${bookingData.selectedSeats.join(", ")}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

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

  const {movie, theater, showtime, date, selectedSeats, totalAmount, user} =
    bookingData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-4 md:mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Home
        </Button>

        {/* Success Message */}
        <Card className="mb-6 md:mb-8">
          <CardContent className="p-4 md:p-6 text-center">
            <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600">
              Your tickets have been booked successfully
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Booking ID: {bookingId}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Booking Details */}
          <Card>
            <CardContent className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-6">
                Booking Details
              </h2>

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-20 h-28 md:w-24 md:h-36 object-cover rounded-lg mx-auto md:mx-0"
                  />
                  <div className="text-center md:text-left">
                    <h3 className="text-lg md:text-xl font-semibold">
                      {movie.title}
                    </h3>
                    <p className="text-gray-600">
                      {movie.genre} • {movie.duration}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer Name:</span>
                    <span className="font-semibold">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Theater:</span>
                    <span className="font-semibold">{theater.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold">{theater.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">
                      {new Date(date).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Show Time:</span>
                    <span className="font-semibold">{showtime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seats:</span>
                    <span className="font-semibold">
                      {selectedSeats.join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of Tickets:</span>
                    <span className="font-semibold">
                      {selectedSeats.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>Total Amount:</span>
                    <span className="text-red-600">₹{totalAmount}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code */}
          <Card>
            <CardContent className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
                Your E-Ticket
              </h2>

              <div className="text-center">
                {qrCodeUrl ? (
                  <div className="space-y-4">
                    <img
                      src={qrCodeUrl}
                      alt="Booking QR Code"
                      className="mx-auto border rounded-lg p-4 bg-white"
                    />
                    <p className="text-sm text-gray-600">
                      Show this QR code at the theater entrance
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Button
                        onClick={downloadQRCode}
                        variant="outline"
                        className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download QR
                      </Button>
                      <Button
                        onClick={shareBooking}
                        variant="outline"
                        className="flex items-center gap-2">
                        <Share className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">Generating QR code...</p>
                )}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Important Instructions:
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Arrive at the theater 30 minutes before showtime</li>
                  <li>• Carry a valid ID proof</li>
                  <li>• Show this QR code at the entrance</li>
                  <li>• No outside food or beverages allowed</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
