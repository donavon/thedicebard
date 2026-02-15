import { siteLocale, siteTimeZone } from "~/data/site";

const siteDateFormatter = new Intl.DateTimeFormat(siteLocale, {
  timeZone: siteTimeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const siteOffsetFormatter = new Intl.DateTimeFormat(siteLocale, {
  timeZone: siteTimeZone,
  timeZoneName: "shortOffset",
});

export function formatIsoDateTimeInSiteTimeZone(isoDateTime: string) {
  const timestamp = new Date(isoDateTime);
  if (Number.isNaN(timestamp.getTime())) {
    throw new Error(`Invalid datetime '${isoDateTime}'`);
  }

  const dateParts = siteDateFormatter.formatToParts(timestamp);
  const year = dateParts.find((part) => part.type === "year")?.value;
  const month = dateParts.find((part) => part.type === "month")?.value;
  const day = dateParts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error(`Unable to format datetime '${isoDateTime}'`);
  }

  return `${year}-${month}-${day}`;
}

export function getSiteUtcOffsetForDate(date: string) {
  const utcNoon = new Date(`${date}T12:00:00.000Z`);
  if (Number.isNaN(utcNoon.getTime())) {
    throw new Error(`Invalid ISO date '${date}'`);
  }

  const offsetLabel = siteOffsetFormatter
    .formatToParts(utcNoon)
    .find((part) => part.type === "timeZoneName")?.value;

  if (!offsetLabel) {
    throw new Error(`Unable to read offset for '${date}'`);
  }

  const match = /^GMT([+-])(\d{1,2})(?::?(\d{2}))?$/.exec(offsetLabel);
  if (!match) {
    throw new Error(`Unexpected offset '${offsetLabel}' for '${date}'`);
  }

  const [, sign, rawHours, rawMinutes = "00"] = match;
  const hours = rawHours.padStart(2, "0");
  const minutes = rawMinutes.padStart(2, "0");

  return `${sign}${hours}:${minutes}`;
}
