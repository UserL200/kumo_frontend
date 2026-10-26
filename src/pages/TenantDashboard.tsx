import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {
  api, post, ENDPOINTS, zar, shortDate, CATEGORY_LABELS,
  type BudgetSummary, type ExpenseCategory, type Property, type RentRecord,
} from "../lib/api";
import "../styles/kumo-app.css";

type Page<T> = T[] | { content: T[] };
const unwrap = <T,>(p: Page<T>): T[] => (Array.isArray(p) ? p : p.content);

const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

function lastSixMonths() {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return { key: monthKey(d), label: d.toLocaleDateString("en-ZA", { month: "short" }) };
  });
}

export default function TenantDashboard() {
  const { user, logout } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [records, setRecords] = useState<RentRecord[]>([]);
  const [budget, setBudget] = useState<BudgetSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const [p, r, b] = await Promise.all([
        api<Page<Property>>(ENDPOINTS.myProperties),
        api<Page<RentRecord>>(ENDPOINTS.myRecords + "?page=0&size=60"),
        api<BudgetSummary>(ENDPOINTS.budgetSummary),
      ]);
      setProperties(unwrap(p));
      setRecords(unwrap(r));
      setBudget(b);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load your dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  return (
    <div className="kumo-app">
      <header className="topbar">
        <span className="brand">Kumo</span>
        <span className="who">
          {user?.firstName}
          <button className="link-btn" onClick={logout}>Log out</button>
        </span>
      </header>
      <main className="wrap">
        <h1>Your rent record</h1>
        <p className="lede">Every confirmed payment adds a month to your verified rent history.</p>

        {error && <p className="error" role="alert">{error}</p>}
        {loading ? <p className="hint">Loading your dashboard</p> : (
          <>
            <Ledger records={records} streak={budget?.onTimeStreakMonths ?? 0} />
            <Payments records={records} onChanged={load} />
            <YourPlace properties={properties} />
            {budget && <Budget summary={budget} onChanged={load} />}
          </>
        )}
      </main>
    </div>
  );
}

