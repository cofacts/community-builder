import React from 'react';

import { useLoadAnalyticsQuery } from '../../types';

function Analytics() {
  const { data, error } = useLoadAnalyticsQuery({
    variables: {
      filter: { ids: ['38av08c46kqmx'] },
      dateRange: { GTE: 'noew-2M' },
    },
  });

  return <>Data: {JSON.stringify(error || data)}</>;
}

export default Analytics;
