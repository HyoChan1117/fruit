import { useEffect, useState } from "react";
import { getCompanyInfo, getCachedCompanyInfo } from "../api/companyInfo";
import { resolveImageUrl } from "../api/client";
import defaultBannerImage from "../assets/hero-bg.png";

interface PageBannerProps {
  title: string;
  subtitle?: string;
}

function resolveBannerImage(pageBannerImageUrl: string | null | undefined) {
  return pageBannerImageUrl ? resolveImageUrl(pageBannerImageUrl) ?? defaultBannerImage : defaultBannerImage;
}

export function PageBanner({ title, subtitle }: PageBannerProps) {
  const [bannerImageUrl, setBannerImageUrl] = useState(() =>
    resolveBannerImage(getCachedCompanyInfo()?.pageBannerImageUrl)
  );

  useEffect(() => {
    getCompanyInfo()
      .then((info) => setBannerImageUrl(resolveBannerImage(info.pageBannerImageUrl)))
      .catch(() => {});
  }, []);

  return (
    <div
      className="page-banner"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(20, 8, 6, 0.75) 0%, rgba(20, 8, 6, 0.35) 50%, rgba(20, 8, 6, 0.05) 100%), url(${bannerImageUrl})`,
      }}
    >
      <div className="page-banner__inner">
        <h1>{title}</h1>
        {subtitle && <p className="page-banner__subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}
