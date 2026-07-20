import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/products";
import { resolveImageUrl } from "../../api/client";
import { Product } from "../../api/types";
import { PageBanner } from "../../components/PageBanner";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getProducts().then((all) => setNames(Array.from(new Set(all.map((p) => p.name)))));
  }, []);

  useEffect(() => {
    getProducts(name || undefined).then(setProducts);
  }, [name]);

  return (
    <>
      <PageBanner eyebrow="PRODUCTS" title="취급 품목" />
      <div className="page-content">
        <div className="list-filters">
          <div className="list-filters__group">
            <select value={name} onChange={(e) => setName(e.target.value)}>
              <option value="">전체 품목</option>
              {names.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="card-grid" style={{ marginTop: "1rem" }}>
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="card">
              {product.imageUrl && <img src={resolveImageUrl(product.imageUrl)} alt={product.name} />}
              <div className="card__body">
                <strong>{product.name}</strong>
                <p>{product.variety}</p>
              </div>
            </Link>
          ))}
          {products.length === 0 && <p>등록된 품목이 없습니다.</p>}
        </div>
      </div>
    </>
  );
}
