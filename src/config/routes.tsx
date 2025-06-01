import Navbar from "@/components/Navbar";
import {lazy} from "react";
import {createBrowserRouter, Outlet} from "react-router-dom";

// Lazy-loaded pages
const Index = lazy(() => import("@/pages/Index"));
const MovieDetails = lazy(() => import("@/pages/MovieDetails"));
const Booking = lazy(() => import("@/pages/Booking"));
const Confirmation = lazy(() => import("@/pages/Confirmation"));
const MyBookings = lazy(() => import("@/pages/MyBookings"));
const Profile = lazy(() => import("@/pages/Profile"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {index: true, element: <Index />},
      {path: "movie/:id", element: <MovieDetails />},
      {path: "booking/:id", element: <Booking />},
      {path: "confirmation/:id", element: <Confirmation />},
      {path: "bookings", element: <MyBookings />},
      {path: "profile", element: <Profile />},
      {path: "*", element: <NotFound />},
    ],
  },
]);
