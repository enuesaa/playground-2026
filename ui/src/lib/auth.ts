import { PublicClientApplication, type AccountInfo } from '@azure/msal-browser';
import { PUBLIC_ENTRA_CLIENT_ID, PUBLIC_ENTRA_TENANT_ID, PUBLIC_API_SCOPE } from '$env/static/public';

const msalConfig = {
  auth: {
    clientId: PUBLIC_ENTRA_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${PUBLIC_ENTRA_TENANT_ID}`,
    redirectUri: '/'
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);
let initialized = false;

export async function ensureInit() {
  if (!initialized) {
    await msalInstance.initialize();
    await msalInstance.handleRedirectPromise();
    initialized = true;
  }
}

export async function login() {
  await ensureInit();
  await msalInstance.loginRedirect({ scopes: [PUBLIC_API_SCOPE] });
}

export function getActiveAccount(): AccountInfo | null {
  return msalInstance.getActiveAccount() ?? msalInstance.getAllAccounts()[0] ?? null;
}

export async function getToken(): Promise<string> {
  await ensureInit();
  const account = getActiveAccount();
  if (!account) {
    await login();
    throw new Error('redirecting to login');
  }
  try {
    const result = await msalInstance.acquireTokenSilent({
      scopes: [PUBLIC_API_SCOPE],
      account
    });
    return result.accessToken;
  } catch {
    await login();
    throw new Error('redirecting to login');
  }
}
