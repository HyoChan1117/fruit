import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ADMIN_NAV_ITEMS = [
  { to: "/admin", label: "대시보드", end: true },
  { to: "/admin/company-info", label: "청과 소개/연혁" },
  { to: "/admin/notices", label: "공지사항" },
  { to: "/admin/products", label: "취급 품목" },
  { to: "/admin/auction-results", label: "경매 결과" },
  { to: "/admin/gallery", label: "갤러리" },
  { to: "/admin/inquiries", label: "문의 내역" },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  async function handleLogout() {
    await logout();
    navigate("/admin/login");
  }

  return (
    <div className="admin-layout">
      <div className="admin-layout__topbar">
        <div className="admin-layout__brand">구천청과 관리자</div>
        <button
          type="button"
          className="site-header__toggle"
          aria-label={sidebarOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <aside className={sidebarOpen ? "admin-layout__sidebar admin-layout__sidebar--open" : "admin-layout__sidebar"}>
        <div className="admin-layout__brand admin-layout__brand--desktop">구천청과 관리자</div>
        <nav className="admin-layout__nav">
          {ADMIN_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-layout__user">
          <span>{user?.username}</span>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      </aside>
      <main className="admin-layout__content">
        <Outlet />
      </main>
    </div>
  );
}
