import { FormEvent, useEffect, useState } from "react";
import { getCompanyInfo, updateCompanyInfo } from "../../api/companyInfo";
import { CompanyInfo } from "../../api/types";

export function CompanyInfoEditor() {
  const [introText, setIntroText] = useState("");
  const [address, setAddress] = useState("");
  const [nearbyInfo, setNearbyInfo] = useState("");
  const [parkingInfo, setParkingInfo] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [heroHeadline, setHeroHeadline] = useState("");
  const [heroSubcopy, setHeroSubcopy] = useState("");
  const [heroTypewriterText, setHeroTypewriterText] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [holidays, setHolidays] = useState("");
  const [auctionTime, setAuctionTime] = useState("");
  const [valueCard1Title, setValueCard1Title] = useState("");
  const [valueCard1Body, setValueCard1Body] = useState("");
  const [valueCard2Title, setValueCard2Title] = useState("");
  const [valueCard2Body, setValueCard2Body] = useState("");
  const [valueCard3Title, setValueCard3Title] = useState("");
  const [valueCard3Body, setValueCard3Body] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getCompanyInfo().then((info: CompanyInfo) => {
      setIntroText(info.introText);
      setAddress(info.address);
      setNearbyInfo(info.nearbyInfo ?? "");
      setParkingInfo(info.parkingInfo ?? "");
      setLatitude(info.latitude != null ? String(info.latitude) : "");
      setLongitude(info.longitude != null ? String(info.longitude) : "");
      setHeroHeadline(info.heroHeadline);
      setHeroSubcopy(info.heroSubcopy);
      setHeroTypewriterText(info.heroTypewriterText);
      setBusinessHours(info.businessHours ?? "");
      setHolidays(info.holidays ?? "");
      setAuctionTime(info.auctionTime ?? "");
      setValueCard1Title(info.valueCard1Title);
      setValueCard1Body(info.valueCard1Body);
      setValueCard2Title(info.valueCard2Title);
      setValueCard2Body(info.valueCard2Body);
      setValueCard3Title(info.valueCard3Title);
      setValueCard3Body(info.valueCard3Body);
    });
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaved(false);
    await updateCompanyInfo({
      introText,
      address,
      nearbyInfo: nearbyInfo || null,
      parkingInfo: parkingInfo || null,
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null,
      heroHeadline,
      heroSubcopy,
      heroTypewriterText,
      businessHours: businessHours || null,
      holidays: holidays || null,
      auctionTime: auctionTime || null,
      valueCard1Title,
      valueCard1Body,
      valueCard2Title,
      valueCard2Body,
      valueCard3Title,
      valueCard3Body,
    });
    setSaved(true);
  }

  return (
    <div>
      <h1>청과 소개 관리</h1>
      {saved && <p>저장되었습니다.</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: 640 }}>
        <h2>홈 화면 히어로 문구</h2>
        <label>헤드라인 (줄바꿈하려면 Enter)</label>
        <textarea rows={2} value={heroHeadline} onChange={(e) => setHeroHeadline(e.target.value)} />

        <label>서브카피</label>
        <textarea rows={3} value={heroSubcopy} onChange={(e) => setHeroSubcopy(e.target.value)} />

        <label>타이핑 문구 (영문 짧은 슬로건)</label>
        <input value={heroTypewriterText} onChange={(e) => setHeroTypewriterText(e.target.value)} />

        <h2>청과 소개 (홈 화면 카드 3개)</h2>
        <label>카드 1 제목</label>
        <input value={valueCard1Title} onChange={(e) => setValueCard1Title(e.target.value)} />
        <label>카드 1 본문</label>
        <textarea rows={2} value={valueCard1Body} onChange={(e) => setValueCard1Body(e.target.value)} />

        <label>카드 2 제목</label>
        <input value={valueCard2Title} onChange={(e) => setValueCard2Title(e.target.value)} />
        <label>카드 2 본문</label>
        <textarea rows={2} value={valueCard2Body} onChange={(e) => setValueCard2Body(e.target.value)} />

        <label>카드 3 제목</label>
        <input value={valueCard3Title} onChange={(e) => setValueCard3Title(e.target.value)} />
        <label>카드 3 본문</label>
        <textarea rows={2} value={valueCard3Body} onChange={(e) => setValueCard3Body(e.target.value)} />

        <h2>청과 소개 페이지 문구</h2>
        <label>소개 문구</label>
        <textarea rows={5} value={introText} onChange={(e) => setIntroText(e.target.value)} />

        <label>주소</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>인근 (예: 구천보건지소 맞은편, 구천면사무소 인근)</label>
        <input value={nearbyInfo} onChange={(e) => setNearbyInfo(e.target.value)} />

        <label>주차 (예: 무료 주차 가능)</label>
        <input value={parkingInfo} onChange={(e) => setParkingInfo(e.target.value)} />

        <label>위도 / 경도 (네이버 지도용)</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input placeholder="위도" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
          <input placeholder="경도" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        </div>


        <h2>운영 안내</h2>
        <label>영업시간 (예: 매일 05:00 - 18:00)</label>
        <input value={businessHours} onChange={(e) => setBusinessHours(e.target.value)} />

        <label>휴무일 (예: 매주 일요일, 법정공휴일)</label>
        <input value={holidays} onChange={(e) => setHolidays(e.target.value)} />

        <label>경매시간 (예: 매일 06:00)</label>
        <input value={auctionTime} onChange={(e) => setAuctionTime(e.target.value)} />

        <button type="submit">저장</button>
      </form>
    </div>
  );
}
