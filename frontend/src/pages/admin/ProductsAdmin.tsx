import { FormEvent, useEffect, useState } from "react";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../../api/products";
import { resolveImageUrl } from "../../api/client";
import { Product } from "../../api/types";
import { ImageUploader } from "../../components/ImageUploader";

export function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [spec, setSpec] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  function loadProducts() {
    getProducts().then(setProducts);
  }

  useEffect(loadProducts, []);

  function resetForm() {
    setEditingId(null);
    setName("");
    setCategory("");
    setDescription("");
    setSpec("");
    setImageFile(null);
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setName(product.name);
    setCategory(product.category);
    setDescription(product.description);
    setSpec(product.spec ?? "");
    setImageFile(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("spec", spec);
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

  return (
    <div>
      <h1>취급 품목 관리</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 480, marginBottom: "2rem" }}>
        <h2>{editingId ? "품목 수정" : "새 품목"}</h2>
        <input placeholder="품목명" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="카테고리" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <textarea
          placeholder="설명"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input placeholder="규격 (선택)" value={spec} onChange={(e) => setSpec(e.target.value)} />
        <ImageUploader onChange={setImageFile} />
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
            <th>카테고리</th>
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
              <td>{product.category}</td>
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
