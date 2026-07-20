interface PageBannerProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function PageBanner({ eyebrow, title, subtitle }: PageBannerProps) {
  return (
    <div className="page-banner">
      <div className="page-banner__inner">
        {eyebrow && <p className="page-banner__eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p className="page-banner__subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}
