import { useEffect, useState } from "react";
import { getCompanyInfo } from "../api/companyInfo";
import { CompanyInfo } from "../api/types";

export function Footer() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    getCompanyInfo()
      .then(setCompanyInfo)
      .catch(() => setCompanyInfo(null));
  }, []);

  return (
    <footer className="site-footer">
      <p>구천청과</p>
      {companyInfo && (
        <>
          <p>{companyInfo.address}</p>
          {(companyInfo.businessHours || companyInfo.holidays || companyInfo.auctionTime) && (
            <p className="site-footer__info">
              {[
                companyInfo.businessHours && `영업시간 ${companyInfo.businessHours}`,
                companyInfo.holidays && `휴무일 ${companyInfo.holidays}`,
                companyInfo.auctionTime && `경매시간 ${companyInfo.auctionTime}`,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
        </>
      )}
    </footer>
  );
}
