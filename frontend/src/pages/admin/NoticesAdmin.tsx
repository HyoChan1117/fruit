import { FormEvent, useEffect, useState } from "react";
import { createNotice, deleteNotice, getNotices, updateNotice } from "../../api/notices";
import { resolveImageUrl } from "../../api/client";
import { Notice } from "../../api/types";
import { ImageUploader } from "../../components/ImageUploader";

export function NoticesAdmin() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  function loadNotices() {
    getNotices(1).then((res) => setNotices(res.notices));
  }

  useEffect(loadNotices, []);

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setBody("");
    setImageFile(null);
  }

  function startEdit(notice: Notice) {
    setEditingId(notice.id);
    setTitle(notice.title);
    setBody(notice.body);
    setImageFile(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (imageFile) formData.append("image", imageFile);

    if (editingId) {
      await updateNotice(editingId, formData);
    } else {
      await createNotice(formData);
    }
    resetForm();
    loadNotices();
  }

  async function handleDelete(id: number) {
    if (!confirm("삭제하시겠습니까?")) return;
    await deleteNotice(id);
    loadNotices();
  }

  return (
    <div>
      <h1>공지사항 관리</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 480, marginBottom: "2rem" }}>
        <h2>{editingId ? "공지사항 수정" : "새 공지사항"}</h2>
        <input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="내용" rows={6} value={body} onChange={(e) => setBody(e.target.value)} required />
        <ImageUploader onChange={setImageFile} />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit">{editingId ? "수정 저장" : "등록"}</button>
          {editingId && (
            <button type="button" className="secondary" onClick={resetForm}>
              취소
            </button>
          )}
        </div>
      </form>

      <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성일</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td>
                {notice.imageUrl && (
                  <img src={resolveImageUrl(notice.imageUrl)} alt="" width={40} style={{ marginRight: 8 }} />
                )}
                {notice.title}
              </td>
              <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
              <td style={{ display: "flex", gap: "0.5rem" }}>
                <button className="secondary" onClick={() => startEdit(notice)}>
                  수정
                </button>
                <button className="danger" onClick={() => handleDelete(notice.id)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
