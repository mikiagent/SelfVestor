export interface Settings {
  weeklyResetDay: number; // 0-6 (Sunday-Saturday)
  monthlyResetDay: number; // 1-31
  timezone: string; // IANA timezone identifier
}

export const DEFAULT_SETTINGS: Settings = {
  weeklyResetDay: 0, // Sunday
  monthlyResetDay: 1, // First day of month
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone // User's local timezone
};