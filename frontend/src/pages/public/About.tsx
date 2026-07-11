import { useEffect, useState } from "react";
import { getCompanyInfo } from "../../api/companyInfo";
import { CompanyInfo } from "../../api/types";
import { PageBanner } from "../../components/PageBanner";

export function About() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    getCompanyInfo().then(setCompanyInfo);
  }, []);

  if (!companyInfo) return <p>불러오는 중...</p>;

  return (
    <>
      <PageBanner title="청과 소개" />
      <div className="page-content">
        <p>{companyInfo.introText}</p>

        <h2>연혁</h2>
        <ul>
          {companyInfo.history.map((entry, index) => (
            <li key={index}>
              {entry.year}
              {entry.month ? `.${entry.month}` : ""} — {entry.description}
            </li>
          ))}
          {companyInfo.history.length === 0 && <p>등록된 연혁이 없습니다.</p>}
        </ul>

        <h2>연락처</h2>
        <p>주소: {companyInfo.address}</p>
        <p>전화: {companyInfo.phone}</p>
        <p>이메일: {companyInfo.email}</p>
      </div>
    </>
  );
}
