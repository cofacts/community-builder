import React from 'react';

import { useApolloClient } from '@apollo/client';
import {
  ListArticleFilter,
  useLoadApiStatsQuery,
  LoadApiStatsQuery,
  LoadApiStatsDocument,
  LoadApiStatsQueryVariables,
} from '../../types';
import { getThousandSep } from '../../lib/util';

import CircularProgress from '@mui/material/CircularProgress';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

type StatItemProps = {
  name: string;
  value: number;
  baseValue?: number;
};

const StatItem = ({ name, value, baseValue }: StatItemProps) => {
  return (
    <Card sx={{ flex: 1 }}>
      <CardContent
        sx={{
          /* Undo the excessive bottom padding */
          '&:last-child': { pb: 2 },
        }}
      >
        <Typography variant="body1" gutterBottom>
          {name}
        </Typography>
        <Typography
          variant="h5"
          sx={{ display: 'flex', alignItems: 'flex-end' }}
        >
          {getThousandSep(value)}
          {baseValue !== undefined && (
            <small style={{ marginLeft: 'auto' }}>
              {Math.round((100 * value) / baseValue)}%
            </small>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

function getVariables(filter: ListArticleFilter): LoadApiStatsQueryVariables {
  return {
    isRepliedOnly: !!filter.articleReply,
    allArticleFilter: filter,
    allRepliedArticlesFilter: {
      ...filter,
      replyCount: { GTE: 1 },
    },
    articlesHasUsefulRepliesFilter: {
      ...filter,
      hasArticleReplyWithMorePositiveFeedback: true,
    },
  };
}

const APIStatsOfFilter = ({
  filter,
  baselineFilter,
}: {
  filter: ListArticleFilter;
  baselineFilter: ListArticleFilter | undefined;
}) => {
  const { data, loading } = useLoadApiStatsQuery({
    variables: getVariables(filter),
  });

  const client = useApolloClient();
  const baseline = baselineFilter
    ? client.readQuery<LoadApiStatsQuery, LoadApiStatsQueryVariables>({
        query: LoadApiStatsDocument,
        variables: getVariables(baselineFilter),
      })
    : null;

  if (loading) {
    return (
      <Typography align="center" component="div">
        <CircularProgress size={64} />
      </Typography>
    );
  }

  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
      {data?.allArticles && (
        <StatItem
          name="All messages"
          value={data?.allArticles?.totalCount || 0}
          baseValue={baseline?.allArticles?.totalCount}
        />
      )}
      <StatItem
        name="Replied messages"
        value={data?.allRepliedArticles?.totalCount || 0}
        baseValue={baseline?.allRepliedArticles?.totalCount}
      />
      <StatItem
        name="Has useful replies"
        value={data?.articlesHasUsefulReplies?.totalCount || 0}
        baseValue={baseline?.articlesHasUsefulReplies?.totalCount}
      />
    </Stack>
  );
};

export default APIStatsOfFilter;
