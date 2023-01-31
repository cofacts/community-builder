import dateMath from '@elastic/datemath';
import produce from 'immer';

import { TimeRangeInput, ArticleTypeEnum } from '../types';

const numberFormatter = Intl.NumberFormat();

/**
 * Converts 1234 to "1,234"
 *
 * @param num The number to convert
 */
export function getThousandSep(num: number): string {
  return numberFormatter.format(num);
}

/**
 * @param enum
 * @returns type guard of the enum
 */
export function isSomeEnum<T extends object>(e: T) {
  return (token: unknown): token is T[keyof T] =>
    Object.values(e).includes(token as T[keyof T]);
}

const shortDateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'short',
  timeStyle: 'short',
});

function getDateString(rawString: string) {
  const parsed = dateMath.parse(rawString);
  if (parsed === undefined) return 'invalid date';

  return shortDateFormatter.format(parsed.toDate());
}

/**
 * Converts named `timeRange` to human readable math formula (A < name < B) with absolute date and time
 * @param name - Name of the range to appear in the math formula
 * @param timeRange - Cofacts API `TimeRangeInput`
 * @returns The formatted date/time range
 */
export function getTimeRangeString(name: string, timeRange: TimeRangeInput) {
  if (timeRange.EQ) {
    return `${name} is ${getDateString(timeRange.EQ)}`;
  }

  const lowerBound = timeRange.GT
    ? `${getDateString(timeRange.GT)} <`
    : timeRange.GTE
    ? `${getDateString(timeRange.GTE)} ≤`
    : '';
  const upperBound = timeRange.LT
    ? `< ${getDateString(timeRange.LT)}`
    : timeRange.LTE
    ? ` ≤ ${getDateString(timeRange.LTE)}`
    : '';

  return [lowerBound, name, upperBound].filter((s) => !!s).join(' ');
}

export function getArticleType(articleTypeEnum: ArticleTypeEnum) {
  switch (articleTypeEnum) {
    case ArticleTypeEnum.Audio:
      return 'audios';
    case ArticleTypeEnum.Video:
      return 'videos';
    case ArticleTypeEnum.Text:
      return 'texts';
    case ArticleTypeEnum.Image:
      return 'images';
    default:
      return articleTypeEnum;
  }
}

export function rejectsNull<T>(maybe: T | null): maybe is T {
  return maybe !== null;
}

function isEmptyFilter(v: unknown): boolean {
  if (v === undefined || v === null) return true;
  if (typeof v !== 'object') return false;
  return Object.keys(v).length === 0;
}

function isTraversable(v: unknown): v is { [key: string]: unknown } {
  return typeof v === 'object' && v !== null;
}

export function cleanupFilterObj(kv: { [key: string]: unknown }) {
  return produce(kv, (draftKv) => {
    for (const [key, value] of Object.entries(draftKv)) {
      if (isTraversable(value)) {
        draftKv[key] = cleanupFilterObj(value);
      }
      if (isEmptyFilter(draftKv[key])) {
        delete draftKv[key];
      }
    }
  });
}
