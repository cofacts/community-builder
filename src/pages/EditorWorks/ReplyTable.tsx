import React from 'react';
import { styled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { DataGrid, ColDef } from '@material-ui/data-grid';

import { useListRepliesQuery, ListRepliesQuery } from '../../types';

type User = NonNullable<
  ListRepliesQuery['ListReplies']
>['edges'][number]['node']['user'];

type CreatedAt = NonNullable<
  ListRepliesQuery['ListReplies']
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
      return <div>{user.name}</div>;
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

const ReplyTable: React.FC = () => {
  const { data, loading, error } = useListRepliesQuery({
    variables: {},
  });

  if (error) {
    return <p>Error: {error}</p>;
  }
  const rows = (data?.ListReplies?.edges || []).map(({ node }) => node);
  return (
    <DataGrid
      rows={rows}
      columns={COLUMNS}
      pagination
      autoHeight
      disableSelectionOnClick
      pageSize={25}
      rowHeight={64}
      rowCount={data?.ListReplies?.totalCount || 0}
      paginationMode="server"
      onPageChange={(params) => {
        // eslint-disable-next-line no-console
        console.info('p', params);
      }}
      loading={loading}
    />
  );
};

export default ReplyTable;
