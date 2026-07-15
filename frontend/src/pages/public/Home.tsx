import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCompanyInfo } from "../../api/companyInfo";
import { getNotices } from "../../api/notices";
import { getRecentAuctionResults } from "../../api/auctionResults";
import { AuctionResult, CompanyInfo, Notice } from "../../api/types";
import { AuctionTicker } from "../../components/AuctionTicker";
import { PopupBanner } from "../../components/PopupBanner";

const AUCTION_RESULTS_POOL_SIZE = 15;

const CURTAIN_OPEN_DELAY_MS = 100;
const CURTAIN_DURATION_MS = 1500;
const CURTAIN_DURATION_MOBILE_MS = 900;
const MOBILE_BREAKPOINT_QUERY = "(max-width: 768px)";
const TYPEWRITER_SPEED_MS = 55;
const HERO_READY_FAILSAFE_MS = 2000;

const FALLBACK_HEADLINE = "가장 신선한 순간을,\n선별합니다.";
const FALLBACK_SUBCOPY =
  "구천청과는 엄격한 기준으로 선별한 농산물을 산지에서 식탁까지 정직하게 전달하는 선과장입니다.";
const FALLBACK_TYPEWRITER_TEXT = "FRESH · SELECTED · DELIVERED";

export function Home() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [recentNotices, setRecentNotices] = useState<Notice[]>([]);
  const [recentAuctionResults, setRecentAuctionResults] = useState<AuctionResult[]>([]);
  const [curtainPhase, setCurtainPhase] = useState<"closed" | "opening" | "done">("closed");
  const [typedText, setTypedText] = useState("");
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    getCompanyInfo().then((info) => {
      setCompanyInfo(info);
      setHeroReady(true);
    });
    getNotices(1).then((res) => setRecentNotices(res.notices.slice(0, 5)));
    getRecentAuctionResults(AUCTION_RESULTS_POOL_SIZE).then(setRecentAuctionResults);
  }, []);

  useEffect(() => {
    const failsafeTimer = setTimeout(() => setHeroReady(true), HERO_READY_FAILSAFE_MS);
    return () => clearTimeout(failsafeTimer);
  }, []);

  useEffect(() => {
    if (!heroReady) return;
    const isMobile = window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches;
    const curtainDuration = isMobile ? CURTAIN_DURATION_MOBILE_MS : CURTAIN_DURATION_MS;
    const openTimer = setTimeout(() => setCurtainPhase("opening"), CURTAIN_OPEN_DELAY_MS);
    const doneTimer = setTimeout(() => {
      setCurtainPhase("done");
    }, CURTAIN_OPEN_DELAY_MS + curtainDuration);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(doneTimer);
    };
  }, [heroReady]);

  const typewriterText = companyInfo?.heroTypewriterText ?? FALLBACK_TYPEWRITER_TEXT;

  useEffect(() => {
    if (curtainPhase !== "opening") return;
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTypedText(typewriterText.slice(0, index));
      if (index >= typewriterText.length) clearInterval(interval);
    }, TYPEWRITER_SPEED_MS);
    return () => clearInterval(interval);
  }, [curtainPhase, typewriterText]);

  return (
    <div>
      {curtainPhase === "done" && companyInfo?.popupBannerEnabled && (
        <PopupBanner imageUrl={companyInfo.popupBannerImageUrl} linkUrl={companyInfo.popupBannerLinkUrl} />
      )}

      {curtainPhase !== "done" && (
        <div className={`curtain ${curtainPhase === "opening" ? "curtain--opening" : ""}`}>
          <div className="curtain__panel curtain__panel--1" />
          <div className="curtain__panel curtain__panel--2" />
          <div className="curtain__panel curtain__panel--3" />
        </div>
      )}

      <section className="hero">
        <div className="hero__inner">
          <span className="hero__kicker">GUCHEON CHEONGGWA</span>
          <h1 className="hero__headline">
            {(companyInfo?.heroHeadline ?? FALLBACK_HEADLINE).split("\n").map((line, index, arr) => (
              <span key={index}>
                {line}
                {index < arr.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="hero__typewriter">
            {typedText}
            <span className="hero__cursor" aria-hidden="true">
              |
            </span>
          </p>
          <p className="hero__subcopy">{companyInfo?.heroSubcopy ?? FALLBACK_SUBCOPY}</p>
          {(companyInfo?.businessHours || companyInfo?.holidays || companyInfo?.auctionTime) && (
            <ul className="hero__info">
              {companyInfo?.businessHours && (
                <li>
                  <strong>영업시간</strong> {companyInfo.businessHours}
                </li>
              )}
              {companyInfo?.holidays && (
                <li>
                  <strong>휴무일</strong> {companyInfo.holidays}
                </li>
              )}
              {companyInfo?.auctionTime && (
                <li>
                  <strong>경매시간</strong> {companyInfo.auctionTime}
                </li>
              )}
            </ul>
          )}
          <div className="hero__actions">
            <Link to="/products" className="btn btn--primary">
              취급 품목 보기
            </Link>
            <Link to="/contact" className="btn btn--outline">
              문의하기
            </Link>
          </div>
        </div>
        <div className="hero__scroll-indicator" aria-hidden="true">
          <span>↓</span>
        </div>
      </section>

      <nav className="quick-nav">
        <Link to="/notices">공지사항</Link>
        <Link to="/about">청과소개</Link>
        <Link to="/gallery">갤러리</Link>
        <Link to="/location">찾아오시는 길</Link>
      </nav>

      <section className="section">
        <div className="section__header">
          <h2 className="section__title">최근 경매 결과</h2>
          <Link to="/auction-results" className="section__more">
            자세히 보기 →
          </Link>
        </div>
        <AuctionTicker results={recentAuctionResults} />
      </section>

      <section className="section">
        <h2 className="section__title">최근 공지사항</h2>
        {recentNotices.map((notice) => (
          <div key={notice.id} className="list-item">
            <Link to={`/notices/${notice.id}`}>
              {notice.isPinned && (
                <span className="notice-pin-icon" title="상단 고정">
                  📢
                </span>
              )}
              {notice.title}
            </Link>
            <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
        {recentNotices.length === 0 && <p>등록된 공지사항이 없습니다.</p>}
      </section>

      <div className="cta-band">
        <p className="cta-band__title">궁금한 점이 있으신가요?</p>
        <div className="cta-band__actions">
          <Link to="/contact">문의하기</Link>
          <Link to="/location" className="outline">
            찾아오시는 길
          </Link>
        </div>
      </div>
    </div>
  );
}
