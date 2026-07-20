import { useEffect, useState } from "react";
import { getGalleryImages } from "../../api/gallery";
import { resolveImageUrl } from "../../api/client";
import { GalleryImage } from "../../api/types";
import { PageBanner } from "../../components/PageBanner";

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    getGalleryImages().then(setImages);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") setSelectedIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (event.key === "ArrowLeft")
        setSelectedIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      <PageBanner eyebrow="GALLERY" title="갤러리" />
      <div className="page-content">
        <div className="card-grid">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              className="card card--clickable"
              onClick={() => setSelectedIndex(index)}
            >
              <img src={resolveImageUrl(image.imageUrl)} alt={image.caption ?? "갤러리 이미지"} />
              {image.caption && <div className="card__body">{image.caption}</div>}
            </button>
          ))}
          {images.length === 0 && <p>등록된 사진이 없습니다.</p>}
        </div>

        {selectedImage && (
          <div className="lightbox" onClick={() => setSelectedIndex(null)}>
            <button
              type="button"
              className="lightbox__close"
              aria-label="닫기"
              onClick={() => setSelectedIndex(null)}
            >
              ×
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox__nav lightbox__nav--prev"
                  aria-label="이전 사진"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
                  }}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="lightbox__nav lightbox__nav--next"
                  aria-label="다음 사진"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((i) => (i === null ? i : (i + 1) % images.length));
                  }}
                >
                  ›
                </button>
              </>
            )}

            <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
              <img
                src={resolveImageUrl(selectedImage.imageUrl)}
                alt={selectedImage.caption ?? "갤러리 이미지"}
              />
              {selectedImage.caption && <p className="lightbox__caption">{selectedImage.caption}</p>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
