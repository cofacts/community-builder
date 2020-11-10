/* eslint-disable no-console */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { DataGrid, ColDef } from '@material-ui/data-grid';

import { useListRepliesQuery, ListRepliesQuery } from '../types';

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

const EditorWorks: React.FC = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const beforeParam = searchParams.get('before');
  const afterParam = searchParams.get('after');
  const { data, loading, error } = useListRepliesQuery({
    variables: {
      before: beforeParam,
      after: afterParam,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data || !data.ListReplies || !data.ListReplies.edges) {
    return <p>No data</p>;
  }

  return (
    <DataGrid
      rows={data.ListReplies.edges.map(({ node }) => node)}
      columns={COLUMNS}
      pagination
      autoHeight
      disableSelectionOnClick
      pageSize={25}
      rowHeight={64}
      rowCount={data.ListReplies.totalCount}
      paginationMode="server"
      onPageChange={(params) => {
        console.info('p', params);
      }}
      loading={loading}
    />
  );
};

export default EditorWorks;
