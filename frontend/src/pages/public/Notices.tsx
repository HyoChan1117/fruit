import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNotices } from "../../api/notices";
import { NoticeListResponse } from "../../api/types";
import { PageBanner } from "../../components/PageBanner";

const SEARCH_FIELDS = [
  { value: "title", label: "제목" },
  { value: "body", label: "내용" },
] as const;

export function Notices() {
  const [data, setData] = useState<NoticeListResponse | null>(null);
  const [page, setPage] = useState(1);
  const [searchField, setSearchField] = useState<(typeof SEARCH_FIELDS)[number]["value"]>("title");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getNotices(page, searchField, search).then(setData);
  }, [page, searchField, search]);

  function handleSearchFieldChange(value: (typeof SEARCH_FIELDS)[number]["value"]) {
    setSearchField(value);
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  if (!data) return <p>불러오는 중...</p>;

  const totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));

  return (
    <>
      <PageBanner title="공지사항" />
      <div className="page-content">
        <div className="list-filters">
          <div className="list-filters__search">
            <select
              id="notice-search-field"
              value={searchField}
              onChange={(e) => handleSearchFieldChange(e.target.value as (typeof SEARCH_FIELDS)[number]["value"])}
            >
              {SEARCH_FIELDS.map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>
            <input
              id="notice-search-filter"
              type="text"
              placeholder="검색어 입력"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        {data.notices.map((notice) => (
          <div key={notice.id} className="list-item">
            <Link to={`/notices/${notice.id}`}>{notice.title}</Link>
            <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
        {data.notices.length === 0 && <p>{search ? "검색 결과가 없습니다." : "등록된 공지사항이 없습니다."}</p>}

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
