import React from 'react';
import { useLoadApiStatsQuery } from '../types';
import { getThousandSep } from '../lib/util';

import CircularProgress from '@material-ui/core/CircularProgress';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const POLLING_INTERVAL = 5000;

type StatItemProps = {
  name: string;
  value: string;
};

const StatItem: React.FC<StatItemProps> = ({ name, value }) => {
  return (
    <Grid item xs={12} sm={4}>
      <Card>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            {name}
          </Typography>
          <Typography variant="h5">{value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const APIStats: React.FC = () => {
  const { data, loading } = useLoadApiStatsQuery({
    pollInterval: POLLING_INTERVAL,
  });

  if (loading) {
    return (
      <Typography align="center" component="div">
        <CircularProgress size={64} />
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      <StatItem
        name="All messages"
        value={getThousandSep(data?.allArticles?.totalCount || 0)}
      />
      <StatItem
        name="Replied messages"
        value={getThousandSep(data?.allRepliedArticles?.totalCount || 0)}
      />
      <StatItem
        name="Has useful replies"
        value={getThousandSep(data?.articlesHasUsefulReplies?.totalCount || 0)}
      />
    </Grid>
  );
};

export default APIStats;
