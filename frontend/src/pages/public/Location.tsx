import { useEffect, useState } from "react";
import { getCompanyInfo } from "../../api/companyInfo";
import { CompanyInfo } from "../../api/types";
import { NaverMap } from "../../components/NaverMap";
import { PageBanner } from "../../components/PageBanner";

export function Location() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    getCompanyInfo().then(setCompanyInfo);
  }, []);

  if (!companyInfo) return <p>불러오는 중...</p>;

  return (
    <>
      <PageBanner title="찾아오시는 길" subtitle={companyInfo.address} />
      <div className="page-content">
        {companyInfo.latitude != null && companyInfo.longitude != null ? (
          <NaverMap latitude={companyInfo.latitude} longitude={companyInfo.longitude} />
        ) : (
          <p>관리자가 아직 좌표를 등록하지 않았습니다.</p>
        )}
      </div>
    </>
  );
}
