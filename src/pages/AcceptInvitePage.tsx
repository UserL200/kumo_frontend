import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { post, type Property, zar } from "../lib/api";
import "../styles/kumo-app.css";

export default function AcceptInvitePage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(params.get("token") ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [joined, setJoined] = useState<Property | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      setJoined(await post<Property>(`/api/v1/invites/${encodeURIComponent(token.trim())}/accept`));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not accept this invite.");
    } finally {
      setBusy(false);
    }
  }

  if (joined) {
    return (
      <main className="kumo-app auth-card">
        <p className="brand">Kumo</p>
        <h1>You are linked</h1>
        <p className="lede">
          {joined.address}, {zar(joined.monthlyRent)} a month. Your landlord can now record rent against this
          place, and you confirm each payment.
        </p>
        <button className="btn primary" onClick={() => navigate("/tenant", { replace: true })}>Go to my dashboard</button>
      </main>
    );
  }

  return (
    <main className="kumo-app auth-card">
      <p className="brand">Kumo</p>
      <h1>Join your landlord's property</h1>
      <p className="lede">You must be logged in with the email address your landlord invited.</p>
      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="token">Invite code</label>
          <input id="token" value={token} onChange={(e) => setToken(e.target.value)} required />
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn primary" disabled={busy || !token.trim()}>{busy ? "Linking" : "Accept invite"}</button>
      </form>
      <p className="hint" style={{ marginTop: "1rem" }}><Link to="/tenant">Back to my dashboard</Link></p>
    </main>
  );
}