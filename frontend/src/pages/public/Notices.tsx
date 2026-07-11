import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNotices } from "../../api/notices";
import { NoticeListResponse } from "../../api/types";
import { PageBanner } from "../../components/PageBanner";

export function Notices() {
  const [data, setData] = useState<NoticeListResponse | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getNotices(page).then(setData);
  }, [page]);

  if (!data) return <p>불러오는 중...</p>;

  const totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));

  return (
    <>
      <PageBanner title="공지사항" />
      <div className="page-content">
        {data.notices.map((notice) => (
          <div key={notice.id} className="list-item">
            <Link to={`/notices/${notice.id}`}>{notice.title}</Link>
            <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
        {data.notices.length === 0 && <p>등록된 공지사항이 없습니다.</p>}

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            이전
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            다음
          </button>
        </div>
      </div>
    </>
  );
}
