interface PageBannerProps {
  title: string;
  subtitle?: string;
}

export function PageBanner({ title, subtitle }: PageBannerProps) {
  return (
    <div className="page-banner">
      <div className="page-banner__inner">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}
