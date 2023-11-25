import AvailableEvent from "@/components/ui/Home/AvailableEvent";
import Blogs from "@/components/ui/Home/Blogs";
import CTA from "@/components/ui/Home/CTA";
import EventGallery from "@/components/ui/Home/EventGallery";
import Features from "@/components/ui/Home/Features";
import Hero from "@/components/ui/Home/Hero";
import Partners from "@/components/ui/Home/Partners";
import Reviews from "@/components/ui/Home/Reviews";
import SearchBar from "@/components/ui/Home/SearchBar";
import UpcomingEvents from "@/components/ui/Home/UpcomingEvents";

const Home = () => {
  return (
    <div>
      <Hero />
      <SearchBar />
      <Features />
      <UpcomingEvents />
      <AvailableEvent />
      <Partners />
      <EventGallery />
      <Blogs />
      <Reviews />
      <CTA />
    </div>
  );
};

export default Home;
