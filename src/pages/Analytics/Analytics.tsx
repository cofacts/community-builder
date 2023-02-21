import React from 'react';

import ArticlesTable from './ArticlesTable';
import TrendPlot from './TrendPlot';
import { useLoadAnalyticsQuery } from '../../types';

function Analytics() {
  const { data, error } = useLoadAnalyticsQuery({
    variables: {
      // filter: { ids: ['1ijttxdp31nsd', '250oafg9kzopp', '2xpltyroe0qbi'] },
      filter: {
        ids: ['3orufkwgy9ier', '1jfbosave9lq8'],
      },
      dateRange: { GTE: 'now-2M' },
    },
  });

  const articleEdges = data?.ListArticles?.edges ?? [];

  return (
    <>
      <p>Data: {JSON.stringify(error || data)}</p>
      <TrendPlot articleEdges={articleEdges} style={{ height: 500 }} />
      <div style={{ height: 500 }}>
        <ArticlesTable articleEdges={articleEdges} />
      </div>
    </>
  );
}

export default Analytics;
