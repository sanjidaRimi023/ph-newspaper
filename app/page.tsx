import FeatureNews from "./components/features-news";
import HeroBanner from "./components/hero-banner";
import Navbar from "./components/navbar";

export default function Home() {
  return (
   <><Navbar/>
  <main className="container mx-auto">
     
   <HeroBanner/>
   <FeatureNews/>
  </main>
   </>
  );
}
