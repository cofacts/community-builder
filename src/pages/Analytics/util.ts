import { useLocation, useNavigate } from 'react-router-dom';
import { TimeRangeInput } from '../../types';

/**
 * Parameters to store in URL search string for analytics page
 */
type ParamsFromUrl = Readonly<{
  /** Article IDs to analyze */
  ids: string[];
  /** Start date in ISO format or relative format like 'now-2M' */
  from?: string | null;
  /** End date in ISO format or relative format like 'now' */
  to?: string | null;
}>;

/**
 * Goes to the URL specified by `p`.
 */
type GoFn = (p: ParamsFromUrl) => void;

/**
 * @param p
 * @returns URLSearchParams instance for the given params
 */
export function getSearchString(p: ParamsFromUrl): URLSearchParams {
  const params: Record<string, string> = {
    ids: p.ids.join(','),
  };
  if (p.from) params.from = p.from;
  if (p.to) params.to = p.to;
  return new URLSearchParams(params);
}

/**
 * Retrieves the current params from search string, and a function to navigate to new params
 */
export function useUrlParams(): [ParamsFromUrl, GoFn] {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  return [
    {
      ids: (searchParams.get('ids') ?? '9ucr9JQBYrjt7MSMbKcx').split(','),
      from: searchParams.get('from') ?? 'now-2M',
      to: searchParams.get('to') ?? 'now',
    },
    (p) => {
      navigate(`${pathname}?${getSearchString(p)}`);
    },
  ];
}
