import { useState } from "react";
import {
  FiHeart,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
  FiSend,
  FiArrowUp,
} from "react-icons/fi";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      // Simulate API call
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-dark transition-all duration-300 hover:-translate-y-1"
        aria-label="Back to top"
      >
        <FiArrowUp className="w-5 h-5" />
      </button>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-red-800 font-bold text-lg">AF</span>
              </div>
              <span className="text-xl font-bold">AlgoFit</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Transform your body and mind with our premium fitness plans. Join
              thousands of satisfied members achieving their fitness goals.
            </p>
            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <FiMapPin className="w-4 h-4" />
              <span className="text-sm">Rajshahi, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <FiPhone className="w-4 h-4" />
              <span className="text-sm">+8801719718686</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <FiMail className="w-4 h-4" />
              <span className="text-sm">info@algofit.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Our Trainers",
                "Testimonials",
                "Blog",
                "Careers",
                "FAQs",
                "Support Center",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                "Personal Training",
                "Group Classes",
                "Yoga & Meditation",
                "Weight Loss",
                "Muscle Building",
                "Nutrition Planning",
                "Online Coaching",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to our newsletter for the latest fitness tips and
              exclusive offers.
            </p>

            {isSubscribed ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-400 text-sm text-center">
                  🎉 Thank you for subscribing!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-black py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FiSend className="w-4 h-4" />
                  Subscribe
                </button>
              </form>
            )}

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-white">
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                {[
                  {
                    icon: <FiFacebook className="w-5 h-5" />,
                    label: "Facebook",
                  },
                  { icon: <FiTwitter className="w-5 h-5" />, label: "Twitter" },
                  {
                    icon: <FiInstagram className="w-5 h-5" />,
                    label: "Instagram",
                  },
                  { icon: <FiYoutube className="w-5 h-5" />, label: "YouTube" },
                  {
                    icon: <FiLinkedin className="w-5 h-5" />,
                    label: "LinkedIn",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-all duration-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>© 2025 AlgoFit. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-black transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-black transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <FiHeart className="w-4 h-4 text-red-400" />
            <span>for Phitron</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
