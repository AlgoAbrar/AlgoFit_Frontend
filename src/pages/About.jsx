import { useState, useEffect } from "react";
import {
  FiUsers,
  FiAward,
  FiHeart,
  FiTarget,
  FiArrowRight,
  FiPlay,
  FiCheck,
  FiStar,
  FiMapPin,
} from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: <FiUsers className="w-6 h-6" />,
      number: "10K+",
      label: "Happy Members",
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      number: "50+",
      label: "Expert Trainers",
    },
    {
      icon: <FiHeart className="w-6 h-6" />,
      number: "5+",
      label: "Years Experience",
    },
    {
      icon: <FiTarget className="w-6 h-6" />,
      number: "95%",
      label: "Success Rate",
    },
  ];

  const features = [
    "Personalized workout plans",
    "24/7 gym access",
    "Nutrition guidance",
    "Progress tracking",
    "Community support",
    "Professional equipment",
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Head Trainer",
      image:
        "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      social: { facebook: "#", twitter: "#", instagram: "#" },
    },
    {
      name: "Mike Chen",
      role: "Nutrition Specialist",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      social: { facebook: "#", twitter: "#", linkedin: "#" },
    },
    {
      name: "Emily Rodriguez",
      role: "Yoga Instructor",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      social: { instagram: "#", twitter: "#" },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            About AlgoFit
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transforming lives through fitness, one workout at a time
          </p>
          <button className="bg-primary hover:bg-primary-dark text-black px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
            Start Your Journey
            <FiArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-primary mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2025, AlgoFit started with a simple mission: to make
                premium fitness accessible to everyone. What began as a small
                local gym has grown into a comprehensive fitness community
                serving thousands of members.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our team of certified trainers and nutrition experts are
                dedicated to helping you achieve your fitness goals, whether
                you're just starting out or training for a competition.
              </p>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <FiCheck className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                alt="Gym interior"
                className="rounded-2xl shadow-xl"
              />
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <FiPlay className="w-8 h-8 text-white fill-current" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Certified professionals dedicated to your fitness journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary mb-4">{member.role}</p>
                  <div className="flex justify-center gap-3">
                    {member.social.facebook && (
                      <a
                        href={member.social.facebook}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <FaFacebook className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <FaTwitter className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.instagram && (
                      <a
                        href={member.social.instagram}
                        className="text-gray-400 hover:text-pink-600 transition-colors"
                      >
                        <FaInstagram className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="text-gray-400 hover:text-blue-700 transition-colors"
                      >
                        <FaLinkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl opacity-90">What drives us every day</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <FiHeart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p>
                Building a supportive environment where everyone feels welcome
                and encouraged.
              </p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <FiTarget className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p>
                Striving for the highest standards in everything we do, from
                training to service.
              </p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <FiStar className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p>
                Continuously improving our methods and facilities to provide the
                best experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of members who have already started their fitness
            journey with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary-dark text-black px-8 py-4 rounded-full font-semibold transition-colors duration-300">
              Get Started Today
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-300">
              Schedule a Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
