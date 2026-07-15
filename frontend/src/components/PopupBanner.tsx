import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { resolveImageUrl } from "../api/client";

const DISMISS_STORAGE_KEY = "popupBannerDismissedDate";

function getTodayString() {
  return new Date().toISOString().slice(0, 10);
}

interface PopupBannerProps {
  imageUrl: string | null;
  linkUrl: string | null;
}

export function PopupBanner({ imageUrl, linkUrl }: PopupBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!imageUrl) return;
    if (localStorage.getItem(DISMISS_STORAGE_KEY) === getTodayString()) return;
    setVisible(true);
  }, [imageUrl]);

  if (!visible || !imageUrl) return null;

  function close() {
    setVisible(false);
  }

  function dismissForToday() {
    localStorage.setItem(DISMISS_STORAGE_KEY, getTodayString());
    setVisible(false);
  }

  const image = <img src={resolveImageUrl(imageUrl)} alt="공지 배너" className="popup-banner__image" />;
  const isExternalLink = linkUrl ? /^https?:\/\//.test(linkUrl) : false;

  return (
    <div className="popup-banner__overlay" role="dialog" aria-modal="true">
      <div className="popup-banner__card">
        <button type="button" className="popup-banner__close" onClick={close} aria-label="닫기">
          ×
        </button>
        {linkUrl ? (
          isExternalLink ? (
            <a href={linkUrl} target="_blank" rel="noreferrer">
              {image}
            </a>
          ) : (
            <Link to={linkUrl} onClick={close}>
              {image}
            </Link>
          )
        ) : (
          image
        )}
        <button type="button" className="popup-banner__dismiss" onClick={dismissForToday}>
          오늘 하루 보지 않기
        </button>
      </div>
    </div>
  );
}
