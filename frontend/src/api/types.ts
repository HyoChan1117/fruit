export interface CompanyInfo {
  id: number;
  introText: string;
  address: string;
  nearbyInfo: string | null;
  parkingInfo: string | null;
  latitude: number | null;
  longitude: number | null;
  heroHeadline: string;
  heroSubcopy: string;
  heroTypewriterText: string;
  businessHours: string | null;
  holidays: string | null;
  auctionTime: string | null;
  serviceIntroTitle: string;
  serviceIntroIcon: string;
  valueCard1Title: string;
  valueCard1Body: string;
  valueCard1Icon: string;
  valueCard2Title: string;
  valueCard2Body: string;
  valueCard2Icon: string;
  valueCard3Title: string;
  valueCard3Body: string;
  valueCard3Icon: string;
  valueCard4Title: string;
  valueCard4Body: string;
  valueCard4Icon: string;
  serviceCtaTitle: string;
  aboutText: string | null;
  aboutImageUrl: string | null;
  pageBannerImageUrl: string | null;
  popupBannerEnabled: boolean;
  popupBannerImageUrl: string | null;
  popupBannerLinkUrl: string | null;
  updatedAt: string;
}

export interface Notice {
  id: number;
  title: string;
  body: string;
  imageUrl: string | null;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoticeListResponse {
  notices: Notice[];
  total: number;
  page: number;
  pageSize: number;
}

export interface Product {
  id: number;
  name: string;
  variety: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryImage {
  id: number;
  imageUrl: string;
  caption: string | null;
  createdAt: string;
}

export interface Inquiry {
  id: number;
  name: string;
  contact: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuctionResult {
  id: number;
  auctionDate: string;
  ownerName: string;
  productName: string;
  variety: string;
  grade: string;
  weight: number;
  quantity: number;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuctionResultListResponse {
  auctionResults: AuctionResult[];
  total: number;
  page: number;
  pageSize: number;
}
