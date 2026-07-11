import { FormEvent, useEffect, useState } from "react";
import { getCompanyInfo, updateCompanyInfo } from "../../api/companyInfo";
import { CompanyInfo } from "../../api/types";

type HistoryEntry = { year: string; month?: string; description: string };

export function CompanyInfoEditor() {
  const [introText, setIntroText] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [heroHeadline, setHeroHeadline] = useState("");
  const [heroSubcopy, setHeroSubcopy] = useState("");
  const [heroTypewriterText, setHeroTypewriterText] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [holidays, setHolidays] = useState("");
  const [auctionTime, setAuctionTime] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getCompanyInfo().then((info: CompanyInfo) => {
      setIntroText(info.introText);
      setHistory(info.history ?? []);
      setAddress(info.address);
      setLatitude(info.latitude != null ? String(info.latitude) : "");
      setLongitude(info.longitude != null ? String(info.longitude) : "");
      setPhone(info.phone);
      setEmail(info.email);
      setHeroHeadline(info.heroHeadline);
      setHeroSubcopy(info.heroSubcopy);
      setHeroTypewriterText(info.heroTypewriterText);
      setBusinessHours(info.businessHours ?? "");
      setHolidays(info.holidays ?? "");
      setAuctionTime(info.auctionTime ?? "");
    });
  }, []);

  function updateHistoryEntry(index: number, field: keyof HistoryEntry, value: string) {
    setHistory((prev) => prev.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry)));
  }

  function addHistoryEntry() {
    setHistory((prev) => [...prev, { year: "", month: "", description: "" }]);
  }

  function removeHistoryEntry(index: number) {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaved(false);
    await updateCompanyInfo({
      introText,
      history,
      address,
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null,
      phone,
      email,
      heroHeadline,
      heroSubcopy,
      heroTypewriterText,
      businessHours: businessHours || null,
      holidays: holidays || null,
      auctionTime: auctionTime || null,
    });
    setSaved(true);
  }

  return (
    <div>
      <h1>청과 소개/연혁 관리</h1>
      {saved && <p>저장되었습니다.</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: 640 }}>
        <h2>홈 화면 히어로 문구</h2>
        <label>헤드라인 (줄바꿈하려면 Enter)</label>
        <textarea rows={2} value={heroHeadline} onChange={(e) => setHeroHeadline(e.target.value)} />

        <label>서브카피</label>
        <textarea rows={3} value={heroSubcopy} onChange={(e) => setHeroSubcopy(e.target.value)} />

        <label>타이핑 문구 (영문 짧은 슬로건)</label>
        <input value={heroTypewriterText} onChange={(e) => setHeroTypewriterText(e.target.value)} />

        <h2>청과 소개</h2>
        <label>소개 문구</label>
        <textarea rows={5} value={introText} onChange={(e) => setIntroText(e.target.value)} />

        <label>연혁</label>
        {history.map((entry, index) => (
          <div key={index} style={{ display: "flex", gap: "0.5rem" }}>
            <input
              placeholder="연도"
              value={entry.year}
              onChange={(e) => updateHistoryEntry(index, "year", e.target.value)}
              style={{ width: 80 }}
            />
            <input
              placeholder="월"
              value={entry.month ?? ""}
              onChange={(e) => updateHistoryEntry(index, "month", e.target.value)}
              style={{ width: 60 }}
            />
            <input
              placeholder="내용"
              value={entry.description}
              onChange={(e) => updateHistoryEntry(index, "description", e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="button" className="danger" onClick={() => removeHistoryEntry(index)}>
              삭제
            </button>
          </div>
        ))}
        <button type="button" className="secondary" onClick={addHistoryEntry}>
          연혁 추가
        </button>

        <label>주소</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>위도 / 경도 (네이버 지도용)</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input placeholder="위도" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
          <input placeholder="경도" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        </div>

        <label>전화번호</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>이메일</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

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
