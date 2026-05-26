import Link from "next/link";

type Key = "home" | "roles" | "stages" | "deliverables" | "start" | "workshop" | "about";

const LINKS: Array<{ href: string; label: string; key: Key; primary?: boolean }> = [
  { href: "/start/",        label: "Workshop",     key: "start" },
  { href: "/roles/",        label: "Roles",        key: "roles" },
  { href: "/stages/",       label: "Stages",       key: "stages" },
  { href: "/deliverables/", label: "Deliverables", key: "deliverables", primary: true },
  { href: "/about/",        label: "About",        key: "about" },
];

// Pure server component. Drawer state managed by a tiny eager-running
// script (~500B) injected once below; no React hydration, no client
// runtime, no TBT cost.
const DRAWER_SCRIPT = `(function(){var b=document.getElementById("rail-burger");var d=document.getElementById("rail-drawer");var s=document.getElementById("rail-scrim");if(!b||!d||!s)return;var h=document.documentElement;var open=false;function set(v){open=v;b.setAttribute("aria-expanded",String(v));b.setAttribute("aria-label",v?"關閉選單":"開啟選單");d.classList.toggle("is-open",v);s.classList.toggle("is-open",v);d.hidden=!v;h.style.overflow=v?"hidden":"";var bars=b.querySelector(".rail-burger-bars");if(bars)bars.classList.toggle("is-open",v);}b.addEventListener("click",function(){set(!open);});s.addEventListener("click",function(){set(false);});document.addEventListener("keydown",function(e){if(e.key==="Escape"&&open)set(false);});d.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){set(false);});});})();`;

export default function Rail({ active }: { active?: Key }) {
  return (
    <header className="rail">
      <Link href="/" className="brand">
        <img
          src="/logo/logo-main.png"
          alt="Launch Atlas logo"
          width="32"
          height="32"
          decoding="async"
        />
        <span>
          Launch<span className="dot">.</span>Atlas
        </span>
      </Link>

      <nav className="rail-nav-desktop" aria-label="Primary">
        {LINKS.map((l) => (
          <Link
            key={l.key}
            href={l.href}
            className={`${active === l.key ? "active" : ""} ${l.primary ? "primary" : ""}`.trim()}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        id="rail-burger"
        className="rail-burger"
        aria-label="開啟選單"
        aria-expanded="false"
        aria-controls="rail-drawer"
      >
        <span className="rail-burger-bars">
          <span /><span /><span />
        </span>
      </button>

      <div
        id="rail-drawer"
        className="rail-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="主選單"
        hidden
      >
        <nav className="rail-drawer-nav" aria-label="Primary mobile">
          {LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className={active === l.key ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <button
        type="button"
        id="rail-scrim"
        className="rail-scrim"
        aria-label="關閉選單"
        tabIndex={-1}
      />

      <script dangerouslySetInnerHTML={{ __html: DRAWER_SCRIPT }} />
    </header>
  );
}
