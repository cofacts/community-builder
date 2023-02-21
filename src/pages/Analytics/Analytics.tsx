import React from 'react';

import ArticlesTable from './ArticlesTable';
import { useLoadAnalyticsQuery } from '../../types';

function Analytics() {
  const { data, error } = useLoadAnalyticsQuery({
    variables: {
      filter: { ids: ['1ijttxdp31nsd', '250oafg9kzopp', '2xpltyroe0qbi'] },
      dateRange: { GTE: 'now-2M' },
    },
  });

  return (
    <>
      <p>Data: {JSON.stringify(error || data)}</p>
      <div style={{ height: 500 }}>
        <ArticlesTable articleEdges={data?.ListArticles?.edges ?? []} />
      </div>
    </>
  );
}

export default Analytics;
