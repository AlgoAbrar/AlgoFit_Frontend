import HeroCarousel from "../components/Home/Carousel/HeroCarousel";
import Membership from "../components/Home/Memberships/Membership";
import DiscountSection from "../components/Home/Discount/DiscountSection";
import Features from "../components/Home/Features";
import Plan from "../components/Plans/Plan";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <Features />
      <Membership />
      <Plan />
      <DiscountSection />
    </div>
  );
};

export default Home;
