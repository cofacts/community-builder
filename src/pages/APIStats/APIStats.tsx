import React, { useMemo, useState } from 'react';
import { useApolloClient } from '@apollo/client';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import {
  ListArticleFilter,
  useListAllCategoriesQuery,
  ListAllCategoriesQuery,
  ListAllCategoriesDocument,
  ArticleTypeEnum,
} from '../../types';
import {
  getTimeRangeString,
  getArticleType,
  rejectsNull,
} from '../../lib/util';

import APIStatsOfFilter from './APIStatsOfFilter';

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

const FilterEditor = ({
  filter,
  onSubmit,
}: {
  filter: ListArticleFilter;
  onSubmit: (filter: ListArticleFilter) => void;
}) => {
  const [currentFilter, setCurrentFilter] = useState(filter);

  return (
    <form
      style={{ display: 'flex', flexFlow: 'column', height: '100%' }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(currentFilter);
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        Form content here
      </div>
      <Button variant="contained" type="submit" sx={{ m: 1 }}>
        Submit
      </Button>
    </form>
  );
};

const APIStats = () => {
  useListAllCategoriesQuery();
  const [editingFilterIdx, setEditingFilterIdx] = useState<number>();

  const [filters, setFilters] = useState<ListArticleFilter[]>(() => [
    {},
    { categoryIds: ['covid19', 'intl'] },
    {
      createdAt: { GTE: '2022-01-01', LT: 'now' },
      articleTypes: [ArticleTypeEnum.Image, ArticleTypeEnum.Video],
    },
    {
      articleReply: { createdAt: { GTE: '2022-01-01', LT: '2022-01-01||+1M' } },
    },
  ]);

  return (
    <>
      <Stack spacing={4}>
        {filters.map((filter, idx) => (
          <div key={idx}>
            <Stack component="header" spacing={1} direction="row">
              <Typography variant="h5" sx={{ mb: 1, flex: 1 }}>
                <FilterText filter={filter} />
              </Typography>
              <IconButton onClick={() => setEditingFilterIdx(idx)}>
                <EditOutlinedIcon />
              </IconButton>
              {idx !== 0 && (
                <IconButton
                  onClick={() => {
                    setFilters((fs) => [
                      ...fs.slice(0, idx - 1),
                      filter,
                      fs[idx - 1],
                      ...fs.slice(idx + 1),
                    ]);
                  }}
                >
                  <KeyboardArrowUpOutlinedIcon />
                </IconButton>
              )}
              {idx < filters.length - 1 && (
                <IconButton
                  onClick={() => {
                    setFilters((fs) => [
                      ...fs.slice(0, idx),
                      fs[idx + 1],
                      filter,
                      ...fs.slice(idx + 2),
                    ]);
                  }}
                >
                  <KeyboardArrowDownOutlinedIcon />
                </IconButton>
              )}
              <IconButton
                onClick={() => {
                  setFilters((fs) => [
                    ...fs.slice(0, idx + 1),
                    filter,
                    ...fs.slice(idx + 1),
                  ]);
                }}
              >
                <ContentCopyOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setFilters((fs) => fs.filter((_, i) => i !== idx));
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Stack>
            <APIStatsOfFilter filter={filter} />
          </div>
        ))}
      </Stack>
      <Drawer
        anchor="right"
        open={editingFilterIdx !== undefined}
        onClose={() => setEditingFilterIdx(undefined)}
      >
        {editingFilterIdx !== undefined && (
          <FilterEditor
            filter={filters[editingFilterIdx] ?? {}}
            onSubmit={(newFilter) => {
              setFilters((fs) => {
                const filters = [...fs];
                filters[editingFilterIdx] = newFilter;
                return filters;
              });
              setEditingFilterIdx(undefined);
            }}
          />
        )}
      </Drawer>
    </>
  );
};

export default APIStats;
