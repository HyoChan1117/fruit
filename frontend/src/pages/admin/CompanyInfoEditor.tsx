import { FormEvent, useEffect, useState } from "react";
import { getCompanyInfo, updateCompanyInfo, updateAboutImage, updatePopupBannerImage } from "../../api/companyInfo";
import { resolveImageUrl } from "../../api/client";
import { CompanyInfo } from "../../api/types";
import { ImageUploader } from "../../components/ImageUploader";

export function CompanyInfoEditor() {
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
  const [aboutText, setAboutText] = useState("");
  const [aboutImageUrl, setAboutImageUrl] = useState<string | null>(null);
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null);
  const [popupBannerEnabled, setPopupBannerEnabled] = useState(false);
  const [popupBannerLinkUrl, setPopupBannerLinkUrl] = useState("");
  const [popupBannerImageUrl, setPopupBannerImageUrl] = useState<string | null>(null);
  const [popupBannerImageFile, setPopupBannerImageFile] = useState<File | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getCompanyInfo().then((info: CompanyInfo) => {
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
      setAboutText(info.aboutText ?? "");
      setAboutImageUrl(info.aboutImageUrl);
      setPopupBannerEnabled(info.popupBannerEnabled);
      setPopupBannerLinkUrl(info.popupBannerLinkUrl ?? "");
      setPopupBannerImageUrl(info.popupBannerImageUrl);
    });
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaved(false);
    await updateCompanyInfo({
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
      aboutText: aboutText || null,
      popupBannerEnabled,
      popupBannerLinkUrl: popupBannerLinkUrl || null,
    });

    if (aboutImageFile) {
      const formData = new FormData();
      formData.append("aboutImage", aboutImageFile);
      const updated = await updateAboutImage(formData);
      setAboutImageUrl(updated.aboutImageUrl);
      setAboutImageFile(null);
    }

    if (popupBannerImageFile) {
      const formData = new FormData();
      formData.append("popupBannerImage", popupBannerImageFile);
      const updated = await updatePopupBannerImage(formData);
      setPopupBannerImageUrl(updated.popupBannerImageUrl);
      setPopupBannerImageFile(null);
    }

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

        <h2>홈 화면 팝업 배너</h2>
        <label>
          <input
            type="checkbox"
            checked={popupBannerEnabled}
            onChange={(e) => setPopupBannerEnabled(e.target.checked)}
          />{" "}
          홈 화면 진입 시 팝업 배너 표시
        </label>
        <ImageUploader
          label="배너 이미지"
          currentImageUrl={resolveImageUrl(popupBannerImageUrl)}
          onChange={setPopupBannerImageFile}
        />
        <label>클릭 시 이동 링크 (선택, 예: /notices/3)</label>
        <input value={popupBannerLinkUrl} onChange={(e) => setPopupBannerLinkUrl(e.target.value)} />

        <h2>청과 소개 페이지 문구</h2>
        <label>소개 이미지 + 글</label>
        <textarea rows={4} value={aboutText} onChange={(e) => setAboutText(e.target.value)} />
        <ImageUploader
          label="소개 이미지"
          currentImageUrl={resolveImageUrl(aboutImageUrl)}
          onChange={setAboutImageFile}
        />

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
