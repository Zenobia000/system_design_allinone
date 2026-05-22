import Link from "next/link";

export default function Rail({ active }: { active?: "home" | "roles" | "deliverables" | "stages" | "about" }) {
  const is = (k: string) => (active === k ? "active" : "");
  return (
    <header className="rail">
      <Link href="/" className="brand">
        <img src="/logo/logo-main.png" alt="Launch Atlas logo" />
        <span>
          Launch<span className="dot">.</span>Atlas
        </span>
      </Link>
      <nav>
        <Link href="/roles/" className={is("roles")}>Roles</Link>
        <Link href="/stages/" className={is("stages")}>Stages</Link>
        <Link href="/deliverables/" className={is("deliverables") + " primary"}>Deliverables</Link>
        <Link href="/about/" className={is("about")}>About</Link>
      </nav>
    </header>
  );
}
