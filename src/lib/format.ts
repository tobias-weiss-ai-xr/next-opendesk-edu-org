const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
} as const;

export function formatDate(date: string, locale: string = 'en'): string {
  return new Date(date).toLocaleDateString(locale, DATE_FORMAT_OPTIONS);
}
