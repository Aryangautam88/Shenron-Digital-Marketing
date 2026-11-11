import { useState } from "react";
import { blogApi, jsonBody } from "../lib/blogApi";

export default function AdminRecovery({ token, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setError(""); setMessage("");
    if (token && password !== confirm) { setError("Passwords do not match."); return; }
    if (token && new TextEncoder().encode(password).length > 72) { setError("Password must be at most 72 UTF-8 bytes."); return; }
    setBusy(true);
    try {
      const result = await blogApi(token ? "/admin/reset-password" : "/admin/forgot-password", {
        method: "POST", body: jsonBody(token ? { token, password } : { email }),
      });
      setMessage(result.message); setDone(true); setPassword(""); setConfirm("");
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <>
    <h1>{token ? "Set a new password" : "Forgot password?"}</h1>
    <p>{token ? "Choose a new password with at least 12 characters." : "Enter your admin email to receive a recovery link."}</p>
    <form className="admin-login-form" onSubmit={submit}>
      {!done && (token ? <>
        <label>New password<input type="password" autoComplete="new-password" required minLength={12} value={password} onChange={e => setPassword(e.target.value)} /></label>
        <label>Confirm password<input type="password" autoComplete="new-password" required minLength={12} value={confirm} onChange={e => setConfirm(e.target.value)} /></label>
      </> : <label>Admin email<input type="email" autoComplete="email" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} /></label>)}
      {error && <p className="admin-form-error" role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
      {!done && <button className="admin-primary-button" disabled={busy} type="submit">{busy ? "Please wait…" : token ? "Update password" : "Send recovery link"}</button>}
      <button className="admin-public-link" type="button" disabled={busy} onClick={onBack}>Back to sign in</button>
    </form>
  </>;
}
