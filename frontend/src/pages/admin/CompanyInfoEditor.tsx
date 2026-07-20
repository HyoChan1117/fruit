import { FormEvent, useEffect, useState } from "react";
import {
  getCompanyInfo,
  updateCompanyInfo,
  updateAboutImage,
  updatePageBannerImage,
  updatePopupBannerImage,
} from "../../api/companyInfo";
import { resolveImageUrl } from "../../api/client";
import { CompanyInfo } from "../../api/types";
import { ImageUploader } from "../../components/ImageUploader";
import { EmojiPicker } from "../../components/EmojiPicker";

export function CompanyInfoEditor() {
  const [address, setAddress] = useState("");
  const [nearbyInfo, setNearbyInfo] = useState("");
  const [parkingInfo, setParkingInfo] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [heroHeadline, setHeroHeadline] = useState("");
  const [heroSubcopy, setHeroSubcopy] = useState("");
  const [heroTypewriterText, setHeroTypewriterText] = useState("");
  const [serviceIntroTitle, setServiceIntroTitle] = useState("");
  const [serviceIntroIcon, setServiceIntroIcon] = useState("");
  const [valueCard1Title, setValueCard1Title] = useState("");
  const [valueCard1Body, setValueCard1Body] = useState("");
  const [valueCard1Icon, setValueCard1Icon] = useState("");
  const [valueCard2Title, setValueCard2Title] = useState("");
  const [valueCard2Body, setValueCard2Body] = useState("");
  const [valueCard2Icon, setValueCard2Icon] = useState("");
  const [valueCard3Title, setValueCard3Title] = useState("");
  const [valueCard3Body, setValueCard3Body] = useState("");
  const [valueCard3Icon, setValueCard3Icon] = useState("");
  const [valueCard4Title, setValueCard4Title] = useState("");
  const [valueCard4Body, setValueCard4Body] = useState("");
  const [valueCard4Icon, setValueCard4Icon] = useState("");
  const [serviceCtaTitle, setServiceCtaTitle] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [holidays, setHolidays] = useState("");
  const [auctionTime, setAuctionTime] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [aboutImageUrl, setAboutImageUrl] = useState<string | null>(null);
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null);
  const [pageBannerImageUrl, setPageBannerImageUrl] = useState<string | null>(null);
  const [pageBannerImageFile, setPageBannerImageFile] = useState<File | null>(null);
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
      setServiceIntroTitle(info.serviceIntroTitle);
      setServiceIntroIcon(info.serviceIntroIcon);
      setValueCard1Title(info.valueCard1Title);
      setValueCard1Body(info.valueCard1Body);
      setValueCard1Icon(info.valueCard1Icon);
      setValueCard2Title(info.valueCard2Title);
      setValueCard2Body(info.valueCard2Body);
      setValueCard2Icon(info.valueCard2Icon);
      setValueCard3Title(info.valueCard3Title);
      setValueCard3Body(info.valueCard3Body);
      setValueCard3Icon(info.valueCard3Icon);
      setValueCard4Title(info.valueCard4Title);
      setValueCard4Body(info.valueCard4Body);
      setValueCard4Icon(info.valueCard4Icon);
      setServiceCtaTitle(info.serviceCtaTitle);
      setBusinessHours(info.businessHours ?? "");
      setHolidays(info.holidays ?? "");
      setAuctionTime(info.auctionTime ?? "");
      setAboutText(info.aboutText ?? "");
      setAboutImageUrl(info.aboutImageUrl);
      setPageBannerImageUrl(info.pageBannerImageUrl);
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
      serviceIntroTitle,
      serviceIntroIcon,
      valueCard1Title,
      valueCard1Body,
      valueCard1Icon,
      valueCard2Title,
      valueCard2Body,
      valueCard2Icon,
      valueCard3Title,
      valueCard3Body,
      valueCard3Icon,
      valueCard4Title,
      valueCard4Body,
      valueCard4Icon,
      serviceCtaTitle,
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

    if (pageBannerImageFile) {
      const formData = new FormData();
      formData.append("pageBannerImage", pageBannerImageFile);
      const updated = await updatePageBannerImage(formData);
      setPageBannerImageUrl(updated.pageBannerImageUrl);
      setPageBannerImageFile(null);
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
        <h2>메뉴 상단 배너 이미지</h2>
        <p>각 메뉴(청과 소개, 공지사항, 갤러리 등)에 들어갔을 때 상단에 보이는 배경 이미지입니다.</p>
        <ImageUploader
          label="배너 이미지"
          currentImageUrl={resolveImageUrl(pageBannerImageUrl)}
          onChange={setPageBannerImageFile}
        />

        <h2>홈 화면 히어로 문구</h2>
        <label>헤드라인 (줄바꿈하려면 Enter)</label>
        <textarea rows={2} value={heroHeadline} onChange={(e) => setHeroHeadline(e.target.value)} />

        <label>서브카피</label>
        <textarea rows={3} value={heroSubcopy} onChange={(e) => setHeroSubcopy(e.target.value)} />

        <label>타이핑 문구 (영문 짧은 슬로건)</label>
        <input value={heroTypewriterText} onChange={(e) => setHeroTypewriterText(e.target.value)} />

        <h2>홈 화면 서비스 소개 카드</h2>
        <label>소개 카드 아이콘</label>
        <EmojiPicker value={serviceIntroIcon} onChange={setServiceIntroIcon} />
        <label>소개 카드 제목</label>
        <input value={serviceIntroTitle} onChange={(e) => setServiceIntroTitle(e.target.value)} />

        <label>서비스 카드 1 아이콘</label>
        <EmojiPicker value={valueCard1Icon} onChange={setValueCard1Icon} />
        <label>서비스 카드 1 제목</label>
        <input value={valueCard1Title} onChange={(e) => setValueCard1Title(e.target.value)} />
        <label>서비스 카드 1 설명</label>
        <textarea rows={2} value={valueCard1Body} onChange={(e) => setValueCard1Body(e.target.value)} />

        <label>서비스 카드 2 아이콘</label>
        <EmojiPicker value={valueCard2Icon} onChange={setValueCard2Icon} />
        <label>서비스 카드 2 제목</label>
        <input value={valueCard2Title} onChange={(e) => setValueCard2Title(e.target.value)} />
        <label>서비스 카드 2 설명</label>
        <textarea rows={2} value={valueCard2Body} onChange={(e) => setValueCard2Body(e.target.value)} />

        <label>서비스 카드 3 아이콘</label>
        <EmojiPicker value={valueCard3Icon} onChange={setValueCard3Icon} />
        <label>서비스 카드 3 제목</label>
        <input value={valueCard3Title} onChange={(e) => setValueCard3Title(e.target.value)} />
        <label>서비스 카드 3 설명</label>
        <textarea rows={2} value={valueCard3Body} onChange={(e) => setValueCard3Body(e.target.value)} />

        <label>서비스 카드 4 아이콘</label>
        <EmojiPicker value={valueCard4Icon} onChange={setValueCard4Icon} />
        <label>서비스 카드 4 제목</label>
        <input value={valueCard4Title} onChange={(e) => setValueCard4Title(e.target.value)} />
        <label>서비스 카드 4 설명</label>
        <textarea rows={2} value={valueCard4Body} onChange={(e) => setValueCard4Body(e.target.value)} />

        <label>마무리(CTA) 카드 제목</label>
        <input value={serviceCtaTitle} onChange={(e) => setServiceCtaTitle(e.target.value)} />

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
