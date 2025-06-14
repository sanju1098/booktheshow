import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  User,
  ExternalLink,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-4">
              BookTheShow
            </h3>
            <p className="text-gray-300 mb-4">
              India's leading entertainment destination for booking movie
              tickets online with ease.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors">
                  Movies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors">
                  Theatres
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors">
                  Sports
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="text-gray-300">+91 90 1234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-600" />
                <span className="text-gray-300">support@booktheshow.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-600 mt-1" />
                <span className="text-gray-300">
                  Bangalore, Karnataka, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-red-600 mt-1" />
                <a
                  href="https://sanjay-dev-beta.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 underline">
                  Developer (Sanjay Kumar)
                </a>
                <ExternalLink className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} BookTheShow. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Available in:</span>
              <span className="text-gray-300 text-sm">
                Bangalore • Hyderabad • Delhi • Kochi • Kolkata
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
