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
      <PageBanner eyebrow="LOCATION" title="찾아오시는 길" subtitle={companyInfo.address} />
      <div className="page-content">
        <div className="location-layout">
          <div className="location-layout__map">
            {companyInfo.latitude != null && companyInfo.longitude != null ? (
              <NaverMap latitude={companyInfo.latitude} longitude={companyInfo.longitude} />
            ) : (
              <p>관리자가 아직 좌표를 등록하지 않았습니다.</p>
            )}
          </div>

          <dl className="location-info">
            <div className="location-info__row">
              <dt>
                <span aria-hidden="true">🏪</span> 명칭
              </dt>
              <dd>구천청과</dd>
            </div>
            <div className="location-info__row">
              <dt>
                <span aria-hidden="true">📍</span> 주소
              </dt>
              <dd>{companyInfo.address}</dd>
            </div>
            {companyInfo.businessHours && (
              <div className="location-info__row">
                <dt>
                  <span aria-hidden="true">🕒</span> 영업시간
                </dt>
                <dd>{companyInfo.businessHours}</dd>
              </div>
            )}
            {companyInfo.holidays && (
              <div className="location-info__row">
                <dt>
                  <span aria-hidden="true">📅</span> 휴무
                </dt>
                <dd>{companyInfo.holidays}</dd>
              </div>
            )}
            {companyInfo.nearbyInfo && (
              <div className="location-info__row">
                <dt>
                  <span aria-hidden="true">🗺️</span> 인근
                </dt>
                <dd>{companyInfo.nearbyInfo}</dd>
              </div>
            )}
            {companyInfo.parkingInfo && (
              <div className="location-info__row">
                <dt>
                  <span aria-hidden="true">🚗</span> 주차
                </dt>
                <dd>{companyInfo.parkingInfo}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </>
  );
}
