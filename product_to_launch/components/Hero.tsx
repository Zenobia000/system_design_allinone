export default function Hero() {
  return (
    <section className="hero ink">
      <div className="hero-art" aria-hidden />
      <span className="tagline">Atlas · No. 01 · Edition 2026</span>
      <h1>
        從一個假設，
        <br />
        到一座 <em>可運維</em>
        <br />
        的系統。
      </h1>
      <p className="lede">
        11 個角色 · <b>58 個交付物</b> · 一張可走完的地圖。
        <br />
        每張卡片只回答四件事：<b>解決什麼、誰負責、何時用、AI 怎麼加速</b>。
      </p>
      <div className="meta">
        <span><i /> 6 Stages</span>
        <span><i /> 11 Roles</span>
        <span><i /> 58 Deliverables</span>
        <span><i /> AI-augmented</span>
      </div>
    </section>
  );
}
