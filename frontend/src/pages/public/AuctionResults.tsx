import { useEffect, useState } from "react";
import { getAuctionResults } from "../../api/auctionResults";
import { AuctionResultListResponse } from "../../api/types";
import { PageBanner } from "../../components/PageBanner";
import { getTodayDateString } from "../../utils/date";

const SEARCH_FIELDS = [
  { value: "ownerName", label: "출하주" },
  { value: "productName", label: "품목" },
  { value: "variety", label: "품종" },
] as const;

export function AuctionResults() {
  const [data, setData] = useState<AuctionResultListResponse | null>(null);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(getTodayDateString());
  const [searchField, setSearchField] = useState<(typeof SEARCH_FIELDS)[number]["value"]>("ownerName");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAuctionResults(page, date, searchField, search).then(setData);
  }, [page, date, searchField, search]);

  function handleDateChange(value: string) {
    setDate(value);
    setPage(1);
  }

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
      <PageBanner title="경매 결과" />
      <div className="page-content">
        <div className="list-filters">
          <div className="list-filters__group">
            <label htmlFor="auction-date-filter" className="list-filters__label">
              날짜
            </label>
            <input
              id="auction-date-filter"
              type="date"
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
            />
            <button type="button" className="secondary" onClick={() => handleDateChange(getTodayDateString())}>
              오늘
            </button>
            <button type="button" className="secondary" onClick={() => handleDateChange("")}>
              전체 보기
            </button>
          </div>
          <div className="list-filters__search">
            <select
              id="auction-search-field"
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
              id="auction-search-filter"
              type="text"
              placeholder="검색어 입력"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="table-scroll">
        <p style={{ textAlign: "right", fontSize: "0.85rem", color: "#8a6a67", marginBottom: "0.5rem" }}>
          (단위: 무게 - kg, 단가 - 원)
        </p>
        <table>
          <thead>
            <tr>
              <th>경매일자</th>
              <th>출하주</th>
              <th>품목</th>
              <th>품종</th>
              <th>등급</th>
              <th>무게</th>
              <th>수량</th>
              <th>단가</th>
            </tr>
          </thead>
          <tbody>
            {data.auctionResults.map((result) => (
              <tr key={result.id}>
                <td>{new Date(result.auctionDate).toLocaleDateString()}</td>
                <td>{result.ownerName}</td>
                <td>{result.productName}</td>
                <td>{result.variety}</td>
                <td>{result.grade}</td>
                <td>{result.weight.toLocaleString()}</td>
                <td>{result.quantity.toLocaleString()}</td>
                <td>{result.unitPrice.toLocaleString()}</td>
              </tr>
            ))}
            {data.auctionResults.length === 0 && (
              <tr>
                <td colSpan={8}>
                  {search
                    ? "검색 결과가 없습니다."
                    : date
                    ? "선택하신 날짜의 경매 결과가 없습니다."
                    : "등록된 경매 결과가 없습니다."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>

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
