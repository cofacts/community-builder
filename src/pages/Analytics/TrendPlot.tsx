import React, { useRef, useMemo } from 'react';
import styled from '@emotion/styled';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { extent, max } from 'd3-array';
import { Card, CardContent } from '@mui/material';

import { useSize } from '../../lib/util';

import { LoadAnalyticsQuery } from '../../types';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'short',
});

const numberFormatter = new Intl.NumberFormat();

const ChartContainer = styled.div`
  position: relative;
  & > * {
    position: absolute;
  }
`;

const Axis = styled.div`
  position: relative;
  & > * {
    position: absolute;
  }
`;

const ChartLine = styled.path`
  stroke-width: 2px;
  fill: none;
`;

const HitboxDiv = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  cursor: crosshair;

  > * {
    display: none;
  }

  &:hover > * {
    display: block;
  }
`;

const Dot = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DotStat = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4px;
  margin: 8px 0 0;

  dt {
    color: #666;
  }

  dd {
    margin: 0;
    text-align: right;
  }
`;

type Point = {
  web: number;
  line: number;
  date: Date;
  lineDetail: {
    /** Visit number to Cofacts official LINE bot */
    cofacts: number;
    /** Visit from LIFF of various sources */
    liff: { [source: string]: number };
  };
};

type Props = {
  articleEdges: NonNullable<LoadAnalyticsQuery['ListArticles']>['edges'];
} & React.ComponentPropsWithoutRef<'div'>;

const MARGIN = 48;

