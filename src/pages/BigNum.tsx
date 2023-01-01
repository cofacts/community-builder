import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { useLocation } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import { isSomeEnum } from '../lib/util';
import FUN_NUMBERS from '../lib/funNumbers';

const MARGIN = 8;
const POLLING_INTERVAL = 5000;

export enum PanelType {
  replied = 'replied',
  feedback = 'feedback',
  comment = 'comment',
}

/**
 * Setup data for BigNum displays derived from <BigNumSetup>
 */
type Setup = {
  /**
   * Date to start counting
   */
  start: Date;

  /**
   * What panel(s) to display
   */
  panels: PanelType[];
};

const PANELS_SETUP = {
  [PanelType.replied]: {
    top: '回覆了',
    bottom: '則訊息',
    query: gql`
      query BigNumOfReplied($startTime: String) {
        query: ListArticles(filter: { repliedAt: { GTE: $startTime } }) {
          totalCount
        }
      }
    `,
  },
  [PanelType.feedback]: {
    top: '新增了',
    bottom: '則評價',
    query: gql`
      query BigNumOfFeedbacks($startTime: String) {
        query: ListArticleReplyFeedbacks(
          filter: { createdAt: { GTE: $startTime }, appId: "WEBSITE" }
        ) {
          totalCount
        }
      }
    `,
  },
  [PanelType.comment]: {
    top: '新增了',
    bottom: '則補充',
    query: gql`
      query BigNumOfComments($startTime: String) {
        query: ListReplyRequests(
          filter: { createdAt: { GTE: $startTime }, appId: "WEBSITE" }
        ) {
          totalCount
        }
      }
    `,
  },
} as const;

const DISPLAY_SIZE = 768;

const displayClasses = {
  time: css`
    font-size: 36px;
    font-weight: 200;
  `,
  top: css`
    font-size: 64px;
    font-weight: 600;
  `,
  bottom: css`
    font-size: 44px;
    font-weight: 600;
  `,
  number: css`
    font-size: 360px;
    line-height: 1;
    font-weight: 400;
  `,
  funNumber: css`
    font-size: 360px;
    font-weight: 100;
  `,
  funParagraph: css`
    font-size: 84px;
    font-weight: 600;
  `,
  border: css`
    position: absolute;
    border: 8px solid rgba(0, 0, 0, 0.64);
    top: 24px;
    right: 24px;
    bottom: 24px;
    left: 24px;
  `,
};

type BigNumDisplayProps = {
  rootProps: React.ComponentPropsWithoutRef<'div'>;
  start: Setup['start'];
  panelType: PanelType;
};

const BigNumDisplay = ({ rootProps, start, panelType }: BigNumDisplayProps) => {
  const { top, bottom, query } = PANELS_SETUP[panelType];

  const { data, loading, error } = useQuery(query, {
    pollInterval: POLLING_INTERVAL,
    variables: { startTime: start.toISOString() },
  });

  if (loading) {
    return <div {...rootProps}>Loading</div>;
  }

  if (error) {
    return <div {...rootProps}>{error.toString()}</div>;
  }

  const number = data.query?.totalCount as number | null;
  const numberStr = number === null ? '' : number.toString();

  if (number && number in FUN_NUMBERS) {
    const { top, bottom } = FUN_NUMBERS[number];
    return (
      <>
        <div {...rootProps}>
          {top && <p className={displayClasses.funParagraph}>{top}</p>}
          <p className={displayClasses.funNumber}>{numberStr}</p>
          {bottom && <p className={displayClasses.funParagraph}>{bottom}</p>}
        </div>
        <div className={displayClasses.border} />
      </>
    );
  }

  return (
    <div {...rootProps}>
      <p className={displayClasses.time}>自 {start.toLocaleString()} 起</p>
      <p className={displayClasses.top}>{top}</p>
      <p className={displayClasses.number}>{numberStr}</p>
      <p className={displayClasses.bottom}>{bottom}</p>
    </div>
  );
};

type ResizerProp = {
  children: (
    props: React.ComponentPropsWithoutRef<'div'>
  ) => React.ReactElement;
};

const displayCls = css`
  position: absolute;
  width: ${DISPLAY_SIZE}px;
  height: ${DISPLAY_SIZE}px;
  left: 50%;
  top: 50%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  text-align: center;
  & > p {
    margin: 0;
  }
`;

const Resizer = ({ children }: ResizerProp) => {
  const [scale, setScale] = useState(1);
  const resizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function resize() {
      if (resizerRef.current === null) return;
      const { width, height } = resizerRef.current.getBoundingClientRect();
      const horizontalScale = Math.max(width - MARGIN, 0) / DISPLAY_SIZE;
      const verticalScale = Math.max(height - MARGIN, 0) / DISPLAY_SIZE;

      setScale(Math.min(horizontalScale, verticalScale));
    }
    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{ flex: 1, position: 'relative' }} ref={resizerRef}>
      {children({
        className: displayCls,
        style: {
          transform: `translate(-50%, -50%) scale(${scale})`,
        },
      })}
    </div>
  );
};

const Displays = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  background: #fff;
`;

const BigNum = () => {
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const startParam = searchParams.get('start');
  const panelsParms = searchParams.getAll('panels');
  const startDate = startParam ? new Date(startParam) : new Date();

  const panels = panelsParms.map((param) => {
    if (!isSomeEnum(PanelType)(param)) {
      throw new Error('panels must be one of PanelType.');
    }
    return PanelType[param];
  });

  return (
    <Displays>
      {panels.map((panelType) => (
        <Resizer key={panelType}>
          {(props) => (
            <BigNumDisplay
              rootProps={props}
              panelType={panelType}
              start={startDate}
            />
          )}
        </Resizer>
      ))}
    </Displays>
  );
};

export default BigNum;
