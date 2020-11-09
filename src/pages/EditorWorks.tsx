/* eslint-disable no-console */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { DataGrid, ColDef } from '@material-ui/data-grid';

import { useListRepliesQuery } from '../types';

const COLUMNS: ColDef[] = [
  { field: 'author', headerName: 'Author' },
  { field: 'text', headerName: 'Text' },
  { field: 'createdAt', headerName: 'Created At' },
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
      pageSize={25}
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
