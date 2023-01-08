import React, { useMemo } from 'react';
import { useApolloClient } from '@apollo/client';

import {
  ListArticleFilter,
  ListAllCategoriesQuery,
  ListAllCategoriesDocument,
} from '../../types';

import {
  getTimeRangeString,
  getArticleType,
  rejectsNull,
} from '../../lib/util';

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

export default FilterText;
