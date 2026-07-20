import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNotice } from "../../api/notices";
import { resolveImageUrl } from "../../api/client";
import { Notice } from "../../api/types";
import { PageBanner } from "../../components/PageBanner";

export function NoticeDetail() {
  const { id } = useParams();
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    if (id) getNotice(Number(id)).then(setNotice);
  }, [id]);

  if (!notice) return <p>불러오는 중...</p>;

  return (
    <>
      <PageBanner title="공지사항" />
      <div className="page-content">
        <div className="detail-header">
          <h2 className="detail-header__title">{notice.title}</h2>
          <span className="detail-header__date">{new Date(notice.createdAt).toLocaleDateString()}</span>
        </div>
        {notice.imageUrl && (
          <img src={resolveImageUrl(notice.imageUrl)} alt={notice.title} className="notice-detail__image" />
        )}
        <p style={{ whiteSpace: "pre-wrap" }}>{notice.body}</p>
        <div className="detail-back">
          <Link to="/notices" className="btn-back">
            ← 목록으로
          </Link>
        </div>
      </div>
    </>
  );
}
