export const cities: Record<
  string,
  {
    id: number;
    name: string;
    location: string;
    showtimes: string[];
    prices: {gold: number; premium: number; classic: number};
  }[]
> = {
  Bangalore: [
    {
      id: 1,
      name: "PVR Cinemas - Forum Mall",
      location: "Koramangala, Bangalore",
      showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
      prices: {gold: 450, premium: 350, classic: 250},
    },
    {
      id: 2,
      name: "INOX - Garuda Mall",
      location: "Magrath Road, Bangalore",
      showtimes: ["10:15 AM", "1:45 PM", "5:15 PM", "8:45 PM"],
      prices: {gold: 460, premium: 360, classic: 260},
    },
    {
      id: 3,
      name: "Cinepolis - Royal Meenakshi Mall",
      location: "Bannerghatta Road, Bangalore",
      showtimes: ["9:45 AM", "1:00 PM", "4:30 PM", "8:00 PM"],
      prices: {gold: 440, premium: 340, classic: 240},
    },
    {
      id: 4,
      name: "PVR Cinemas - Orion Mall",
      location: "Rajajinagar, Bangalore",
      showtimes: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"],
      prices: {gold: 470, premium: 370, classic: 270},
    },
  ],
  Hyderabad: [
    {
      id: 1,
      name: "PVR Cinemas - Panjagutta",
      location: "Panjagutta, Hyderabad",
      showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
      prices: {gold: 450, premium: 350, classic: 250},
    },
    {
      id: 2,
      name: "INOX - GVK One Mall",
      location: "Banjara Hills, Hyderabad",
      showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
      prices: {gold: 450, premium: 350, classic: 250},
    },
    {
      id: 3,
      name: "Asian - AMB Cinemas",
      location: "Gachibowli, Hyderabad",
      showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
      prices: {gold: 450, premium: 350, classic: 250},
    },
  ],
  Delhi: [
    {
      id: 1,
      name: "PVR Cinemas - Select City Walk",
      location: "Saket, Delhi",
      showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
      prices: {gold: 450, premium: 350, classic: 250},
    },
    {
      id: 2,
      name: "INOX - Janak Place",
      location: "Janakpuri, Delhi",
      showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
      prices: {gold: 450, premium: 350, classic: 250},
    },
    {
      id: 3,
      name: "Carnival - Pacific Mall",
      location: "Tagore Garden, Delhi",
      showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
      prices: {gold: 450, premium: 350, classic: 250},
    },
  ],
  Kochi: [
    {
      id: 1,
      name: "PVR Cinemas - Lulu Mall",
      location: "Edappally, Kochi",
      showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
      prices: {gold: 450, premium: 350, classic: 250},
    },
    {
      id: 2,
      name: "Cinepolis - Centre Square Mall",
      location: "M.G. Road, Kochi",
      showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
      prices: {gold: 450, premium: 350, classic: 250},
    },
    {
      id: 3,
      name: "Carnival - Oberon Mall",
      location: "Bypass Road, Kochi",
      showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
      prices: {gold: 450, premium: 350, classic: 250},
    },
  ],
  Kolkata: [
    {
      id: 1,
      name: "INOX - South City Mall",
      location: "Prince Anwar Shah Road, Kolkata",
      showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
      prices: {gold: 450, premium: 350, classic: 250},
    },
    {
      id: 2,
      name: "PVR Cinemas - Mani Square Mall",
      location: "EM Bypass, Kolkata",
      showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
      prices: {gold: 450, premium: 350, classic: 250},
    },
    {
      id: 3,
      name: "Carnival - Salt Lake",
      location: "Sector V, Salt Lake City, Kolkata",
      showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
      prices: {gold: 450, premium: 350, classic: 250},
    },
  ],
};
