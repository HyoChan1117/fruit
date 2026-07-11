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
      <PageBanner title={notice.title} subtitle={new Date(notice.createdAt).toLocaleDateString()} />
      <div className="page-content">
        <Link to="/notices">← 목록으로</Link>
        {notice.imageUrl && (
          <img src={resolveImageUrl(notice.imageUrl)} alt={notice.title} style={{ maxWidth: "100%" }} />
        )}
        <p style={{ whiteSpace: "pre-wrap" }}>{notice.body}</p>
      </div>
    </>
  );
}
