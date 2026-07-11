import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    try {
      await login(username, password);
      navigate("/admin");
    } catch {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: "4rem auto" }}>
      <h1>관리자 로그인</h1>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
