/**
 * Kumo Configuration Constants
 * Centralized API & Provider configuration
 */
export const API_BASE_URL = '/api';
export const BANK_LINK_PROVIDER: 'stitch' | 'truid' = 'bank verification';
export const BANK_LINK_REDIRECT_URI = '/bank-link/callback';

/**
 * Backend integration helper stubs
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
