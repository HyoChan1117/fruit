import { useEffect, useState } from "react";
import { getCompanyInfo } from "../../api/companyInfo";
import { resolveImageUrl } from "../../api/client";
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
      <PageBanner eyebrow="COMPANY" title="청과 소개" />
      <div className="page-content">
        {(companyInfo.aboutImageUrl || companyInfo.aboutText) && (
          <div className="about-feature">
            {companyInfo.aboutImageUrl && (
              <img
                src={resolveImageUrl(companyInfo.aboutImageUrl)}
                alt="청과 소개"
                className="about-feature__image"
              />
            )}
            {companyInfo.aboutText && <p className="about-feature__text">{companyInfo.aboutText}</p>}
          </div>
        )}
      </div>
    </>
  );
}
