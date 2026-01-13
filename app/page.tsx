import FeatureNews from "./components/features-news";
import HeroBanner from "./components/hero-banner";


export default function Home() {
  return (
   <>
  <main className="container mx-auto">
     
   <HeroBanner/>
   <FeatureNews/>
  </main>
   </>
  );
}
