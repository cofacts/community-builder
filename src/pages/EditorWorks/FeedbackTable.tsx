import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { DataGrid, ColDef } from '@material-ui/data-grid';

import {
  useFeedbackListInFeedbackTableQuery,
  useFeedbackListStatInFeedbackTableQuery,
  FeedbackListInFeedbackTableQuery,
  FeedbackVote,
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

const TextCell = styled('div')({
  width: '100%',
  overflow: 'hidden',
  display: '-webkit-box',
  whiteSpace: 'normal',
  lineHeight: 1.2,
  '-webkit-box-orient': 'vertical',
  '-webkit-line-clamp': 3,
});

const COLUMNS: ColDef[] = [
  {
    field: 'author',
    headerName: 'Author',
    width: 160,
    // eslint-disable-next-line react/display-name
    renderCell: (params) => {
      const user = params.getValue('user') as User;
      if (!user) return <div />;
      return (
        <Link
          href={`${process.env.REACT_APP_SITE_URL}/user?id=${user.id}`}
          color="textPrimary"
          variant="body2"
        >
          {user.name}
        </Link>
      );
    },
  },
  {
    field: 'vote',
    headerName: 'Vote',
    width: 48,
    valueGetter: (params) => {
      switch (params.getValue('vote')) {
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
    // eslint-disable-next-line react/display-name
    renderCell: (params) => {
      const comment = params.getValue('comment');
      return <TextCell>{comment}</TextCell>;
    },
  },
  {
    field: 'target',
    headerName: 'Article & Reply',
    width: 480,
    // eslint-disable-next-line react/display-name
    renderCell: (params) => {
      const article = params.getValue('article') as Article;
      const reply = params.getValue('reply') as Reply;
      return (
        <div>
          {article && (
            <Link
              href={`${process.env.REACT_APP_SITE_URL}/article/${article.id}`}
              color="textPrimary"
              variant="body2"
            >
              <Typography variant="body2">{article.text || ''}</Typography>
            </Link>
          )}
          {reply && (
            <Link
              href={`${process.env.REACT_APP_SITE_URL}/reply/${reply.id}`}
              color="textPrimary"
              variant="body2"
            >
              <Typography variant="body2">{reply.text || ''}</Typography>
            </Link>
          )}
        </div>
      );
    },
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 200,
    valueGetter: (params) => {
      const createdAt = params.getValue('createdAt') as CreatedAt;
      if (!createdAt) {
        return '';
      }

      return new Date(createdAt).toLocaleString();
    },
  },
];

type Props = {
  /** Elasticsearch supported time string */
  startDate?: string;
  /** Elasticsearch supported time string */
  endDate?: string;
};

const PAGE_SIZE = 50;

const ReplyTable: React.FC<Props> = ({ startDate, endDate }) => {
  const [loadedPageIdx, setLoadedPageIdx] = useState<number>(1);
  const createdAtFilter = {
    GTE: startDate,
    LTE: endDate,
  };

  const {
    data: statData,
    loading: statLoading,
    error: statError,
  } = useFeedbackListStatInFeedbackTableQuery({
    variables: { createdAt: createdAtFilter },
  });
  const {
    data,
    loading,
    error,
    fetchMore,
  } = useFeedbackListInFeedbackTableQuery({
    variables: {
      pageSize: PAGE_SIZE,
      createdAt: createdAtFilter,
    },
  });

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (statError) {
    return <p>Error: {statError}</p>;
  }

  const handlePageChange: React.ComponentProps<
    typeof DataGrid
  >['onPageChange'] = (params) => {
    // Nothing is required when paginating between already loaded pages
    if (params.page <= loadedPageIdx) return;

    fetchMore({
      variables: { after: edges[edges.length - 1].cursor },
    });
    setLoadedPageIdx(params.page);
  };

  const edges = data?.ListArticleReplyFeedbacks?.edges || [];
  return (
    <DataGrid
      rows={edges.map(({ node }) => node)}
      columns={COLUMNS}
      pagination
      disableSelectionOnClick
      pageSize={PAGE_SIZE}
      rowHeight={64}
      rowCount={statData?.ListArticleReplyFeedbacks?.totalCount || 0}
      paginationMode="server"
      rowsPerPageOptions={[]}
      onPageChange={handlePageChange}
      loading={loading || statLoading}
    />
  );
};

export default ReplyTable;
