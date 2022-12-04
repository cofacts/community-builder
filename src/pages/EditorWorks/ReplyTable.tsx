import React from 'react';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { Link as RRLink } from 'react-router-dom';
import DataTable, { PAGE_SIZE } from '../../components/DataTable';
import { GridColDef } from '@mui/x-data-grid';
import { getSearchString, WorkType } from './util';

import {
  useReplyListInReplyTableQuery,
  useReplyListStatInReplyTableQuery,
  ReplyListInReplyTableQuery,
} from '../../types';

type User = NonNullable<
  ReplyListInReplyTableQuery['ListReplies']
>['edges'][number]['node']['user'];

type CreatedAt = NonNullable<
  ReplyListInReplyTableQuery['ListReplies']
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

const COLUMNS: GridColDef[] = [
  {
    field: 'author',
    headerName: 'Author',
    width: 120,
    renderCell(params) {
      const user = params.getValue(params.id, 'user') as User;
      if (!user) return <div />;
      return (
        <RRLink
          to={`?${getSearchString({
            workType: WorkType.REPLY,
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
    field: 'text',
    headerName: 'Text',
    width: 480,
    renderCell(params) {
      const text = params.getValue(params.id, 'text');
      const replyId = params.getValue(params.id, 'id');
      if (!replyId || !text) return <div />;
      return (
        <TextCell>
          <Link
            href={`${process.env.REACT_APP_SITE_URL}/reply/${replyId}`}
            color="textPrimary"
            variant="body2"
          >
            {text}
          </Link>
        </TextCell>
      );
    },
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 200,
    valueGetter: (params) => {
      const createdAt = params.value as CreatedAt;
      if (!createdAt) {
        return '';
      }

      return new Date(createdAt).toLocaleString();
    },
  },
];

type Props = React.PropsWithChildren<{
  /** Elasticsearch supported time string */
  startDate?: string;
  /** Elasticsearch supported time string */
  endDate?: string;
  userId?: string;
}>;

const ReplyTable: React.FC<Props> = ({ startDate, endDate, userId }) => {
  const createdAtFilter = {
    GTE: startDate,
    LTE: endDate,
  };

  const {
    data: statData,
    loading: statLoading,
    error: statError,
  } = useReplyListStatInReplyTableQuery({
    variables: { createdAt: createdAtFilter, userId },
  });
  const { data, loading, error, fetchMore } = useReplyListInReplyTableQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      pageSize: PAGE_SIZE,
      createdAt: createdAtFilter,
      userId,
    },
  });

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (statError) {
    return <p>Error: {statError}</p>;
  }

  const edges = data?.ListReplies?.edges || [];
  return (
    <DataTable
      currentlyLoadedRows={edges.map(({ node }) => node)}
      columns={COLUMNS}
      rowHeight={64}
      rowCount={statData?.ListReplies?.totalCount || 0}
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
