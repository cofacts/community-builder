import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import {
  useReplyRequestListInReplyRequestTableQuery,
  useReplyRequestListStatInReplyRequestTableQuery,
  ReplyRequestListInReplyRequestTableQuery,
} from '../../types';

type User = NonNullable<
  ReplyRequestListInReplyRequestTableQuery['ListReplyRequests']
>['edges'][number]['node']['user'];

type UpdatedAt = NonNullable<
  ReplyRequestListInReplyRequestTableQuery['ListReplyRequests']
>['edges'][number]['node']['updatedAt'];

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
    width: 160,
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
    field: 'reason',
    headerName: 'Reason',
    width: 300,
    renderCell(params) {
      const reason = params.value;
      return <TextCell>{reason}</TextCell>;
    },
  },
  {
    field: 'updatedAt',
    headerName: 'Updated At',
    width: 200,
    valueGetter: (params) => {
      const updatedAt = params.value as UpdatedAt;
      if (!updatedAt) {
        return '';
      }

      return new Date(updatedAt).toLocaleString();
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
  } = useReplyRequestListStatInReplyRequestTableQuery({
    variables: { createdAt: createdAtFilter },
  });
  const {
    data,
    loading,
    error,
    fetchMore,
  } = useReplyRequestListInReplyRequestTableQuery({
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
  >['onPageChange'] = (page) => {
    // Nothing is required when paginating between already loaded pages
    if (page <= loadedPageIdx) return;

    fetchMore({
      variables: { after: edges[edges.length - 1].cursor },
    });
    setLoadedPageIdx(page);
  };

  const edges = data?.ListReplyRequests?.edges || [];
  const isLoading = loading || statLoading;
  return (
    <DataGrid
      rows={edges.map(({ node }) => node)}
      columns={COLUMNS}
      pagination
      disableSelectionOnClick
      pageSize={PAGE_SIZE}
      rowHeight={64}
      rowCount={statData?.ListReplyRequests?.totalCount || 0}
      paginationMode="server"
      rowsPerPageOptions={[]}
      onPageChange={handlePageChange}
      loading={isLoading}
      hideFooterPagination={isLoading}
    />
  );
};

export default ReplyTable;
