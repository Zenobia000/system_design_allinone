import Link from "next/link";
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
        <section className="section">
          <div className="container">
            <div className="workshop-cta-card">
              <div className="cta-body">
                <h3>不知道從哪張卡開始？</h3>
                <p>
                  58 張交付物、六個階段、十二個角色，一開始只會看到一堆名詞。
                  5 題口語問卷先建立專案底稿，再用 15 張核心卡理解完整流程。
                  真正進入專案時，只選現在需要的文件並把工作包交給 Coding Agent。
                </p>
                <p className="cta-tag">為讓實務能走起來而設計</p>
              </div>
              <Link href="/start/" className="cta-primary">
                建立專案底稿 →
              </Link>
            </div>
          </div>
        </section>
        <VowsTriad />
        <RolesCompass variant="compact" />
        <FeaturedDeliverables />
        <MapCTA />
      </main>
      <Footer />
    </>
  );
}
