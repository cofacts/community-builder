import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { makeStyles } from '@material-ui/core/styles';
import FUN_NUMBERS from '../lib/funNumbers';

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
    top: (start: Setup['start']) => `自 ${start.toLocaleString()} 起回覆了`,
    bottom: (start: Setup['start']) => '則訊息',
    query: gql`
      query BigNumOfReplied($startTime: String) {
        ListArticles(filter: { repliedAt: { GTE: $startTime } }) {
          totalCount
        }
      }
    `,
  },
  [PanelType.useful]: {
    top: (start: Setup['start']) => `自 ${start.toLocaleString()} 起有`,
    bottom: (start: Setup['start']) => '則訊息被有用回應覆蓋',
    query: gql`
      query BigNumOfUseful($startTime: String) {
        ListArticles(filter: { repliedAt: { GTE: $startTime } }) {
          totalCount
        }
      }
    `,
  },
} as const;

const useStyles = makeStyles({
  displayContainer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    background: '#fff',
  },
  display: {
    flex: 1,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
  },
});

type BigNumDisplayProps = {
  start: Setup['start'];
  panelType: PanelType;
};

const BigNumDisplay: React.FC<BigNumDisplayProps> = ({ start, panelType }) => {
  const classes = useStyles();
  const { top, bottom, query } = PANELS_SETUP[panelType];

  const { data, loading, error } = useQuery(query, {
    pollInterval: POLLING_INTERVAL,
    variables: { startTime: start.toISOString() },
  });

  if (loading) {
    return <div className={classes.display}>Loading</div>;
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  const number = data.ListArticles?.totalCount as number | null;
  const numberStr = number === null ? '' : number.toString();

  if (number && number in FUN_NUMBERS) {
    const { top, bottom } = FUN_NUMBERS[number];
    return (
      <div className={classes.display}>
        {top && <p>{top}</p>}
        <p>{numberStr}</p>
        {bottom && <p>{bottom}</p>}
      </div>
    );
  }

  return (
    <div className={classes.display}>
      <p>{top(start)}</p>
      <p>{numberStr}</p>
      <p>{bottom(start)}</p>
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
    <div className={classes.displayContainer}>
      {panels.map((panelType) => (
        <BigNumDisplay
          key={panelType}
          panelType={panelType}
          start={startDate}
        />
      ))}
    </div>
  );
};

export default BigNum;
