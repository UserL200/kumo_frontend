import { API_BASE_URL } from "../config";

// config.ts already holds the base URL and ends in /api, but my endpoint paths start with /api/v1,
// so strip the trailing /api here.
const BASE: string = API_BASE_URL.replace(/\/api\/?$/, "");

// Paths marked ADJUST are for controllers I have not seen. Change them to match yours.
export const ENDPOINTS = {
  login: "/api/v1/auth/login",
  signup: "/api/v1/auth/signup",
  refresh: "/api/v1/auth/refresh",
  myProperties: "/api/v1/properties/mine", // ADJUST: tenant's properties
  myRecords: "/api/v1/rent-records", // ADJUST: tenant's records (array or Spring Page)
  landlordProperties: "/api/v1/landlord/properties",
  budgetSummary: "/api/v1/budget/summary",
  budgetIncome: "/api/v1/budget/income",
  budgetExpenses: "/api/v1/budget/expenses",
} as const;

export type Role = "TENANT" | "LANDLORD";
export type PaymentStatus = "PENDING" | "CONFIRMED" | "DISPUTED";
export type PaymentSource = "AUTO_DETECTED" | "MANUALLY_LOGGED" | "LANDLORD_RECORDED";
export type ExpenseCategory =
  | "FOOD" | "TRANSPORT" | "UTILITIES" | "AIRTIME_DATA" | "DEBT_REPAYMENT" | "SAVINGS" | "OTHER";

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  FOOD: "Food",
  TRANSPORT: "Transport",
  UTILITIES: "Utilities",
  AIRTIME_DATA: "Airtime and data",
  DEBT_REPAYMENT: "Debt repayment",
  SAVINGS: "Savings",
  OTHER: "Other",
};

// Matches the PropertyType enum on the backend
export const PROPERTY_TYPES = [
  "ROOM_RENTAL",
  "BACKYARD_DWELLING",
  "FLAT_BLOCK",
  "FREESTANDING_HOUSE",
  "RDP_HOUSE",
  "INFORMAL_SETTLEMENT",
];

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}
export interface Property {
  id: number;
  address: string;
  propertyType: string;
  monthlyRent: number;
  active: boolean;
  tenantName?: string | null;
}
export interface RentRecord {
  id: number;
  propertyId: number;
  propertyAddress: string;
  amount: number;
  paymentDate: string;
  source: PaymentSource;
  status: PaymentStatus;
  referenceNumber?: string;
  disputeReason?: string | null;
}
export interface Invite {
  token: string;
  email: string;
  expiresAt: string;
}
export interface Expense {
  id: number;
  category: ExpenseCategory;
  amount: number;
  note?: string | null;
}
export interface BudgetSummary {
  month: string;
  monthlyIncome: number;
  monthlyRent: number;
  rentPercentOfIncome: number | null;
  expensesTotal: number;
  expensesByCategory: Partial<Record<ExpenseCategory, number>>;
  remaining: number;
  onTimeStreakMonths: number;
  expenses: Expense[];
}
interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

// Tokens live in localStorage for now. Fine for the hackathon, but an XSS bug can read them,
// so move to httpOnly cookies before real users.
export const session = {
  tokens(): { access: string; refresh: string } | null {
    try {
      const raw = localStorage.getItem("kumo.tokens");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  user(): User | null {
    try {
      const raw = localStorage.getItem("kumo.user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  save(auth: AuthResponse) {
    try {
      localStorage.setItem("kumo.tokens", JSON.stringify({ access: auth.accessToken, refresh: auth.refreshToken }));
      localStorage.setItem("kumo.user", JSON.stringify(auth.user));
    } catch {
      /* storage blocked: the session just won't survive a reload */
    }
  },
  clear() {
    try {
      localStorage.removeItem("kumo.tokens");
      localStorage.removeItem("kumo.user");
    } catch {
      /* ignore */
    }
  },
};

let refreshing: Promise<boolean> | null = null;

async function refreshTokens(): Promise<boolean> {
  const t = session.tokens();
  if (!t) return false;
  try {
    const res = await fetch(BASE + ENDPOINTS.refresh, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: t.refresh }),
    });
    if (!res.ok) return false;
    session.save((await res.json()) as AuthResponse);
    return true;
  } catch {
    return false;
  }
}

async function send(path: string, init: RequestInit): Promise<Response> {
  const t = session.tokens();
  const headers = new Headers(init.headers);
  if (init.body) headers.set("Content-Type", "application/json");
  if (t) headers.set("Authorization", `Bearer ${t.access}`);
  return fetch(BASE + path, { ...init, headers });
}

export async function api<T>(path: string, init: RequestInit & { json?: unknown } = {}): Promise<T> {
  const { json, ...rest } = init;
  const options: RequestInit = { ...rest, body: json !== undefined ? JSON.stringify(json) : rest.body };

  let res = await send(path, options);
  if (res.status === 401 && session.tokens()) {
    refreshing ??= refreshTokens().finally(() => (refreshing = null));
    if (await refreshing) res = await send(path, options);
  }

  if (!res.ok) {
    if (res.status === 401) session.clear();
    let message = "Something went wrong. Please try again.";
    try {
      const body = await res.json();
      message = body.message ?? body.error ?? message;
    } catch {
      /* no JSON body */
    }
    throw new ApiError(message, res.status);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const post = <T>(path: string, json?: unknown) => api<T>(path, { method: "POST", json });

export async function authenticate(path: string, body: unknown): Promise<User> {
  const res = await fetch(BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let message = "Could not sign you in. Check your details and try again.";
    try {
      const b = await res.json();
      message = b.message ?? b.error ?? message;
    } catch {
      /* ignore */
    }
    throw new ApiError(message, res.status);
  }
  const auth = (await res.json()) as AuthResponse;
  session.save(auth);
  return auth.user;
}

export const zar = (n: number | null | undefined) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(n ?? 0);

export const shortDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });