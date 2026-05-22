const VOWS = [
  {
    n: "Vow · 01",
    h: "不背名詞，學決策",
    p: "每張卡只回答三件事：解決什麼問題、代價是什麼、什麼時候不該用。如果背完名詞還是不會選，那就還沒學會。",
  },
  {
    n: "Vow · 02",
    h: "Why / How / Trade-off",
    p: "Why 是動機，How 是機制，Trade-off 是真正的工程。任何技術都該能用這三段拆解；只能講 What 的人不是架構師。",
  },
  {
    n: "Vow · 03",
    h: "AI 加速三問",
    p: "這個交付物 AI 能加速哪一步？哪一步必須留給人？人在這一步的判斷依據是什麼？答得出來，AI 才是放大器而不是替代品。",
  },
];

export default function VowsTriad() {
  return (
    <section className="section">
      <div className="section-head">
        <span className="label">+ Three Vows · 三個承諾</span>
        <h2>讀完這份地圖，你會得到什麼。</h2>
        <p className="sub">
          這不是一份「62 種框架精選」清單，而是一座從假設到上線的可走完地圖。
          我們承諾三件事——讓你能跟同事說清楚自己為什麼這樣決定。
        </p>
      </div>
      <div className="vows">
        {VOWS.map((v) => (
          <div className="vow" key={v.h}>
            <span className="n">{v.n}</span>
            <h3>{v.h}</h3>
            <p>{v.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
