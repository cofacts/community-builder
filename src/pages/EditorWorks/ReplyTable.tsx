import React from 'react';
import { styled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import DataTable, { PAGE_SIZE } from '../../components/DataTable';
import { GridColDef } from '@mui/x-data-grid';

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

type Props = {
  /** Elasticsearch supported time string */
  startDate?: string;
  /** Elasticsearch supported time string */
  endDate?: string;
};

const ReplyTable: React.FC<Props> = ({ startDate, endDate }) => {
  const createdAtFilter = {
    GTE: startDate,
    LTE: endDate,
  };

  const {
    data: statData,
    loading: statLoading,
    error: statError,
  } = useReplyListStatInReplyTableQuery({
    variables: { createdAt: createdAtFilter },
  });
  const { data, loading, error, fetchMore } = useReplyListInReplyTableQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      pageSize: PAGE_SIZE,
      createdAt: createdAtFilter,
    },
  });

  const edges = data?.ListReplies?.edges || [];

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (statError) {
    return <p>Error: {statError}</p>;
  }

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
