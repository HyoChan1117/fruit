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

        <div className="summary-grid">
          <div className="summary-card">
            <h3>{companyInfo.valueCard1Title}</h3>
            <p>{companyInfo.valueCard1Body}</p>
          </div>
          <div className="summary-card">
            <h3>{companyInfo.valueCard2Title}</h3>
            <p>{companyInfo.valueCard2Body}</p>
          </div>
          <div className="summary-card">
            <h3>{companyInfo.valueCard3Title}</h3>
            <p>{companyInfo.valueCard3Body}</p>
          </div>
        </div>
      </div>
    </>
  );
}
