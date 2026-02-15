import { getSiteUtcOffsetForDate } from "~/utils/site-time";

export function toIsoDateTime(date: string) {
  return `${date}T12:00:00${getSiteUtcOffsetForDate(date)}`;
}

export function toRssPubDate(date: string) {
  const timestamp = new Date(toIsoDateTime(date));
  if (Number.isNaN(timestamp.getTime())) {
    throw new Error(`Invalid ISO date '${date}'`);
  }

  return timestamp.toUTCString();
}
