import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useAuth } from "../auth/AuthContext";
import {
  api, post, ENDPOINTS, zar, shortDate, PROPERTY_TYPES,
  type Invite, type Property, type RentRecord,
} from "../lib/api";
import "../styles/kumo-app.css";

export default function LandlordDashboard() {
  const { user, logout } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setProperties(await api<Property[]>(ENDPOINTS.landlordProperties));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load your properties.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const vacant = properties.filter((p) => !p.tenantName).length;

  return (
    <div className="kumo-app">
      <header className="topbar">
        <span className="brand">Kumo</span>
        <span className="who">{user?.firstName}<button className="link-btn" onClick={logout}>Log out</button></span>
      </header>
      <main className="wrap">
        <h1>Your properties</h1>
        <p className="lede">
          Add a place, invite the tenant, then record each month's rent. Payments count toward the
          tenant's verified history once they confirm them.
        </p>

        {error && <p className="error" role="alert">{error}</p>}
        <AddProperty onAdded={load} />

        {loading ? <p className="hint">Loading your properties</p> : properties.length === 0 ? (
          <p className="empty">No properties yet. Add your first one above.</p>
        ) : (
          <>
            <p className="hint">{properties.length} {properties.length === 1 ? "property" : "properties"}, {vacant} without a tenant.</p>
            {properties.map((p) => <PropertyCard key={p.id} property={p} onChanged={load} />)}
          </>
        )}
      </main>
    </div>
  );
}

function AddProperty({ onAdded }: { onAdded: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setBusy(true);
    setError("");
    try {
      await post(ENDPOINTS.landlordProperties, {
        address: String(f.get("address")).trim(),
        propertyType: String(f.get("propertyType")),
        monthlyRent: Number(f.get("monthlyRent")),
        tenancyStartDate: String(f.get("tenancyStartDate")) || undefined,
      });
      form.reset();
      setOpen(false);
      await onAdded();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add the property.");
    } finally {
      setBusy(false);
    }
  }

  if (!open) return <p><button className="btn primary" onClick={() => setOpen(true)}>Add a property</button></p>;

  return (
    <form className="panel sand" onSubmit={onSubmit}>
      <h2>New property</h2>
      <div className="field">
        <label htmlFor="address">Address and unit</label>
        <input id="address" name="address" placeholder="12 Vilakazi St, Soweto, Room B" required />
      </div>
      <div className="row" style={{ marginBottom: "0.8rem" }}>
        <div className="field">
          <label htmlFor="propertyType">Type</label>
          <select id="propertyType" name="propertyType">
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t.replace(/_/g, " ").toLowerCase()}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="monthlyRent">Monthly rent (rand)</label>
          <input id="monthlyRent" name="monthlyRent" type="number" min="1" step="1" inputMode="numeric" required />
        </div>
        <div className="field">
          <label htmlFor="tenancyStartDate">Tenancy start (optional)</label>
          <input id="tenancyStartDate" name="tenancyStartDate" type="date" />
        </div>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="row">
        <button className="btn primary" disabled={busy}>{busy ? "Saving" : "Save property"}</button>
        <button type="button" className="btn" onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </form>
  );
}

function PropertyCard({ property, onChanged }: { property: Property; onChanged: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="panel">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ marginBottom: "0.1rem" }}>{property.address}</h2>
          <span className="hint">
            {zar(property.monthlyRent)} a month. {property.tenantName ? `Tenant: ${property.tenantName}` : "No tenant yet"}
          </span>
        </div>
        <button className="btn small" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Hide" : property.tenantName ? "Payments" : "Invite tenant"}
        </button>
      </div>
      {open && (
        <div style={{ marginTop: "1rem" }}>
          {property.tenantName ? <Payments property={property} /> : <InviteTenant property={property} onChanged={onChanged} />}
        </div>
      )}
    </section>
  );
}

