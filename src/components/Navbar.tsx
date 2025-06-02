import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Search, User, MapPin, Menu} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import AuthModal from "./AuthModal";
import {auth} from "@/lib/firebase";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {useToast} from "@/hooks/use-toast";

// Create City Context with proper typing
interface CityContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const useCityContext = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCityContext must be used within a CityProvider");
  }
  return context;
};

interface CityProviderProps {
  children: ReactNode;
}

export const CityProvider = ({children}: CityProviderProps) => {
  const [selectedCity, setSelectedCity] = useState("Bangalore");

  return (
    <CityContext.Provider value={{selectedCity, setSelectedCity}}>
      {children}
    </CityContext.Provider>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const {toast} = useToast();
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {selectedCity, setSelectedCity} = useCityContext();

  const cities = ["Bangalore", "Hyderabad", "Delhi", "Kochi", "Kolkata"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search Feature",
        description: `Searching for "${searchQuery}" in ${selectedCity}`,
      });
      // In a real app, implement search functionality here
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div
              className="text-xl md:text-2xl font-bold text-red-600 cursor-pointer"
              onClick={() => navigate("/")}>
              BookTheShow
            </div>

            {/* City Selector - Hidden on mobile */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedCity}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white z-50">
                  {cities.map(city => (
                    <DropdownMenuItem
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className="hover:bg-red-50">
                      {city}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {user.displayName || user.email?.split("@")[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white z-50">
                  <DropdownMenuItem
                    onClick={() => navigate("/bookings")}
                    className="hover:bg-red-50">
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="hover:bg-red-50">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="hover:bg-red-50 text-red-600">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white">
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  {/* City Selector */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Select City</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {selectedCity}
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white z-50 w-full">
                        {cities.map(city => (
                          <DropdownMenuItem
                            key={city}
                            onClick={() => setSelectedCity(city)}
                            className="hover:bg-red-50">
                            {city}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Search Bar */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Search</h3>
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search movies..."
                        className="pl-10 bg-gray-50 border-gray-200 focus:border-red-300"
                      />
                    </form>
                  </div>

                  {/* User Actions */}
                  <div className="space-y-2">
                    {user ? (
                      <>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => navigate("/bookings")}>
                          <User className="w-4 h-4 mr-2" />
                          My Bookings
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => navigate("/profile")}>
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-red-600"
                          onClick={handleSignOut}>
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setShowAuthModal(true)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white">
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </nav>
  );
};

export default Navbar;
