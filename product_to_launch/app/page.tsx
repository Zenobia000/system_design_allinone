import Rail from "@/components/Rail";
import Hero from "@/components/Hero";
import VowsTriad from "@/components/VowsTriad";
import RolesCompass from "@/components/RolesCompass";
import FeaturedDeliverables from "@/components/FeaturedDeliverables";
import MapCTA from "@/components/MapCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Rail active="home" />
      <main>
        <Hero />
        <VowsTriad />
        <RolesCompass variant="compact" />
        <FeaturedDeliverables />
        <MapCTA />
      </main>
      <Footer />
    </>
  );
}
