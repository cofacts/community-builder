import React from 'react';
import { ListArticleFilter, useLoadApiStatsQuery } from '../types';
import { getThousandSep } from '../lib/util';

import CircularProgress from '@mui/material/CircularProgress';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

type StatItemProps = {
  name: string;
  value: string;
};

const StatItem = ({ name, value }: StatItemProps) => {
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

const APIStatsOfFilter = ({ filter }: { filter: ListArticleFilter }) => {
  const { data, loading } = useLoadApiStatsQuery({
    variables: {
      allArticleFilter: filter,
      allRepliedArticlesFilter: {
        ...filter,
        replyCount: { GTE: 1 },
      },
      articlesHasUsefulRepliesFilter: {
        ...filter,
        hasArticleReplyWithMorePositiveFeedback: true,
      },
    },
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

const APIStats = () => {
  const filter = {};

  return <APIStatsOfFilter filter={filter} />;
};

export default APIStats;
