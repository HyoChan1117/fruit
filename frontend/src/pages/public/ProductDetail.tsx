import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../api/products";
import { resolveImageUrl } from "../../api/client";
import { Product } from "../../api/types";
import { PageBanner } from "../../components/PageBanner";

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) getProduct(Number(id)).then(setProduct);
  }, [id]);

  if (!product) return <p>불러오는 중...</p>;

  return (
    <>
      <PageBanner title="취급 품목" />
      <div className="page-content">
        <div className="detail-header">
          <h2 className="detail-header__title">{product.name}</h2>
          <span className="detail-header__date">품종: {product.variety}</span>
        </div>
        {product.imageUrl && (
          <img src={resolveImageUrl(product.imageUrl)} alt={product.name} style={{ maxWidth: "100%" }} />
        )}
        <p style={{ whiteSpace: "pre-wrap" }}>{product.description}</p>
        <div className="detail-back">
          <Link to="/products" className="btn-back">
            ← 목록으로
          </Link>
        </div>
      </div>
    </>
  );
}
