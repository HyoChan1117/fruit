import { FormEvent, useState } from "react";
import { createInquiry } from "../../api/inquiries";
import { PageBanner } from "../../components/PageBanner";

export function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    try {
      await createInquiry({ name, contact, message });
      setSubmitted(true);
      setName("");
      setContact("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "문의 등록에 실패했습니다.");
    }
  }

  return (
    <>
      <PageBanner title="문의하기" />
      <div className="page-content">
        {submitted && <p>문의가 정상적으로 접수되었습니다.</p>}
        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} required />
          <input
            placeholder="연락처 (전화번호 또는 이메일)"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          <textarea
            placeholder="문의 내용"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">문의 등록</button>
        </form>
      </div>
    </>
  );
}
