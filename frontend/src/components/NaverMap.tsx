interface NaverMapProps {
  latitude: number;
  longitude: number;
}

export function NaverMap({ latitude, longitude }: NaverMapProps) {
  const src = `${import.meta.env.VITE_API_BASE_URL}/api/map/static?lat=${latitude}&lng=${longitude}&w=800&h=400&level=17`;

  return <img src={src} alt="찾아오시는 길 지도" className="naver-map" />;
}
