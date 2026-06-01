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
                  58 張交付物、六個階段、十一個角色 —
                  蹲進來只看到一堆名詞。
                  5 題口語問卷幫你勾勒專案輪廓，
                  系統選出你現在必走的 15 張卡 + AI 提示詞。
                </p>
                <p className="cta-tag">為讓實務能走起來而設計</p>
              </div>
              <Link href="/start/" className="cta-primary">
                開始填問卷 →
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
