/**
 * Kumo Configuration Constants
 * Centralized API & Provider configuration
 */
export const API_BASE_URL = '/api';
export const BANK_LINK_PROVIDER: 'stitch' | 'truid' = 'bank verification';
export const BANK_LINK_REDIRECT_URI = '/bank-link/callback';

/**
 * Backend integration helper stubs
 *
 * NOTE: The Java backend does not have live endpoints wired up yet.
 * Every function below simulates a network round trip and logs the
 * request it would make. Replace the body of each stub with a real
 * fetch(`${API_BASE_URL}/...`) call once the corresponding Java
 * endpoint exists — the function signatures and return shapes are
 * designed to stay the same so the frontend components using them
 * won't need to change.
 */
export interface BankLinkInitiateResponse {
  redirectUrl: string;
  sessionId: string;
}

export async function initiateBankLink(): Promise<BankLinkInitiateResponse> {
  console.log(`[Kumo Bank Link] Initiating bank link flow with provider: ${BANK_LINK_PROVIDER}`);
  console.log(`[Kumo Bank Link] Calling POST ${API_BASE_URL}/bank-link/initiate with redirect: ${BANK_LINK_REDIRECT_URI}`);

  // Simulate network roundtrip to backend service
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    redirectUrl: `${BANK_LINK_REDIRECT_URI}?session=kumo_test_session_${Date.now()}`,
    sessionId: `kumo_sess_${Date.now()}`
  };
}

export interface TenantSignupPayload {
  email: string;
  phone: string;
}

export async function signupTenant(payload: TenantSignupPayload): Promise<{ success: boolean; tenantId: string }> {
  console.log(`[Kumo Signup] Calling POST ${API_BASE_URL}/tenants/signup`, payload);
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true, tenantId: `tnt_${Date.now()}` };
}

/**
 * Tenant waitlist signup — used in place of the full bank-link signup
 * flow while bank-verification partnerships are still being secured.
 *
 * Expected Java endpoint (not yet built): POST /api/waitlist/join
 * Expected server-side behaviour once wired up:
 *   1. Validate email + phone again server-side (never trust client validation alone).
 *   2. Store the entry (e.g. a `waitlist_entries` table: email, phone, joined_at, notified_at).
 *   3. Send a "you're on the waiting list" confirmation email immediately.
 *   4. Later, when bank-link partnerships are ready, a separate batch/admin
 *      process emails everyone on the list to invite them to complete signup.
 */
export interface WaitlistSignupPayload {
  email: string;
  phone: string;
}

export async function signupWaitlist(payload: WaitlistSignupPayload): Promise<{ success: boolean; waitlistId: string }> {
  console.log(`[Kumo Waitlist] Calling POST ${API_BASE_URL}/waitlist/join`, payload);
  console.log('[Kumo Waitlist] Backend should send a "you\'re on the waiting list" confirmation email here.');
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true, waitlistId: `wl_${Date.now()}` };
}

export interface LandlordSignupPayload {
  name: string;
  email: string;
  propertyCount?: string;
}

export async function signupLandlord(payload: LandlordSignupPayload): Promise<{ success: boolean; landlordId: string }> {
  console.log(`[Kumo Landlord Join] Calling POST ${API_BASE_URL}/landlords/join`, payload);
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true, landlordId: `lld_${Date.now()}` };
}

/**
 * Client-side validation helpers.
 * These are a first line of defence for UX only — the Java backend
 * must re-validate everything server-side once it's wired up, since
 * client-side checks can always be bypassed.
 */

// Reasonably strict RFC-5322-ish email check without going overboard.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

// South African mobile numbers: accepts 0821234567 or +27821234567 /
// 27821234567, with the first digit after the country code / leading
// zero being 6, 7, or 8 (SA mobile prefixes), followed by 8 more digits.
const SA_PHONE_REGEX = /^(?:\+27|27|0)[678]\d{8}$/;

export function isValidSaPhone(value: string): boolean {
  const digitsOnly = value.replace(/[\s-]/g, '');
  return SA_PHONE_REGEX.test(digitsOnly);
}