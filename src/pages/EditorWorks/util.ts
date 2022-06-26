import { useLocation, useHistory } from 'react-router-dom';

export enum WorkType {
  REPLY,
  ARTICLE_REPLY_FEEDBACK,
  REPLY_REQUEST,
}

/**
 * Parameters to store in URL search string for editor works page
 */
type ParamsFromUrl = Readonly<{
  workType: WorkType;
  day: number;
  userId?: string;
  /** For feedback list. Lists feedbacks for a specific creator of article replies. */
  articleReplyUserId?: string;
  showAll?: boolean;
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
  return new URLSearchParams({
    type: p.workType.toString(),
    day: p.day.toString(),
    ...(p.userId ? { userId: p.userId } : {}),
    ...(p.articleReplyUserId
      ? { articleReplyUserId: p.articleReplyUserId }
      : {}),
    ...(p.showAll ? { showAll: '1' } : {}),
  });
}

/**
 * Retrieves the current params from search string, and a function to navigate to new params
 */
export function useUrlParams(): [ParamsFromUrl, GoFn] {
  const { search, pathname } = useLocation();
  const { push } = useHistory();
  const searchParams = new URLSearchParams(search);

  return [
    {
      workType: +(searchParams.get('type') ?? WorkType.REPLY),
      day: +(searchParams.get('day') ?? 7),
      userId: searchParams.get('userId') || undefined,
      articleReplyUserId: searchParams.get('articleReplyUserId') || undefined,
      showAll: !!searchParams.get('showAll'),
    },
    (p) => {
      push(`${pathname}?${getSearchString(p)}`);
    },
  ];
}
