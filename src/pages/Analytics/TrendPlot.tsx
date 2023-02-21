import React, { useRef } from 'react';
import { useSize } from '../../lib/util';

import { LoadAnalyticsQuery } from '../../types';

type Props = {
  articleEdges: NonNullable<LoadAnalyticsQuery['ListArticles']>['edges'];
} & React.ComponentPropsWithoutRef<'div'>;

function TrendPlot({ articleEdges, ...containerProps }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const sizeProps = useSize(chartContainerRef);

  return (
    <div ref={chartContainerRef} {...containerProps}>
      {sizeProps ? `${sizeProps.width} x ${sizeProps.height}` : ''}
    </div>
  );
}

export default TrendPlot;
