import { useState, type FormEvent } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { homeFor, useAuth } from "../auth/AuthContext";
import type { Role } from "../lib/api";

export default function AuthPage({ initialMode = "login" }: { initialMode?: "login" | "signup" }) {
  const { user, login, signup } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next");

  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [role, setRole] = useState<Role>("TENANT");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (user) return <Navigate to={next ?? homeFor(user.role)} replace />;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")).trim();
    const password = String(f.get("password"));
    try {
      const u =
        mode === "login"
          ? await login(email, password)
          : await signup({
              firstName: String(f.get("firstName")).trim(),
              lastName: String(f.get("lastName")).trim(),
              phoneNumber: String(f.get("phoneNumber") ?? "").trim() || undefined,
              email,
              password,
              role,
            });
      navigate(next ?? homeFor(u.role), { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="kumo-app auth-card">
      <p className="brand">Kumo</p>
      <h1>{mode === "login" ? "Log in" : "Create your account"}</h1>
      <p className="lede">
        {mode === "login"
          ? "Pick up where you left off."
          : "Free for renters. Landlords can start with one or two units for free."}
      </p>

      <form onSubmit={onSubmit} noValidate={false}>
        {mode === "signup" && (
          <>
            <div className="seg" role="radiogroup" aria-label="I am a">
              <label>
                <input type="radio" name="role" checked={role === "TENANT"} onChange={() => setRole("TENANT")} />
                I rent a place
              </label>
              <label>
                <input type="radio" name="role" checked={role === "LANDLORD"} onChange={() => setRole("LANDLORD")} />
                I own or manage rentals
              </label>
            </div>
            <div className="row" style={{ marginBottom: "0.8rem" }}>
              <div className="field">
                <label htmlFor="firstName">First name</label>
                <input id="firstName" name="firstName" autoComplete="given-name" required />
              </div>
              <div className="field">
                <label htmlFor="lastName">Last name</label>
                <input id="lastName" name="lastName" autoComplete="family-name" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="phoneNumber">Phone number (optional)</label>
              <input id="phoneNumber" name="phoneNumber" type="tel" autoComplete="tel" />
            </div>
          </>
        )}
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            minLength={8}
            required
          />
          {mode === "signup" && <span className="hint">At least 8 characters.</span>}
        </div>

        {error && <p className="error" role="alert">{error}</p>}

        <button className="btn primary" type="submit" disabled={busy}>
          {busy ? "One moment" : mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>

      <p className="hint" style={{ marginTop: "1rem" }}>
        {mode === "login" ? "New to Kumo? " : "Already have an account? "}
        <button className="link-btn" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}>
          {mode === "login" ? "Create an account" : "Log in"}
        </button>
      </p>
    </main>
  );
}