function Ledger({ records, streak }: { records: RentRecord[]; streak: number }) {
  const months = useMemo(() => lastSixMonths(), []);
  const stateFor = (key: string) => {
    const inMonth = records.filter((r) => r.paymentDate.startsWith(key));
    if (inMonth.some((r) => r.status === "CONFIRMED")) return "confirmed";
    if (inMonth.some((r) => r.status === "DISPUTED")) return "disputed";
    if (inMonth.some((r) => r.status === "PENDING")) return "pending";
    return "none";
  };
  const words = { confirmed: "Confirmed", pending: "Waiting", disputed: "Disputed", none: "No payment" } as const;

  return (
    <section className="panel sand" aria-labelledby="ledger-h">
      <div className="streak">
        <strong>{streak}</strong>
        <h2 id="ledger-h" style={{ margin: 0 }}>
          {streak === 1 ? "month" : "months"} of confirmed rent in a row
        </h2>
      </div>
      <ol className="ledger">
        {months.map((m) => {
          const s = stateFor(m.key);
          return (
            <li key={m.key} className={`tile ${s}`} aria-label={`${m.label}: ${words[s]}`}>
              <b>{m.label}</b>
              <span>{words[s]}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Payments({ records, onChanged }: { records: RentRecord[]; onChanged: () => Promise<void> }) {
  const [busyId, setBusyId] = useState<number | null>(null);
  const [disputing, setDisputing] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  async function run(id: number, fn: () => Promise<unknown>) {
    setBusyId(id);
    setError("");
    try {
      await fn();
      setDisputing(null);
      setReason("");
      await onChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : "That did not work. Please try again.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="panel" aria-labelledby="pay-h">
      <h2 id="pay-h">Payments</h2>
      {error && <p className="error" role="alert">{error}</p>}
      {records.length === 0 ? (
        <p className="empty">No payments yet. Your landlord records each month's rent here, and you confirm it.</p>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr><th>Date</th><th>Amount</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>{shortDate(r.paymentDate)}</td>
                  <td>{zar(r.amount)}</td>
                  <td>
                    <span className={`pill ${r.status.toLowerCase()}`}>
                      {r.status === "CONFIRMED" ? "Confirmed" : r.status === "DISPUTED" ? "Disputed" : "Waiting"}
                    </span>
                    {r.disputeReason && <div className="hint">{r.disputeReason}</div>}
                  </td>
                  <td>
                    {r.status === "PENDING" && r.source === "LANDLORD_RECORDED" && (
                      <button className="btn small primary" disabled={busyId === r.id}
                        onClick={() => run(r.id, () => post(`/api/v1/payments/${r.id}/confirm`))}>
                        Confirm I paid
                      </button>
                    )}
                    {r.status === "PENDING" && r.source !== "LANDLORD_RECORDED" && (
                      <span className="hint">Waiting for your landlord</span>
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
                      <form style={{ marginTop: "0.5rem" }} onSubmit={(e: FormEvent) => {
                        e.preventDefault();
                        void run(r.id, () => post(`/api/v1/payments/${r.id}/dispute`, { reason }));
                      }}>
                        <div className="field">
                          <label htmlFor={`reason-${r.id}`}>What is wrong with this record?</label>
                          <input id={`reason-${r.id}`} value={reason} onChange={(e) => setReason(e.target.value)} required />
                        </div>
                        <button className="btn small primary" disabled={busyId === r.id || !reason.trim()}>
                          Send dispute
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="hint" style={{ marginTop: "0.75rem" }}>
        Disputed and waiting payments are left out of your verified history until they are sorted.
      </p>
    </section>
  );
}

function YourPlace({ properties }: { properties: Property[] }) {
  if (properties.length > 0) {
    return (
      <section className="panel" aria-labelledby="place-h">
        <h2 id="place-h">Your place</h2>
        {properties.map((p) => (
          <div className="stat-line" key={p.id}><span>{p.address}</span><strong>{zar(p.monthlyRent)} a month</strong></div>
        ))}
      </section>
    );
  }
  return (
    <section className="panel" aria-labelledby="place-h">
      <h2 id="place-h">Link your landlord</h2>
      <p className="empty">
        Ask your landlord to invite you from their Kumo dashboard, then open the link they send you.
        Use the same email address you signed up with. <Link to="/accept-invite">Have an invite code?</Link>
      </p>
    </section>
  );
}

function Budget({ summary, onChanged }: { summary: BudgetSummary; onChanged: () => Promise<void> }) {
  const [income, setIncome] = useState(summary.monthlyIncome ? String(summary.monthlyIncome) : "");
  const [category, setCategory] = useState<ExpenseCategory>("FOOD");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function act(fn: () => Promise<unknown>) {
    setBusy(true);
    setError("");
    try {
      await fn();
      await onChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : "That did not work. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const pct = summary.rentPercentOfIncome;
  const over = summary.remaining < 0;

  return (
    <section className="panel" aria-labelledby="budget-h">
      <h2 id="budget-h">Budget for this month</h2>
      {error && <p className="error" role="alert">{error}</p>}

      <form className="row" onSubmit={(e) => {
        e.preventDefault();
        void act(() => api(ENDPOINTS.budgetIncome, { method: "PUT", json: { monthlyIncome: Number(income) } }));
      }}>
        <div className="field">
          <label htmlFor="income">Monthly income (rand)</label>
          <input id="income" type="number" min="0" step="1" inputMode="numeric" value={income}
            onChange={(e) => setIncome(e.target.value)} required />
        </div>
        <button className="btn primary" disabled={busy}>Save income</button>
      </form>

      <div style={{ margin: "1.1rem 0" }}>
        {pct === null ? (
          <p className="empty">Add your income to see how much of it goes on rent.</p>
        ) : (
          <>
            <div className="stat-line"><span>Rent as a share of income</span><strong>{pct}%</strong></div>
            <div className="meter" role="img" aria-label={`Rent is ${pct} percent of income`}>
              <span style={{ width: `${Math.min(100, pct)}%` }} />
            </div>
            <p className="hint">Many lenders and advisers treat about 30% or less as comfortable.</p>
          </>
        )}
        <div className="stat-line"><span>Rent</span><strong>{zar(summary.monthlyRent)}</strong></div>
        <div className="stat-line"><span>Other spending</span><strong>{zar(summary.expensesTotal)}</strong></div>
        <div className={`stat-line ${over ? "error" : ""}`}>
          <span>{over ? "Over budget by" : "Left over"}</span><strong>{zar(Math.abs(summary.remaining))}</strong>
        </div>
      </div>

      <form className="row" onSubmit={(e) => {
        e.preventDefault();
        void act(async () => {
          await post(ENDPOINTS.budgetExpenses, { category, amount: Number(amount), note: note.trim() || undefined });
          setAmount("");
          setNote("");
        });
      }}>
        <div className="field">
          <label htmlFor="cat">Category</label>
          <select id="cat" value={category} onChange={(e) => setCategory(e.target.value as ExpenseCategory)}>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="amt">Amount (rand)</label>
          <input id="amt" type="number" min="1" step="1" inputMode="numeric" value={amount}
            onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="note">Note (optional)</label>
          <input id="note" value={note} maxLength={200} onChange={(e) => setNote(e.target.value)} />
        </div>
        <button className="btn primary" disabled={busy}>Add expense</button>
      </form>

      {summary.expenses.length === 0 ? (
        <p className="empty">No expenses logged this month.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0 0" }}>
          {summary.expenses.map((x) => (
            <li className="stat-line" key={x.id}>
              <span>{CATEGORY_LABELS[x.category]}{x.note ? `: ${x.note}` : ""}</span>
              <span>
                <strong>{zar(x.amount)}</strong>{" "}
                <button className="link-btn" disabled={busy}
                  onClick={() => void act(() => api(`${ENDPOINTS.budgetExpenses}/${x.id}`, { method: "DELETE" }))}>
                  Remove
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}