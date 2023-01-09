import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  ListArticleFilter,
  ListAllCategoriesQuery,
  ListAllCategoriesDocument,
} from '../../types';

import FilterText from './FilterText';
import DateTimePicker from '../../components/DateTimePicker';

// https://stackoverflow.com/a/58633651
const localDateFormatter = new Intl.DateTimeFormat('sv', {
  timeStyle: 'medium',
  dateStyle: 'short',
});
function formatDate(dateStr: string) {
  try {
    return localDateFormatter.format(new Date(dateStr)).replace(' ', 'T');
  } catch (e) {
    return '';
  }
}

const FilterEditor = ({
  filter,
  onSubmit,
}: {
  filter: ListArticleFilter;
  onSubmit: (filter: ListArticleFilter) => void;
}) => {
  const [currentFilter, setCurrentFilter] = useState(filter);
  const client = useApolloClient();
  const allCategoryResults = client.readQuery<ListAllCategoriesQuery>({
    query: ListAllCategoriesDocument,
  });

  return (
    <form
      style={{ display: 'flex', flexFlow: 'column', height: '100%' }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(currentFilter);
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Created time</Typography>
            <Typography sx={{ color: 'text.secondary', ml: 2 }}>
              <FilterText filter={{ createdAt: currentFilter.createdAt }} />
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <DateTimePicker
              value={currentFilter.createdAt?.LTE ?? ''}
              onChange={(value) =>
                setCurrentFilter((f) => ({
                  ...f,
                  createdAt: { ...f.createdAt, LTE: value },
                }))
              }
            />{' '}
            ~{' '}
            <DateTimePicker
              value={currentFilter.createdAt?.LTE ?? ''}
              onChange={(value) =>
                setCurrentFilter((f) => ({
                  ...f,
                  createdAt: { ...f.createdAt, LTE: value },
                }))
              }
            />
          </AccordionDetails>
        </Accordion>
      </div>
      <Button variant="contained" type="submit" sx={{ m: 1 }}>
        Submit
      </Button>
    </form>
  );
};

export default FilterEditor;
