import React, { useRef, useMemo } from 'react';
import styled from '@emotion/styled';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent, max } from 'd3-array';

import { useSize } from '../../lib/util';

import { LoadAnalyticsQuery } from '../../types';

const ChartContainer = styled.div`
  position: relative;
  & > * {
    position: absolute;
  }
`;

type Props = {
  articleEdges: NonNullable<LoadAnalyticsQuery['ListArticles']>['edges'];
} & React.ComponentPropsWithoutRef<'div'>;

function TrendPlot({ articleEdges, ...containerProps }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [
    /** Array of {date, web, line} */
    points,
    /** time range */
    timeRange,
    /** max web visit */
    maxWebVisit,
    /** max LINE visit */
    maxLineVisit,
  ] = useMemo(() => {
    const unixTsToDataMap = articleEdges.reduce<
      Map</* unix timestamp */ number, { web: number; line: number }>
    >((agg, { node }) => {
      for (const stat of node.stats ?? []) {
        if (!stat) continue; // Make Typescript happy

        /** Unix timestamp */
        const unixTs = +new Date(stat.date) / 1000;

        let statOfTheDay = agg.get(unixTs);

        if (!statOfTheDay) {
          statOfTheDay = { web: 0, line: 0 };
          agg.set(unixTs, statOfTheDay);
        }

        statOfTheDay.web += stat.webVisit ?? 0;
        statOfTheDay.line +=
          stat.lineVisit ??
          0 +
            (stat.liff ?? []).reduce((sum, entry) => sum + entry.visit ?? 0, 0);
      }
      return agg;
    }, new Map());

    const entries = Array.from(unixTsToDataMap.entries());
    const tsRangeWithUndefined = extent(entries.map(([ts]) => ts));
    const timeRange =
      tsRangeWithUndefined[0] === undefined
        ? [new Date(), new Date()]
        : tsRangeWithUndefined.map((ts) => new Date(ts * 1000));

    const days =
      tsRangeWithUndefined[0] === undefined
        ? 0
        : (tsRangeWithUndefined[1] - tsRangeWithUndefined[0]) / 86400;

    return [
      Array.from(Array(days + 1 /* consider both head and tail */)).map(
        (_, i) => {
          const ts = (tsRangeWithUndefined[0] ?? 0) + i * 86400;
          const date = new Date(ts * 1000);
          const statOfTheDay = unixTsToDataMap.get(ts);
          return statOfTheDay
            ? { date, ...statOfTheDay }
            : { date, web: 0, line: 0 };
        }
      ),
      timeRange,
      max(entries.map(([, { web }]) => web)) ?? 0,
      max(entries.map(([, { line }]) => line)) ?? 0,
    ];
  }, [articleEdges]);

  const sizeProps = useSize(chartContainerRef);
  const xScale = scaleTime()
    .domain(timeRange)
    .range([0, sizeProps?.width ?? 0]);

  console.log('ticks', xScale.ticks());
  console.log({ points });

  return (
    <ChartContainer ref={chartContainerRef} {...containerProps}>
      {sizeProps && (
        <svg viewBox={`0 0 ${sizeProps.width} ${sizeProps.height}`}></svg>
      )}
      <div>Y axis</div>
      <div>X axis</div>
    </ChartContainer>
  );
}

export default TrendPlot;
