import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import URLON from 'urlon';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PercentIcon from '@mui/icons-material/Percent';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { ListArticleFilter, useListAllCategoriesQuery } from '../../types';

import APIStatsOfFilter from './APIStatsOfFilter';
import FilterText from './FilterText';
import FilterEditor from './FilterEditor';

const APIStats = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  useListAllCategoriesQuery();

  /** If given, shows the FilterEditor with filters[editingFilterIdx] */
  const [editingFilterIdx, setEditingFilterIdx] = useState<number>();

  /** If given, set filters[editingFilterIdx] to 100% and display % for all other filters */
  const [baselineFilterIdx, setBaselineFilterIdx] = useState<number>();

  const filters: ListArticleFilter[] = useMemo(() => {
    try {
      return URLON.parse(search.slice(1));
    } catch {
      return [{}];
    }
  }, [search]);

  const setFilters = (cb: (v: ListArticleFilter[]) => ListArticleFilter[]) => {
    const newFilters = cb(filters);

    navigate(`/stats?${URLON.stringify(newFilters)}`);
  };

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
                color={baselineFilterIdx === idx ? 'primary' : undefined}
                onClick={() =>
                  setBaselineFilterIdx((v) => (v === idx ? undefined : idx))
                }
              >
                <PercentIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setFilters((fs) => fs.filter((_, i) => i !== idx));
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Stack>
            <APIStatsOfFilter
              filter={filter}
              baselineFilter={
                filters[baselineFilterIdx ?? -1 /* always returns undefined */]
              }
            />
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
      <Fab
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        color="primary"
        aria-label="add"
        onClick={() => setEditingFilterIdx(filters.length)}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default APIStats;
