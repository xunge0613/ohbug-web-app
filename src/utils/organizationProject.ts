const ORGANIZATION_KEY = 'ohbug_organization';

export function getCurrentOrganization(): string | null {
  const currentOrganization = localStorage.getItem(ORGANIZATION_KEY);
  return currentOrganization || null;
}
export function setCurrentOrganization(payload: string | number) {
  return localStorage.setItem(ORGANIZATION_KEY, payload.toString());
}
