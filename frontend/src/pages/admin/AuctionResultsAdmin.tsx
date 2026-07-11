import { FormEvent, useEffect, useRef, useState } from "react";
import {
  createAuctionResult,
  deleteAuctionResult,
  getAuctionResults,
  updateAuctionResult,
} from "../../api/auctionResults";
import { AuctionResult } from "../../api/types";
import { getTodayDateString } from "../../utils/date";

function toDateInputValue(isoString: string) {
  return isoString.slice(0, 10);
}

export function AuctionResultsAdmin() {
  const [auctionResults, setAuctionResults] = useState<AuctionResult[]>([]);
  const [filterDate, setFilterDate] = useState(getTodayDateString());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [auctionDate, setAuctionDate] = useState(getTodayDateString());
  const [ownerName, setOwnerName] = useState("");
  const [productName, setProductName] = useState("");
  const [variety, setVariety] = useState("");
  const [grade, setGrade] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const gradeInputRef = useRef<HTMLInputElement>(null);

  function loadAuctionResults(date: string) {
    getAuctionResults(1, date).then((res) => setAuctionResults(res.auctionResults));
  }

  useEffect(() => {
    loadAuctionResults(filterDate);
  }, [filterDate]);

  function resetForm() {
    setEditingId(null);
    setAuctionDate(filterDate || getTodayDateString());
    setOwnerName("");
    setProductName("");
    setVariety("");
    setGrade("");
    setWeight("");
    setQuantity("");
    setUnitPrice("");
  }

  function resetEntryFields() {
    setGrade("");
    setWeight("");
    setQuantity("");
    setUnitPrice("");
  }

  function startEdit(result: AuctionResult) {
    setEditingId(result.id);
    setAuctionDate(toDateInputValue(result.auctionDate));
    setOwnerName(result.ownerName);
    setProductName(result.productName);
    setVariety(result.variety);
    setGrade(result.grade);
    setWeight(String(result.weight));
    setQuantity(String(result.quantity));
    setUnitPrice(String(result.unitPrice));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      auctionDate,
      ownerName,
      productName,
      variety,
      grade,
      weight: Number(weight),
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
    };

    if (editingId) {
      await updateAuctionResult(editingId, data);
      resetForm();
    } else {
      await createAuctionResult(data);
      resetEntryFields();
      gradeInputRef.current?.focus();
    }
    loadAuctionResults(filterDate);
  }

  async function handleDelete(id: number) {
    if (!confirm("삭제하시겠습니까?")) return;
    await deleteAuctionResult(id);
    loadAuctionResults(filterDate);
  }

  return (
    <div>
      <h1>경매 결과 관리</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 480, marginBottom: "2rem" }}>
        <h2>{editingId ? "경매 결과 수정" : "새 경매 결과"}</h2>
        <label>경매일자</label>
        <input type="date" value={auctionDate} onChange={(e) => setAuctionDate(e.target.value)} required />
        <input
          placeholder="출하주"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
        />
        <input
          placeholder="품목"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          placeholder="품종"
          value={variety}
          onChange={(e) => setVariety(e.target.value)}
          required
        />
        <input
          ref={gradeInputRef}
          placeholder="등급 (예: 특, 상, 중)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.1"
          placeholder="무게(kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="수량"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="단가(원)"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          required
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit">{editingId ? "수정 저장" : "등록"}</button>
          {editingId && (
            <button type="button" className="secondary" onClick={resetForm}>
              취소
            </button>
          )}
        </div>
      </form>

      <h2>등록된 경매 결과</h2>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
        <label htmlFor="auction-admin-date-filter">날짜</label>
        <input
          id="auction-admin-date-filter"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button type="button" className="secondary" onClick={() => setFilterDate(getTodayDateString())}>
          오늘
        </button>
        <button type="button" className="secondary" onClick={() => setFilterDate("")}>
          전체 보기
        </button>
      </div>

      <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>경매일자</th>
            <th>출하주</th>
            <th>품목</th>
            <th>품종</th>
            <th>등급</th>
            <th>무게(kg)</th>
            <th>수량</th>
            <th>단가(원)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {auctionResults.map((result) => (
            <tr key={result.id}>
              <td>{new Date(result.auctionDate).toLocaleDateString()}</td>
              <td>{result.ownerName}</td>
              <td>{result.productName}</td>
              <td>{result.variety}</td>
              <td>{result.grade}</td>
              <td>{result.weight.toLocaleString()}</td>
              <td>{result.quantity.toLocaleString()}</td>
              <td>{result.unitPrice.toLocaleString()}</td>
              <td style={{ display: "flex", gap: "0.5rem" }}>
                <button className="secondary" onClick={() => startEdit(result)}>
                  수정
                </button>
                <button className="danger" onClick={() => handleDelete(result.id)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
          {auctionResults.length === 0 && (
            <tr>
              <td colSpan={9}>
                {filterDate ? "선택하신 날짜의 경매 결과가 없습니다." : "등록된 경매 결과가 없습니다."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}
