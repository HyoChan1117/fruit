import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "홈", end: true },
  { to: "/about", label: "청과 소개" },
  { to: "/notices", label: "공지사항" },
  { to: "/products", label: "취급 품목" },
  { to: "/auction-results", label: "경매 결과" },
  { to: "/gallery", label: "갤러리" },
  { to: "/location", label: "찾아오시는 길" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  const headerClassNames = ["site-header"];
  if (isHome) headerClassNames.push("site-header--overlay");
  if (menuOpen) headerClassNames.push("site-header--menu-open");

  return (
    <header className={headerClassNames.join(" ")}>
      <div className="site-header__brand">구천청과</div>
      <button
        type="button"
        className={menuOpen ? "site-header__toggle site-header__toggle--open" : "site-header__toggle"}
        aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={menuOpen ? "site-header__nav site-header__nav--open" : "site-header__nav"}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}
          >
            {item.label}
          </NavLink>
        ))}
        <NavLink to="/contact" className="site-header__cta">
          문의하기
        </NavLink>
      </nav>
    </header>
  );
}
