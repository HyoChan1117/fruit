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
      <PageBanner eyebrow="PRODUCTS" title={product.name} subtitle={`품종: ${product.variety}`} />
      <div className="page-content">
        <Link to="/products">← 목록으로</Link>
        {product.imageUrl && (
          <img src={resolveImageUrl(product.imageUrl)} alt={product.name} style={{ maxWidth: "100%" }} />
        )}
        <p style={{ whiteSpace: "pre-wrap" }}>{product.description}</p>
      </div>
    </>
  );
}
