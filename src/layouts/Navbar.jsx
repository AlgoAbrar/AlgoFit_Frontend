import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import useCartContext from "../hooks/useCartContext";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiUser,
  FiSettings,
  FiLogOut,
  FiSearch,
  FiHeart,
  FiHome,
  FiShoppingBag,
  FiUserPlus,
  FiLogIn,
} from "react-icons/fi";

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  const { cart } = useCartContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logoutUser();
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const navItems = [
    {
      path: "/",
      label: "Home",
      icon: <FiHome className="w-4 h-4 text-black" />,
    },
    {
      path: "/shop",
      label: "Shop",
      icon: <FiShoppingBag className="w-4 h-4 text-black" />,
    },
    {
      path: "/about",
      label: "About",
      icon: <FiUser className="w-4 h-4 text-black" />,
    },
    {
      path: "/contact",
      label: "Contact",
      icon: <FiSettings className="w-4 h-4 text-black" />,
    },
  ];

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center">
              <span>
                <img src="../assets/images/logo.png" alt="" />
              </span>
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              AlgoFit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 hover:text-primary hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plans..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <FiShoppingCart className="w-5 h-5" />
                  {cart?.items?.length > 0 && (
                    <span className="badge badge-sm badge-primary indicator-item">
                      {cart.items.length}
                    </span>
                  )}
                </div>
              </label>
              <div
                tabIndex={0}
                className="dropdown-content card card-compact w-72 mt-3 shadow-lg bg-white rounded-xl"
              >
                <div className="card-body p-4">
                  <h3 className="card-title text-sm">Shopping Cart</h3>
                  {cart?.items?.length > 0 ? (
                    <>
                      <p className="text-gray-600">
                        {cart.items.length} item
                        {cart.items.length !== 1 ? "s" : ""} • $
                        {cart.total_price?.toFixed(2)}
                      </p>
                      <div className="card-actions">
                        <Link
                          to="/dashboard/cart"
                          className="btn btn-primary btn-block"
                        >
                          View Cart
                        </Link>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      Your cart is empty
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* User Menu */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-circle avatar">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center text-white font-semibold text-sm">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-52 mt-3"
                >
                  <li className="px-4 py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-800">
                      {user.email}
                    </span>
                  </li>
                  <li>
                    <Link to="/dashboard" className="text-gray-700">
                      <FiUser className="w-4 h-4" /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist" className="text-gray-700">
                      <FiHeart className="w-4 h-4" /> Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="text-gray-700">
                      <FiSettings className="w-4 h-4" /> Settings
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-red-600">
                      <FiLogOut className="w-4 h-4" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="btn btn-ghost text-gray-700">
                  <FiLogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  <FiUserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden btn btn-ghost btn-circle"
            >
              {isMenuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 mt-2 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-4 mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search plans..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </form>

            <nav className="space-y-2 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}

              {!user && (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                  >
                    <FiLogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                  >
                    <FiUserPlus className="w-4 h-4" />
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
