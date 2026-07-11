import { Link } from "react-router-dom";

const SECTIONS = [
  { to: "/admin/company-info", label: "청과 소개/연혁 관리" },
  { to: "/admin/notices", label: "공지사항 관리" },
  { to: "/admin/products", label: "취급 품목 관리" },
  { to: "/admin/auction-results", label: "경매 결과 관리" },
  { to: "/admin/gallery", label: "갤러리 관리" },
  { to: "/admin/inquiries", label: "문의 내역 관리" },
];

export function Dashboard() {
  return (
    <div>
      <h1>관리자 대시보드</h1>
      <ul>
        {SECTIONS.map((section) => (
          <li key={section.to}>
            <Link to={section.to}>{section.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
