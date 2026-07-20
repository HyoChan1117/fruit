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
      <PageBanner title="청과 소개" />
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

        <div className="service-process">
          <h2 className="section__title">{companyInfo.serviceIntroTitle}</h2>
          <div className="service-process__row">
            {[
              { icon: companyInfo.valueCard1Icon, title: companyInfo.valueCard1Title, body: companyInfo.valueCard1Body },
              { icon: companyInfo.valueCard2Icon, title: companyInfo.valueCard2Title, body: companyInfo.valueCard2Body },
              { icon: companyInfo.valueCard3Icon, title: companyInfo.valueCard3Title, body: companyInfo.valueCard3Body },
              { icon: companyInfo.valueCard4Icon, title: companyInfo.valueCard4Title, body: companyInfo.valueCard4Body },
            ].map((step, index, steps) => (
              <div className="service-process__step-wrap" key={step.title}>
                <div className="service-process__step">
                  <span className="service-process__number">STEP {index + 1}</span>
                  <span className="service-process__icon" aria-hidden="true">
                    {step.icon}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
                {index < steps.length - 1 && (
                  <span className="service-process__arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
