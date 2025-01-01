export const ADMIN_CREDENTIALS = {
  email: 'admin@selfvestor.com',
  password: 'selfvestor'
};

export function isAdminUser(email: string): boolean {
  return email === ADMIN_CREDENTIALS.email;
}