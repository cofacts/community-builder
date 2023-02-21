import React from 'react';
import Link from '@mui/material/Link';
import { LoadAnalyticsQuery } from '../../types';
import { ArticleCell, TextCell } from '../../components/cells';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

type Props = {
  articleEdges: NonNullable<LoadAnalyticsQuery['ListArticles']>['edges'];
};
type ArticleNode = Props['articleEdges'][0]['node'];

const numFormatter = new Intl.NumberFormat();

const COLUMNS = [
  {
    field: 'id',
    headerName: 'ID',
    renderCell(params) {
      const id = params.value;
      return (
        <Link href={`${process.env.REACT_APP_SITE_URL}/article/${id}`}>
          {id}
        </Link>
      );
    },
  },
  {
    field: 'text',
    headerName: 'Content',
    width: 400,
    renderCell(params) {
      const article: ArticleNode = params.row;
      return <ArticleCell article={article} />;
    },
  },
  {
    field: 'createdAt',
    headerName: 'First submitted',
    width: 120,
    renderCell(params) {
      return <TextCell>{new Date(params.value).toLocaleString()}</TextCell>;
    },
  },
  {
    field: 'line',
    headerName: 'LINE visits',
    valueGetter: (param) => {
      const article: ArticleNode = param.row;

      return (article?.stats ?? []).reduce((sum, stat) => {
        const liffSum = (stat?.liff ?? []).reduce(
          (sum, record) => sum + record.visit,
          0
        );

        return sum + (stat?.lineVisit ?? 0) + liffSum;
      }, 0);
    },
    valueFormatter: (param) => numFormatter.format(param.value),
  },
  {
    field: 'web',
    headerName: 'Web visits',
    valueGetter: (param) => {
      const article: ArticleNode = param.row;

      return (article?.stats ?? []).reduce((sum, stat) => {
        return sum + (stat?.webVisit ?? 0);
      }, 0);
    },
    valueFormatter: (param) => numFormatter.format(param.value),
  },
] satisfies GridColDef[];

function ArticlesTable({ articleEdges }: Props) {
  return (
    <DataGrid
      rows={articleEdges.map(({ node }) => node)}
      columns={COLUMNS}
      rowHeight={64}
      hideFooterPagination
    />
  );
}

export default ArticlesTable;
