import React from 'react';
import { Alert } from '@mui/material';

import ArticlesTable from './ArticlesTable';
import TrendPlot from './TrendPlot';
import { useLoadAnalyticsQuery } from '../../types';
import { useUrlParams } from './util';

function Analytics() {
  const [params] = useUrlParams();

  const { data, error } = useLoadAnalyticsQuery({
    variables: {
      filter: {
        ids: params.ids,
      },
      dateRange: {
        GTE: params.from,
        LTE: params.to,
      },
    },
  });

  const articleEdges = data?.ListArticles?.edges ?? [];

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>
      )}
      <TrendPlot articleEdges={articleEdges} style={{ height: 400 }} />
      <div style={{ height: 500 }}>
        <ArticlesTable articleEdges={articleEdges} />
      </div>
    </>
  );
}

export default Analytics;
