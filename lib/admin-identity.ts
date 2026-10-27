// This account uses the public business email; the username is only a login alias.
// Supabase still verifies the password and database policies still check admin membership.
export const namedAdmin = { username: "Admin", email: "joshjagmohan93@gmail.com" } as const;

export function adminSignInEmail(identifier: string): string {
  const normalized = identifier.trim().toLowerCase();
  return normalized === namedAdmin.username.toLowerCase() ? namedAdmin.email : normalized;
}
