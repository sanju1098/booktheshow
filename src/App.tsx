import {Suspense} from "react";
import {RouterProvider, useNavigate} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {TooltipProvider} from "@/components/ui/tooltip";
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {ErrorBoundary} from "react-error-boundary";
import {CityProvider} from "./components/Navbar";
import {routes} from "./config/routes";
import {Button} from "./components/ui/button";

// Optional: fallback UI
const Loading = () => (
  <div className="flex items-center justify-center h-screen bg-white">
    <span className="loader relative inline-block w-12 h-12 border-4 border-black rounded-full animate-spin"></span>
  </div>
);
const ErrorFallback = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen flex-col space-y-6">
      <div className="text-center text-5xl text-red-500">
        Something went wrong.
      </div>
      <Button className="border-2 text-xl" onClick={() => navigate("/")}>
        Go to Home Page
      </Button>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CityProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<Loading />}>
            <RouterProvider router={routes} />
          </Suspense>
        </ErrorBoundary>
      </CityProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
