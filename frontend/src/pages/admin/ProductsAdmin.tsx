import { FormEvent, useEffect, useState } from "react";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../../api/products";
import { resolveImageUrl } from "../../api/client";
import { Product } from "../../api/types";
import { ImageUploader } from "../../components/ImageUploader";

const MAX_FEATURED = 5;

export function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [variety, setVariety] = useState("");
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  function loadProducts() {
    getProducts().then(setProducts);
  }

  useEffect(loadProducts, []);

  function resetForm() {
    setEditingId(null);
    setName("");
    setVariety("");
    setDescription("");
    setIsFeatured(false);
    setImageFile(null);
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setName(product.name);
    setVariety(product.variety);
    setDescription(product.description);
    setIsFeatured(product.isFeatured);
    setImageFile(null);
  }

  const totalFeaturedCount = products.filter((p) => p.isFeatured).length;
  const featuredCount = products.filter((p) => p.isFeatured && p.id !== editingId).length;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (isFeatured && featuredCount >= MAX_FEATURED) {
      alert(`홈 화면 노출은 최대 ${MAX_FEATURED}개까지 선택할 수 있습니다.`);
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("variety", variety);
    formData.append("description", description);
    formData.append("isFeatured", String(isFeatured));
    if (imageFile) formData.append("image", imageFile);

    if (editingId) {
      await updateProduct(editingId, formData);
    } else {
      await createProduct(formData);
    }
    resetForm();
    loadProducts();
  }

  async function handleDelete(id: number) {
    if (!confirm("삭제하시겠습니까?")) return;
    await deleteProduct(id);
    loadProducts();
  }

  async function handleToggleFeatured(product: Product) {
    const willFeature = !product.isFeatured;
    if (willFeature) {
      const currentlyFeatured = products.filter((p) => p.isFeatured).length;
      if (currentlyFeatured >= MAX_FEATURED) {
        alert(`홈 화면 노출은 최대 ${MAX_FEATURED}개까지 선택할 수 있습니다.`);
        return;
      }
    }
    const formData = new FormData();
    formData.append("isFeatured", String(willFeature));
    await updateProduct(product.id, formData);
    loadProducts();
  }

  return (
    <div>
      <h1>취급 품목 관리</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 480, marginBottom: "2rem" }}>
        <h2>{editingId ? "품목 수정" : "새 품목"}</h2>
        <input placeholder="품목명" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="품종명" value={variety} onChange={(e) => setVariety(e.target.value)} required />
        <textarea
          placeholder="설명"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <ImageUploader onChange={setImageFile} />
        <label>
          <input
            type="checkbox"
            checked={isFeatured}
            disabled={!isFeatured && featuredCount >= MAX_FEATURED}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />{" "}
          홈 화면 &quot;취급 품목&quot;에 노출 ({featuredCount}/{MAX_FEATURED})
        </label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit">{editingId ? "수정 저장" : "등록"}</button>
          {editingId && (
            <button type="button" className="secondary" onClick={resetForm}>
              취소
            </button>
          )}
        </div>
      </form>

      <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>품목명</th>
            <th>품종명</th>
            <th>홈 노출</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                {product.imageUrl && (
                  <img src={resolveImageUrl(product.imageUrl)} alt="" width={40} style={{ marginRight: 8 }} />
                )}
                {product.name}
              </td>
              <td>{product.variety}</td>
              <td>
                <input
                  type="checkbox"
                  checked={product.isFeatured}
                  disabled={!product.isFeatured && totalFeaturedCount >= MAX_FEATURED}
                  onChange={() => handleToggleFeatured(product)}
                />
              </td>
              <td style={{ display: "flex", gap: "0.5rem" }}>
                <button className="secondary" onClick={() => startEdit(product)}>
                  수정
                </button>
                <button className="danger" onClick={() => handleDelete(product.id)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
