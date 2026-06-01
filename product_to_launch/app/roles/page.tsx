import type { Metadata } from "next";
import Rail from "@/components/Rail";
import RolesCompass from "@/components/RolesCompass";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "12 角色 · Roles",
  description: "從 PM 到 SRE，12 個角色，每個都解決一種特定的不確定性。",
  alternates: {
    canonical: "/roles/",
    languages: { "zh-Hant": "/roles/", "x-default": "/roles/" },
  },
};

export default function RolesIndexPage() {
  return (
    <>
      <Rail active="roles" />
      <main>
        <section className="detail-hero">
          <div className="container">
            <div>
              <div className="meta-row">
                <span className="tag accent">Atlas · Roles</span>
                <span className="tag">12 個角色</span>
              </div>
              <h1>誰在這條路上同行。</h1>
              <p className="hook">
                從 PM 到 SRE，12 個角色，每個都對一種不確定性負責 — PM 負責「對不對」、Architect 負責「擴不擴得起來」、SRE 負責「凌晨三點還活不活著」。
              </p>
            </div>
          </div>
        </section>
        <RolesCompass />
      </main>
      <Footer />
    </>
  );
}
