import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/products";
import { resolveImageUrl } from "../../api/client";
import { Product } from "../../api/types";
import { PageBanner } from "../../components/PageBanner";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    getProducts(category || undefined).then(setProducts);
  }, [category]);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <>
      <PageBanner title="취급 품목" />
      <div className="page-content">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">전체 카테고리</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="card-grid" style={{ marginTop: "1rem" }}>
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="card">
              {product.imageUrl && <img src={resolveImageUrl(product.imageUrl)} alt={product.name} />}
              <div className="card__body">
                <strong>{product.name}</strong>
                <p>{product.category}</p>
              </div>
            </Link>
          ))}
          {products.length === 0 && <p>등록된 품목이 없습니다.</p>}
        </div>
      </div>
    </>
  );
}
