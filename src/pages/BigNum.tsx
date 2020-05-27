import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { makeStyles } from '@material-ui/core/styles';
import FUN_NUMBERS from '../lib/funNumbers';

const MARGIN = 80;
const POLLING_INTERVAL = 5000;

export enum PanelType {
  replied = 'replied',
  useful = 'useful',
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
        ListArticles(filter: { repliedAt: { GTE: $startTime } }) {
          totalCount
        }
      }
    `,
  },
  [PanelType.useful]: {
    top: '新增了',
    bottom: '則訊息被有用回應覆蓋',
    query: gql`
      query BigNumOfUseful($startTime: String) {
        ListArticles(filter: { repliedAt: { GTE: $startTime } }) {
          totalCount
        }
      }
    `,
  },
} as const;

const DISPLAY_SIZE = 768;

const useStyles = makeStyles({
  displays: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    background: '#fff',
  },
  resizer: {
    flex: 1,
    position: 'relative', // contains resized display & the border
  },
  display: {
    position: 'absolute',
    width: DISPLAY_SIZE,
    height: DISPLAY_SIZE,
    left: '50%',
    top: '50%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
    '& > p': {
      margin: 0,
    },
  },
  time: {
    fontSize: 36,
    fontWeight: 200,
  },
  top: {
    fontSize: 64,
    fontWeight: 600,
  },
  bottom: {
    fontSize: 44,
    fontWeight: 600,
  },
  number: {
    fontSize: 360,
    lineHeight: 1,
    fontWeight: 400,
  },
  funNumber: {
    fontSize: 360,
    fontWeight: 100,
  },
  funParagraph: {
    fontSize: 84,
    fontWeight: 600,
  },
  border: {
    position: 'absolute',
    border: '8px solid rgba(0,0,0,0.64)',
    top: 24,
    right: 24,
    bottom: 24,
    left: 24,
  },
});

type BigNumDisplayProps = {
  rootProps: JSX.IntrinsicElements['div'];
  start: Setup['start'];
  panelType: PanelType;
};

const BigNumDisplay: React.FC<BigNumDisplayProps> = ({
  rootProps,
  start,
  panelType,
}) => {
  const classes = useStyles();
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

  const number = data.ListArticles?.totalCount as number | null;
  const numberStr = number === null ? '' : number.toString();

  if (number && number in FUN_NUMBERS) {
    const { top, bottom } = FUN_NUMBERS[number];
    return (
      <>
        <div {...rootProps}>
          {top && <p className={classes.funParagraph}>{top}</p>}
          <p className={classes.funNumber}>{numberStr}</p>
          {bottom && <p className={classes.funParagraph}>{bottom}</p>}
        </div>
        <div className={classes.border} />
      </>
    );
  }

  return (
    <div {...rootProps}>
      <p className={classes.time}>自 {start.toLocaleString()} 起</p>
      <p className={classes.top}>{top}</p>
      <p className={classes.number}>{numberStr}</p>
      <p className={classes.bottom}>{bottom}</p>
    </div>
  );
};

type ResizerProp = {
  children: (props: JSX.IntrinsicElements['div']) => JSX.Element;
};

const Resizer: React.FC<ResizerProp> = ({ children }) => {
  const classes = useStyles();
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
    <div className={classes.resizer} ref={resizerRef}>
      {children({
        className: classes.display,
        style: { transform: `translate(-50%, -50%) scale(${scale})` },
      })}
    </div>
  );
};

const BigNum: React.FC = () => {
  const { search } = useLocation();
  const classes = useStyles();

  const searchParams = new URLSearchParams(search);
  const start = searchParams.get('start') as string; // Local time string, not UTC timestamp yet
  const panels = searchParams.getAll('panels') as Setup['panels'];

  const startDate = (start ? new Date(start) : new Date()) as Setup['start'];

  return (
    <div className={classes.displays}>
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
    </div>
  );
};

export default BigNum;
