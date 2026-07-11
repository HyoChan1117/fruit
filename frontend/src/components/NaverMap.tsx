import { useEffect, useRef } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

interface NaverMapProps {
  latitude: number;
  longitude: number;
}

export function NaverMap({ latitude, longitude }: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || !window.naver?.maps) return;

    const center = new window.naver.maps.LatLng(latitude, longitude);
    const map = new window.naver.maps.Map(mapRef.current, {
      center,
      zoom: 16,
    });

    new window.naver.maps.Marker({ position: center, map });
  }, [latitude, longitude]);

  if (!window.naver?.maps) {
    return <p>지도를 불러올 수 없습니다. NCP_CLIENT_ID 설정을 확인해주세요.</p>;
  }

  return <div ref={mapRef} className="naver-map" />;
}
