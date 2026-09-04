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
 * NOTE: Most of the Java backend does not have live endpoints wired up
 * yet — those functions below still simulate a network round trip and
 * log the request they would make. signupWaitlist is the exception:
 * it now calls the real /api/v1/waitlist/join endpoint, since that
 * backend controller exists.
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
 * This is wired to the real Java endpoint: POST /api/v1/waitlist/join
 * (see WaitlistController.java). The backend re-validates everything
 * itself and always responds with the same generic success message,
 * whether the email is brand new, already on the list, or caught by
 * the server-side honeypot/rate-limit checks — so this function never
 * needs to distinguish those cases, it just surfaces a real failure
 * (network error, validation error, rate limited) if one occurs.
 */
export interface WaitlistSignupPayload {
  email: string;
  phone: string;
  // Honeypot value from the frontend form. Real users never fill
  // this; if it's non-empty the backend treats the submission as
  // spam. Passed through as-is — the frontend doesn't need to make
  // its own judgment call about it, the backend already will.
  honeypot?: string;
}

export async function signupWaitlist(payload: WaitlistSignupPayload): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE_URL}/v1/waitlist/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: payload.email,
      phoneNumber: payload.phone,
      website: payload.honeypot ?? '',
    }),
  });

  if (!response.ok) {
    let message = 'Something went wrong. Please try again.';
    try {
      const errorBody = await response.json();
      if (errorBody?.error) {
        message = errorBody.error;
      }
    } catch {
      // Response body wasn't JSON (e.g. a proxy error page) — fall
      // back to the generic message above.
    }
    throw new Error(message);
  }

  return { success: true };
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