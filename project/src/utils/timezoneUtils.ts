interface TimezoneOption {
  name: string;
  value: string;
  offset: number;
}

const TIMEZONE_OPTIONS: TimezoneOption[] = [
  { name: 'Eastern Time (UTC-5)', value: 'America/New_York', offset: -5 },
  { name: 'Central Time (UTC-6)', value: 'America/Chicago', offset: -6 },
  { name: 'Mountain Time (UTC-7)', value: 'America/Denver', offset: -7 },
  { name: 'Pacific Time (UTC-8)', value: 'America/Los_Angeles', offset: -8 },
  { name: 'Alaska Time (UTC-9)', value: 'America/Anchorage', offset: -9 },
  { name: 'Hawaii Time (UTC-10)', value: 'Pacific/Honolulu', offset: -10 },
  { name: 'Atlantic Time (UTC-4)', value: 'America/Halifax', offset: -4 },
  { name: 'Greenwich Mean Time (UTC+0)', value: 'Etc/GMT', offset: 0 },
  { name: 'Central European Time (UTC+1)', value: 'Europe/Paris', offset: 1 },
  { name: 'Eastern European Time (UTC+2)', value: 'Europe/Kiev', offset: 2 },
  { name: 'India Standard Time (UTC+5:30)', value: 'Asia/Kolkata', offset: 5.5 },
  { name: 'China Standard Time (UTC+8)', value: 'Asia/Shanghai', offset: 8 },
  { name: 'Japan Standard Time (UTC+9)', value: 'Asia/Tokyo', offset: 9 },
  { name: 'Australian Eastern Time (UTC+10)', value: 'Australia/Sydney', offset: 10 }
];

export function getAvailableTimezones(): TimezoneOption[] {
  return TIMEZONE_OPTIONS;
}

export function formatInTimezone(date: Date, timezone: string): Date {
  return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
}

export function getCurrentDateInTimezone(timezone: string): Date {
  const date = new Date();
  return formatInTimezone(date, timezone);
}

export function getTimezoneByValue(value: string): TimezoneOption | undefined {
  return TIMEZONE_OPTIONS.find(tz => tz.value === value);
}