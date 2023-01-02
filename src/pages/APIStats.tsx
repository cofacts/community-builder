import React, { useMemo } from 'react';
import { useApolloClient } from '@apollo/client';

import {
  ListArticleFilter,
  useLoadApiStatsQuery,
  useListAllCategoriesQuery,
  ListAllCategoriesQuery,
  ListAllCategoriesDocument,
  ArticleTypeEnum,
} from '../types';
import {
  getThousandSep,
  getTimeRangeString,
  getArticleType,
  rejectsNull,
} from '../lib/util';

import CircularProgress from '@mui/material/CircularProgress';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
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

function FilterText({ filter }: { filter: ListArticleFilter }) {
  const client = useApolloClient();
  const allCategoryResults = client.readQuery<ListAllCategoriesQuery>({
    query: ListAllCategoriesDocument,
  });

  const categoryIdToName = useMemo(
    () =>
      (allCategoryResults?.ListCategories?.edges ?? []).reduce<{
        [id: string]: string;
      }>((agg, { node }) => {
        if (node.id && node.title) {
          agg[node.id] = node.title;
        }
        return agg;
      }, {}),
    [allCategoryResults]
  );

  const names: string[] = [];

  if (filter.createdAt) {
    names.push(getTimeRangeString('created time', filter.createdAt));
  }

  if (filter.articleReply?.createdAt) {
    names.push(
      getTimeRangeString('replied time', filter.articleReply.createdAt)
    );
  }

  if (filter.categoryIds) {
    if (Object.keys(categoryIdToName).length === 0) {
      names.push('(Loading)');
    } else {
      names.push(
        filter.categoryIds
          .filter(rejectsNull)
          .map((id) => categoryIdToName[id] ?? id)
          .join(' or ')
      );
    }
  }

  if (filter.articleTypes) {
    names.push(
      filter.articleTypes.filter(rejectsNull).map(getArticleType).join(' & ')
    );
  }

  return <>{names.join(', ') || 'All'}</>;
}

const APIStats = () => {
  const filters: ListArticleFilter[] = [
    {},
    { categoryIds: ['covid19', 'intl'] },
    {
      createdAt: { GTE: '2022-01-01', LT: 'now' },
      articleTypes: [ArticleTypeEnum.Image, ArticleTypeEnum.Video],
    },
  ];
  useListAllCategoriesQuery();

  return (
    <Stack spacing={4}>
      {filters.map((filter, idx) => (
        <div key={idx}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            <FilterText filter={filter} />
          </Typography>
          <APIStatsOfFilter filter={filter} />
        </div>
      ))}
    </Stack>
  );
};

export default APIStats;
