import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { DataGrid, ColDef } from '@material-ui/data-grid';

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

const COLUMNS: ColDef[] = [
  {
    field: 'author',
    headerName: 'Author',
    width: 120,
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
    field: 'text',
    headerName: 'Text',
    width: 480,
    // eslint-disable-next-line react/display-name
    renderCell: (params) => {
      const text = params.getValue('text');
      const replyId = params.getValue('id');
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

  const edges = data?.ListReplies?.edges || [];
  const isLoading = loading || statLoading;
  return (
    <DataGrid
      rows={edges.map(({ node }) => node)}
      columns={COLUMNS}
      pagination
      disableSelectionOnClick
      pageSize={PAGE_SIZE}
      rowHeight={64}
      rowCount={statData?.ListReplies?.totalCount || 0}
      paginationMode="server"
      rowsPerPageOptions={[]}
      onPageChange={handlePageChange}
      loading={isLoading}
      hideFooterPagination={isLoading}
    />
  );
};

export default ReplyTable;
