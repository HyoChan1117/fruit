import { useState } from "react";

interface ImageUploaderProps {
  label?: string;
  currentImageUrl?: string;
  onChange: (file: File | null) => void;
}

export function ImageUploader({ label = "이미지", currentImageUrl, onChange }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentImageUrl);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    onChange(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : currentImageUrl);
  }

  return (
    <div className="image-uploader">
      <label>{label}</label>
      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleChange} />
      {previewUrl && <img src={previewUrl} alt="미리보기" className="image-uploader__preview" />}
    </div>
  );
}
