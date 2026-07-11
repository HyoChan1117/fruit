import { FormEvent, useEffect, useState } from "react";
import { createGalleryImage, deleteGalleryImage, getGalleryImages } from "../../api/gallery";
import { resolveImageUrl } from "../../api/client";
import { GalleryImage } from "../../api/types";
import { ImageUploader } from "../../components/ImageUploader";

export function GalleryAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  function loadImages() {
    getGalleryImages().then(setImages);
  }

  useEffect(loadImages, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!imageFile) {
      setError("이미지 파일을 선택해주세요.");
      return;
    }
    setError(null);
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", imageFile);
    await createGalleryImage(formData);
    setCaption("");
    setImageFile(null);
    loadImages();
  }

  async function handleDelete(id: number) {
    if (!confirm("삭제하시겠습니까?")) return;
    await deleteGalleryImage(id);
    loadImages();
  }

  return (
    <div>
      <h1>갤러리 관리</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 480, marginBottom: "2rem" }}>
        <h2>사진 업로드</h2>
        {error && <p className="error-text">{error}</p>}
        <input placeholder="캡션 (선택)" value={caption} onChange={(e) => setCaption(e.target.value)} />
        <ImageUploader onChange={setImageFile} />
        <button type="submit">업로드</button>
      </form>

      <div className="card-grid">
        {images.map((image) => (
          <div key={image.id} className="card">
            <img src={resolveImageUrl(image.imageUrl)} alt={image.caption ?? ""} />
            <div className="card__body">
              {image.caption && <p>{image.caption}</p>}
              <button className="danger" onClick={() => handleDelete(image.id)}>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
