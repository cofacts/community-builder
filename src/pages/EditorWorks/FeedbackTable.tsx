import React from 'react';

import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import { Link as RRLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import DataTable, { PAGE_SIZE } from '../../components/DataTable';
import { TextCell } from '../../components/cells';
import { GridColDef } from '@mui/x-data-grid';
import { getSearchString, WorkType } from './util';

import {
  useFeedbackListInFeedbackTableQuery,
  useFeedbackListStatInFeedbackTableQuery,
  FeedbackListInFeedbackTableQuery,
  FeedbackVote,
  ArticleReplyFeedbackStatusEnum,
} from '../../types';

type User = NonNullable<
  FeedbackListInFeedbackTableQuery['ListArticleReplyFeedbacks']
>['edges'][number]['node']['user'];

type Article = NonNullable<
  FeedbackListInFeedbackTableQuery['ListArticleReplyFeedbacks']
>['edges'][number]['node']['article'];

type Reply = NonNullable<
  FeedbackListInFeedbackTableQuery['ListArticleReplyFeedbacks']
>['edges'][number]['node']['reply'];

type CreatedAt = NonNullable<
  FeedbackListInFeedbackTableQuery['ListArticleReplyFeedbacks']
>['edges'][number]['node']['createdAt'];

type ArticleCategory = NonNullable<
  NonNullable<Article>['articleCategories']
>[number];

type ValidArticleCategory = NonNullable<ArticleCategory> & {
  category: NonNullable<NonNullable<ArticleCategory>['category']>;
};

function isValidArticleCategory(
  ar: ArticleCategory
): ar is ValidArticleCategory {
  return (
    !!ar &&
    typeof ar.positiveFeedbackCount === 'number' &&
    typeof ar.negativeFeedbackCount === 'number' &&
    ar.positiveFeedbackCount >= ar.negativeFeedbackCount
  );
}

const COLUMNS: GridColDef[] = [
  {
    field: 'author',
    headerName: 'Author',
    width: 160,
    renderCell(params) {
      const user = params.getValue(params.id, 'user') as User;
      if (!user) return <div />;
      return (
        <RRLink
          to={`?${getSearchString({
            workType: WorkType.ARTICLE_REPLY_FEEDBACK,
            day: 7,
            userId: user.id,
            showAll: true,
          })}`}
        >
          {user.name}
        </RRLink>
      );
    },
  },
  {
    field: 'vote',
    headerName: 'Vote',
    width: 48,
    valueGetter: (params) => {
      switch (params.value) {
        case FeedbackVote.Upvote:
          return '👍';
        case FeedbackVote.Downvote:
          return '👎';
        default:
          return '--';
      }
    },
  },
  {
    field: 'comment',
    headerName: 'Comment',
    width: 300,
    renderCell(params) {
      const comment = params.value;
      return <TextCell>{comment}</TextCell>;
    },
  },
  {
    field: 'target',
    headerName: 'Article & Reply',
    width: 300,
    renderCell(params) {
      const article = params.getValue(params.id, 'article') as Article;
      const reply = params.getValue(params.id, 'reply') as Reply;

      const replyElem = reply && (
        <Link
          href={`${process.env.REACT_APP_SITE_URL}/reply/${reply.id}`}
          color="textPrimary"
          variant="body2"
        >
          <Typography variant="body2" title={reply.text || ''}>
            {reply.text || ''}
          </Typography>
        </Link>
      );

      // Make Typescript happy, never happen
      if (!article) return '';

      switch (article.articleType) {
        case 'IMAGE':
          // Make Typescript happy, never happen
          if (!article.attachmentUrl) return '';
          return (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Link
                href={`${process.env.REACT_APP_SITE_URL}/article/${article.id}`}
              >
                <img
                  style={{ height: 64, verticalAlign: 'bottom' }}
                  src={article.attachmentUrl}
                  alt={article.id}
                />
              </Link>
              {replyElem}
            </div>
          );
        default:
          return (
            <div>
              <Link
                href={`${process.env.REACT_APP_SITE_URL}/article/${article.id}`}
                color="textPrimary"
                variant="body2"
              >
                <Typography variant="body2" title={article.text || ''}>
                  {article.text || ''}
                </Typography>
              </Link>
              {replyElem}
            </div>
          );
      }
    },
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 175,
    valueGetter: (params) => {
      const createdAt = params.value as CreatedAt;
      if (!createdAt) {
        return '';
      }

      return new Date(createdAt).toLocaleString();
    },
  },
  {
    field: 'categories',
    headerName: 'Article category',
    width: 240,
    renderCell(params) {
      const article = params.getValue(params.id, 'article') as Article;
      const categories = (article?.articleCategories || []).filter(
        isValidArticleCategory
      );
      if (categories.length === 0) return '';

      return (
        <TextCell>
          {categories.map(({ category }, idx) => (
            <Chip
              size="small"
              key={idx}
              label={category.title}
              style={{ margin: ' 0 1px 1px 0' }}
            />
          ))}
        </TextCell>
      );
    },
  },
];

const NORMAL_STATUSES = [ArticleReplyFeedbackStatusEnum.Normal];
const ALL_STATUSES = [
  ArticleReplyFeedbackStatusEnum.Normal,
  ArticleReplyFeedbackStatusEnum.Blocked,
];

type Props = {
  /** Elasticsearch supported time string */
  startDate?: string;
  /** Elasticsearch supported time string */
  endDate?: string;
  userId?: string;
  articleReplyUserId?: string;
  /** Also shows BLOCKED feedbacks if true */
  showAll?: boolean;
};

const ReplyTable = ({
  startDate,
  endDate,
  userId,
  articleReplyUserId,
  showAll,
}: Props) => {
  const createdAtFilter = {
    GTE: startDate,
    LTE: endDate,
  };
  const statuses = showAll ? ALL_STATUSES : NORMAL_STATUSES;

  const {
    data: statData,
    loading: statLoading,
    error: statError,
  } = useFeedbackListStatInFeedbackTableQuery({
    variables: {
      createdAt: createdAtFilter,
      userId,
      articleReplyUserId,
      statuses,
    },
  });
  const { data, loading, error, fetchMore } =
    useFeedbackListInFeedbackTableQuery({
      notifyOnNetworkStatusChange: true,
      variables: {
        pageSize: PAGE_SIZE,
        createdAt: createdAtFilter,
        userId,
        articleReplyUserId,
        statuses,
      },
    });

  if (error) {
    return <p>Error: {error.toString()}</p>;
  }
  if (statError) {
    return <p>Error: {statError.toString()}</p>;
  }

  const edges = data?.ListArticleReplyFeedbacks?.edges || [];
  return (
    <DataTable
      currentlyLoadedRows={edges.map(({ node }) => node)}
      columns={COLUMNS}
      rowHeight={64}
      rowCount={statData?.ListArticleReplyFeedbacks?.totalCount || 0}
      onNewPageRequest={() =>
        fetchMore({
          variables: { after: edges[edges.length - 1].cursor },
        })
      }
      loading={loading || statLoading}
    />
  );
};

export default ReplyTable;
