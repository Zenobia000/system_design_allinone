import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer ink">
      <div className="row">
        <div className="brand-block">
          <span className="mark">
            <img src="/logo/logo-main.png" alt="Launch Atlas logo" />
            落地圖鑑 · Launch Atlas
          </span>
          <p>
            一張從假設走到可運維系統的地圖。9 角色、54 交付物、6 階段、每張卡附 AI 加速 prompt。
          </p>
          <p style={{ marginTop: 4 }} className="mono">
            <span style={{ color: "var(--accent)" }}>·</span> Part of System Design All-in-One
          </p>
        </div>
        <div>
          <h4>Atlas</h4>
          <ul>
            <li><Link href="/roles/">10 角色</Link></li>
            <li><Link href="/stages/">6 階段</Link></li>
            <li><Link href="/deliverables/">54 交付物</Link></li>
            <li><Link href="/about/">About</Link></li>
          </ul>
        </div>
        <div>
          <h4>姊妹專案</h4>
          <ul>
            <li><a href="../system_design/">系統設計實戰</a></li>
            <li><a href="../software_architect/">架構師藍圖</a></li>
            <li><a href="../software_develop_journey/">軟體開發旅程</a></li>
            <li><a href="../ai_native_system_design/">AI 時代速成</a></li>
          </ul>
        </div>
        <div>
          <h4>配套視圖</h4>
          <ul>
            <li><a href="/atlas-map.html">Blueprint Studio</a></li>
            <li><Link href="/about/">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="end">
        <span>© 2026 · Launch Atlas · MIT License</span>
        <span>
          <a href="https://sunnydatascience.com/" target="_blank" rel="noopener" className="lab-credit">
            桑尼資料科學 Lab 出品 <span style={{ color: "var(--accent)" }}>↗</span>
          </a>
        </span>
      </div>
    </footer>
  );
}