function getEmptyStat(): Omit<Point, 'date'> {
  return {
    web: 0,
    line: 0,
    lineDetail: {
      cofacts: 0,
      liff: {},
    },
  };
}

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
    totalWebVisit,
    totalLineVisit,
  ] = useMemo(() => {
    const unixTsToDataMap = articleEdges.reduce<
      Map</* unix timestamp */ number, Omit<Point, 'date'>>
    >((agg, { node }) => {
      for (const stat of node.stats ?? []) {
        if (!stat) continue; // Make Typescript happy

        /** Unix timestamp */
        const unixTs = +new Date(stat.date) / 1000;

        let statOfTheDay = agg.get(unixTs);

        if (!statOfTheDay) {
          statOfTheDay = getEmptyStat();
          agg.set(unixTs, statOfTheDay);
        }

        statOfTheDay.web += stat.webVisit ?? 0;
        const lineDetail = statOfTheDay.lineDetail;
        lineDetail.cofacts += stat.lineVisit ?? 0;
        stat.liff.forEach((liff) => {
          lineDetail.liff[liff.source] ??= 0;
          lineDetail.liff[liff.source] += liff.visit;
        });
        statOfTheDay.line =
          lineDetail.cofacts +
          Object.values(lineDetail.liff).reduce((acc, val) => acc + val, 0);
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

    const points: Point[] = Array.from(
      Array(days + 1 /* consider both head and tail */)
    ).map((_, i) => {
      const ts = (tsRangeWithUndefined[0] ?? 0) + i * 86400;
      const date = new Date(ts * 1000);
      const statOfTheDay = unixTsToDataMap.get(ts);
      return statOfTheDay
        ? { date, ...statOfTheDay }
        : { date, ...getEmptyStat() };
    });

    const webStats = entries.map(([, { web }]) => web);
    const lineStats = entries.map(([, { line }]) => line);

    return [
      points,
      timeRange,
      // Make max web/line visit to be at least 1 so that its y-axis does not go to center
      max([...webStats, 1]) ?? 1,
      max([...lineStats, 1]) ?? 1,
      webStats.reduce((sum, v) => sum + v, 0),
      lineStats.reduce((sum, v) => sum + v, 0),
    ];
  }, [articleEdges]);

  const sizeProps = useSize(chartContainerRef);
  const xScale = scaleTime()
    .domain(timeRange)
    .range([MARGIN, sizeProps ? sizeProps.width - MARGIN : 0]);
  const webScale = scaleLinear()
    .domain([0, maxWebVisit])
    .range([sizeProps ? sizeProps.height - MARGIN : 0, MARGIN])
    .nice();
  const webLineFn = line<Point>(
    (p) => xScale(p.date),
    (p) => webScale(p.web)
  ).curve(curveMonotoneX);
  const lineScale = scaleLinear()
    .domain([0, maxLineVisit])
    .range([sizeProps ? sizeProps.height - MARGIN : 0, MARGIN])
    .nice();
  const lineLineFn = line<Point>(
    (p) => xScale(p.date),
    (p) => lineScale(p.line)
  ).curve(curveMonotoneX);

  /** The width of the hitbox */
  const hitboxWidth =
    Math.max(sizeProps?.width ?? 0 - 2 * MARGIN, 0) /
    (points.length - 1); /* For n points, there are n-1 spaces between them */

  return (
    <>
      <div
        style={{
          display: 'flex',
          padding: `8px ${MARGIN}px 0`,
          justifyContent: 'space-between',
        }}
      >
        <span style={{ color: 'blue' }}>Web visits: {totalWebVisit}</span>
        <span style={{ color: 'green' }}>LINE visits: {totalLineVisit}</span>
      </div>
      <ChartContainer ref={chartContainerRef} {...containerProps}>
        {sizeProps && (
          <svg viewBox={`0 0 ${sizeProps.width} ${sizeProps.height}`}>
            <ChartLine d={webLineFn(points) ?? ''} stroke="blue" />
            <ChartLine d={lineLineFn(points) ?? ''} stroke="green" />
            <line
              x1={MARGIN}
              x2={sizeProps ? sizeProps.width - MARGIN : 0}
              y1={webScale(0)}
              y2={webScale(0)}
              stroke="#ccc"
            />
          </svg>
        )}

        {/* Point hitboxes */}
        {points.map((point, idx) => {
          if (!sizeProps) return null;

          const avgY = (webScale(point.web) + lineScale(point.line)) / 2;

          return (
            <HitboxDiv
              key={point.date.getTime()}
              style={{
                left: xScale(point.date) - hitboxWidth / 2,
                width: hitboxWidth,
              }}
            >
              <Dot
                style={{
                  backgroundColor: 'blue',
                  top: webScale(point.web),
                }}
              />
              <Dot
                style={{
                  backgroundColor: 'green',
                  top: lineScale(point.line),
                }}
              />

              {/* A card that shows the details of the point */}
              <Card
                sx={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  zIndex: 1,
                  minWidth: 'max-content',
                  pointerEvents: 'none', // Don't interfere with the hitbox
                  /* Position the card so that it does not cover the hitbox */
                  ...(idx > points.length / 2
                    ? { right: '100%' }
                    : { left: '100%' }),
                  top: avgY,
                  transform: 'translateY(-50%)',
                }}
              >
                <CardContent>
                  {dateFormatter.format(point.date)}
                  <DotStat>
                    <dt>Web</dt>
                    <dd>{numberFormatter.format(point.web)}</dd>
                    <dt>LINE bot</dt>
                    <dd>{numberFormatter.format(point.lineDetail.cofacts)}</dd>
                    {Object.entries(point.lineDetail.liff).map(
                      ([source, visits]) => (
                        <React.Fragment key={source}>
                          <dt>LIFF ({source || 'other'})</dt>
                          <dd>{numberFormatter.format(visits)}</dd>
                        </React.Fragment>
                      )
                    )}
                  </DotStat>
                </CardContent>
              </Card>
            </HitboxDiv>
          );
        })}
        {/* X-axis */}
        <Axis style={{ left: 0, right: 0, bottom: 0, height: MARGIN }}>
          {xScale.ticks().map((date, i) => (
            <span
              style={{
                left: xScale(date),
                top: 0,
                transform: 'translateX(-50%)',
              }}
              key={i}
            >
              {dateFormatter.format(date)}
            </span>
          ))}
        </Axis>

        {/* Y-axis for web */}
        <Axis style={{ top: 0, bottom: 0, left: 0, color: 'blue' }}>
          {webScale
            .ticks()
            .filter(Number.isInteger)
            .map((value, i) => (
              <span
                style={{
                  top: webScale(value),
                  width: MARGIN,
                  transform: 'translateY(-50%)',
                  textAlign: 'right',
                }}
                key={i}
              >
                {numberFormatter.format(value)}
              </span>
            ))}
        </Axis>

        {/* Y-axis for LINE */}
        <Axis style={{ top: 0, bottom: 0, right: 0, color: 'green' }}>
          {lineScale
            .ticks()
            .filter(Number.isInteger)
            .map((value, i) => (
              <span
                style={{
                  top: lineScale(value),
                  width: MARGIN,
                  transform: 'translateY(-50%)',
                  right: 0,
                }}
                key={i}
              >
                {numberFormatter.format(value)}
              </span>
            ))}
        </Axis>
      </ChartContainer>
    </>
  );
}

export default TrendPlot;
