const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
} as const;

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", DATE_FORMAT_OPTIONS);
}
