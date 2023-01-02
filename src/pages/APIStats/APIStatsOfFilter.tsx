import React from 'react';

import { ListArticleFilter, useLoadApiStatsQuery } from '../../types';
import { getThousandSep } from '../../lib/util';

import CircularProgress from '@mui/material/CircularProgress';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

type StatItemProps = {
  name: string;
  value: string;
};

const StatItem = ({ name, value }: StatItemProps) => {
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
        <Typography variant="h5">{value}</Typography>
      </CardContent>
    </Card>
  );
};

const APIStatsOfFilter = ({ filter }: { filter: ListArticleFilter }) => {
  const { data, loading } = useLoadApiStatsQuery({
    variables: {
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
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
      {data?.allArticles && (
        <StatItem
          name="All messages"
          value={getThousandSep(data?.allArticles?.totalCount || 0)}
        />
      )}
      <StatItem
        name="Replied messages"
        value={getThousandSep(data?.allRepliedArticles?.totalCount || 0)}
      />
      <StatItem
        name="Has useful replies"
        value={getThousandSep(data?.articlesHasUsefulReplies?.totalCount || 0)}
      />
    </Stack>
  );
};

export default APIStatsOfFilter;