function InviteTenant({ property, onChanged }: { property: Property; onChanged: () => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [invite, setInvite] = useState<Invite | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const link = invite ? `${window.location.origin}/accept-invite?token=${invite.token}` : "";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      setInvite(await post<Invite>(`${ENDPOINTS.landlordProperties}/${property.id}/invites`, { email: email.trim() }));
      await onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create the invite.");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      setError("Copy did not work. Select the link and copy it by hand.");
    }
  }

  return (
    <>
      <form className="row" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor={`inv-${property.id}`}>Tenant's email</label>
          <input id={`inv-${property.id}`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button className="btn primary" disabled={busy}>Create invite link</button>
      </form>
      {error && <p className="error" role="alert">{error}</p>}
      {invite && (
        <div style={{ marginTop: "0.8rem" }}>
          <p className="hint">Send this link to {invite.email}. They must sign up with that same email. It expires {shortDate(invite.expiresAt.slice(0, 10))}.</p>
          <p className="invite-link">{link}</p>
          <button className="btn small" onClick={copy}>{copied ? "Copied" : "Copy link"}</button>
        </div>
      )}
    </>
  );
}

function Payments({ property }: { property: Property }) {
  const base = `${ENDPOINTS.landlordProperties}/${property.id}/payments`;
  const [records, setRecords] = useState<RentRecord[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState(String(property.monthlyRent));
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [reference, setReference] = useState("");
  const [disputing, setDisputing] = useState<number | null>(null);
  const [reason, setReason] = useState("");

  const load = useCallback(async () => {
    try {
      setRecords(await api<RentRecord[]>(base));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load payments.");
    }
  }, [base]);

  useEffect(() => { void load(); }, [load]);

  async function act(fn: () => Promise<unknown>) {
    setBusy(true);
    setError("");
    try {
      await fn();
      setDisputing(null);
      setReason("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "That did not work. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const label = (s: RentRecord["status"]) => (s === "CONFIRMED" ? "Confirmed" : s === "DISPUTED" ? "Disputed" : "Waiting for tenant");

  return (
    <>
      <form className="row" onSubmit={(e) => {
        e.preventDefault();
        void act(async () => {
          await post(base, {
            propertyId: property.id,
            amount: Number(amount),
            paymentDate: date,
            referenceNumber: reference.trim() || undefined,
          });
          setReference("");
        });
      }}>
        <div className="field">
          <label htmlFor={`amt-${property.id}`}>Amount received (rand)</label>
          <input id={`amt-${property.id}`} type="number" min="1" step="1" inputMode="numeric" value={amount}
            onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor={`date-${property.id}`}>Date paid</label>
          <input id={`date-${property.id}`} type="date" value={date} max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor={`ref-${property.id}`}>Reference (optional)</label>
          <input id={`ref-${property.id}`} value={reference} onChange={(e) => setReference(e.target.value)} />
        </div>
        <button className="btn primary" disabled={busy}>Record payment</button>
      </form>

      {error && <p className="error" role="alert">{error}</p>}

      {records.length === 0 ? (
        <p className="empty">No payments recorded for {property.tenantName} yet.</p>
      ) : (
        <div className="table-scroll" style={{ marginTop: "1rem" }}>
          <table>
            <thead><tr><th>Date</th><th>Amount</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>{shortDate(r.paymentDate)}</td>
                  <td>{zar(r.amount)}</td>
                  <td>
                    <span className={`pill ${r.status.toLowerCase()}`}>{label(r.status)}</span>
                    {r.disputeReason && <div className="hint">{r.disputeReason}</div>}
                  </td>
                  <td>
                    {r.status === "PENDING" && r.source === "MANUALLY_LOGGED" && (
                      <button className="btn small primary" disabled={busy}
                        onClick={() => void act(() => post(`/api/v1/payments/${r.id}/confirm`))}>
                        Confirm received
                      </button>
                    )}
                    {r.status !== "DISPUTED" && (
                      <>
                        {" "}
                        <button className="btn small danger" onClick={() => setDisputing(disputing === r.id ? null : r.id)}>
                          Dispute
                        </button>
                      </>
                    )}
                    {disputing === r.id && (
                      <form style={{ marginTop: "0.5rem" }} onSubmit={(e) => {
                        e.preventDefault();
                        void act(() => post(`/api/v1/payments/${r.id}/dispute`, { reason }));
                      }}>
                        <div className="field">
                          <label htmlFor={`why-${r.id}`}>What is wrong with this record?</label>
                          <input id={`why-${r.id}`} value={reason} onChange={(e) => setReason(e.target.value)} required />
                        </div>
                        <button className="btn small primary" disabled={busy || !reason.trim()}>Send dispute</button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}