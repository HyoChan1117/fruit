import { useEffect, useState } from "react";
import { deleteInquiry, getInquiries, markInquiryRead } from "../../api/inquiries";
import { Inquiry } from "../../api/types";

export function InquiriesAdmin() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  function loadInquiries() {
    getInquiries().then(setInquiries);
  }

  useEffect(loadInquiries, []);

  async function handleMarkRead(id: number) {
    await markInquiryRead(id);
    loadInquiries();
  }

  async function handleDelete(id: number) {
    if (!confirm("삭제하시겠습니까?")) return;
    await deleteInquiry(id);
    loadInquiries();
  }

  return (
    <div>
      <h1>문의 내역</h1>
      <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>연락처</th>
            <th>내용</th>
            <th>접수일</th>
            <th>상태</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id}>
              <td>{inquiry.name}</td>
              <td>{inquiry.contact}</td>
              <td style={{ whiteSpace: "pre-wrap" }}>{inquiry.message}</td>
              <td>{new Date(inquiry.createdAt).toLocaleString()}</td>
              <td>{inquiry.isRead ? "확인됨" : "미확인"}</td>
              <td style={{ display: "flex", gap: "0.5rem" }}>
                {!inquiry.isRead && (
                  <button className="secondary" onClick={() => handleMarkRead(inquiry.id)}>
                    확인 처리
                  </button>
                )}
                <button className="danger" onClick={() => handleDelete(inquiry.id)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
          {inquiries.length === 0 && (
            <tr>
              <td colSpan={6}>문의 내역이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}
