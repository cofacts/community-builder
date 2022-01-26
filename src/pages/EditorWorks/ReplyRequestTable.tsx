import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Link as RRLink } from 'react-router-dom';
import DataTable, { PAGE_SIZE } from '../../components/DataTable';
import { GridColDef } from '@mui/x-data-grid';
import { getSearchString, WorkType } from './util';

import {
  useReplyRequestListInReplyRequestTableQuery,
  useReplyRequestListStatInReplyRequestTableQuery,
  ReplyRequestListInReplyRequestTableQuery,
  ReplyRequestStatusEnum,
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
        <RRLink
          to={`?${getSearchString({
            workType: WorkType.REPLY_REQUEST,
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

const NORMAL_STATUSES = [ReplyRequestStatusEnum.Normal];
const ALL_STATUSES = [
  ReplyRequestStatusEnum.Normal,
  ReplyRequestStatusEnum.Blocked,
];

type Props = {
  /** Elasticsearch supported time string */
  startDate?: string;
  /** Elasticsearch supported time string */
  endDate?: string;
  userId?: string;
  /** Also shows BLOCKED reply request if true */
  showAll?: boolean;
};

const ReplyTable: React.FC<Props> = ({
  startDate,
  endDate,
  userId,
  showAll,
}) => {
  const createdAtFilter = {
    GTE: startDate,
    LTE: endDate,
  };
  const statuses = showAll ? ALL_STATUSES : NORMAL_STATUSES;

  const {
    data: statData,
    loading: statLoading,
    error: statError,
  } = useReplyRequestListStatInReplyRequestTableQuery({
    variables: { createdAt: createdAtFilter, userId, statuses },
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
      userId,
      statuses,
    },
  });

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (statError) {
    return <p>Error: {statError}</p>;
  }

  const edges = data?.ListReplyRequests?.edges || [];
  return (
    <DataTable
      currentlyLoadedRows={edges.map(({ node }) => node)}
      columns={COLUMNS}
      rowHeight={64}
      rowCount={statData?.ListReplyRequests?.totalCount || 0}
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
