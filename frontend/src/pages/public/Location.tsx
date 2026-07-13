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

        <dl className="location-info">
          <div className="location-info__row">
            <dt>주소</dt>
            <dd>{companyInfo.address}</dd>
          </div>
          {companyInfo.nearbyInfo && (
            <div className="location-info__row">
              <dt>인근</dt>
              <dd>{companyInfo.nearbyInfo}</dd>
            </div>
          )}
          {companyInfo.parkingInfo && (
            <div className="location-info__row">
              <dt>주차</dt>
              <dd>{companyInfo.parkingInfo}</dd>
            </div>
          )}
        </dl>
      </div>
    </>
  );
}
