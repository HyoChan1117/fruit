import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { createInquiry } from "../../api/inquiries";
import { PageBanner } from "../../components/PageBanner";

const CONTACT_PREFIX = "010-";

function formatContact(rest: string) {
  return CONTACT_PREFIX + (rest.length > 4 ? `${rest.slice(0, 4)}-${rest.slice(4)}` : rest);
}

export function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState(CONTACT_PREFIX);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = contactInputRef.current;
    if (el && document.activeElement === el) {
      el.setSelectionRange(contact.length, contact.length);
    }
  }, [contact]);

  function handleContactChange(event: ChangeEvent<HTMLInputElement>) {
    const raw = event.target.value;
    const rest = (raw.startsWith(CONTACT_PREFIX) ? raw.slice(CONTACT_PREFIX.length) : raw)
      .replace(/\D/g, "")
      .slice(0, 8);
    setContact(formatContact(rest));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (contact.replace(/\D/g, "").length !== 11) {
      setError("연락처를 정확히 입력해주세요.");
      return;
    }
    try {
      await createInquiry({ name, contact, message });
      setSubmitted(true);
      setName("");
      setContact(CONTACT_PREFIX);
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "문의 등록에 실패했습니다.");
    }
  }

  return (
    <>
      <PageBanner eyebrow="CONTACT" title="문의하기" />
      <div className="page-content">
        {submitted && <p>문의가 정상적으로 접수되었습니다.</p>}
        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} required />
          <input
            ref={contactInputRef}
            placeholder="연락처 (전화번호)"
            inputMode="numeric"
            value={contact}
            onChange={handleContactChange}
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
