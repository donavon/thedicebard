type IsoDate = `${number}-${number}-${number}`;

function isIsoDate(value: string): value is IsoDate {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return false;
  }

  const [, year, month, day] = match;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  return (
    parsed.getUTCFullYear() === Number(year) &&
    parsed.getUTCMonth() + 1 === Number(month) &&
    parsed.getUTCDate() === Number(day)
  );
}

function assertIsoDate(value: string, fieldName: string): IsoDate {
  if (!isIsoDate(value)) {
    throw new Error(`Invalid ${fieldName}: '${value}'. Expected YYYY-MM-DD.`);
  }

  return value;
}

type BlogFrontmatter = {
  title: string;
  synopsis: string;
  author: string;
  publishedDate: IsoDate;
  lastModified?: IsoDate;
  imageUrl: string;
  imageAlt: string;
  imageCreditName: string;
  imageCreditUrl: string;
};

export { assertIsoDate, isIsoDate };
export type { BlogFrontmatter, IsoDate };
