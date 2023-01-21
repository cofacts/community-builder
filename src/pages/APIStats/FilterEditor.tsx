import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import {
  ListArticleFilter,
  ListAllCategoriesQuery,
  ListAllCategoriesDocument,
  ArticleTypeEnum,
} from '../../types';

import FilterText from './FilterText';
import DateTimePicker from '../../components/DateTimePicker';
import { cleanupFilterObj } from '../../lib/util';

const FilterEditor = ({
  filter,
  onSubmit,
}: {
  filter: ListArticleFilter;
  onSubmit: (filter: ListArticleFilter) => void;
}) => {
  const [currentFilter, rawSetCurrentFilter] = useState(filter);
  const client = useApolloClient();
  const allCategoryResults = client.readQuery<ListAllCategoriesQuery>({
    query: ListAllCategoriesDocument,
  });

  const setCurrentFilter = (
    cb: (v: ListArticleFilter) => ListArticleFilter
  ) => {
    rawSetCurrentFilter((f) => cleanupFilterObj(cb(f)));
  };

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
              value={currentFilter.createdAt?.GTE ?? undefined}
              onChange={(value) =>
                setCurrentFilter((f) => ({
                  ...f,
                  createdAt: {
                    ...f.createdAt,
                    GTE: value,
                  },
                }))
              }
            />{' '}
            ~{' '}
            <DateTimePicker
              value={currentFilter.createdAt?.LTE ?? undefined}
              onChange={(value) =>
                setCurrentFilter((f) => ({
                  ...f,
                  createdAt: { ...f.createdAt, LTE: value },
                }))
              }
            />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Type</Typography>
            <Typography sx={{ color: 'text.secondary', ml: 2 }}>
              <FilterText
                filter={{ articleTypes: currentFilter.articleTypes }}
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <FormGroup>
              {[
                ArticleTypeEnum.Text,
                ArticleTypeEnum.Video,
                ArticleTypeEnum.Image,
                ArticleTypeEnum.Audio,
              ].map((value) => (
                <FormControlLabel
                  key={value}
                  control={
                    <Checkbox
                      value={value}
                      checked={currentFilter.articleTypes?.includes(value)}
                      onChange={() => {
                        setCurrentFilter((f) => ({
                          ...f,
                          articleTypes: f.articleTypes?.includes(value)
                            ? f.articleTypes.filter((t) => t !== value)
                            : [...(f.articleTypes ?? []), value],
                        }));
                      }}
                    />
                  }
                  label={value}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Topic</Typography>
            <Typography sx={{ color: 'text.secondary', ml: 2 }}>
              <FilterText filter={{ categoryIds: currentFilter.categoryIds }} />
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <FormGroup>
              {(allCategoryResults?.ListCategories?.edges ?? []).map(
                ({ node: { id, title } }) => (
                  <FormControlLabel
                    key={id}
                    control={
                      <Checkbox
                        value={id}
                        checked={currentFilter.categoryIds?.includes(id)}
                        onChange={() => {
                          setCurrentFilter((f) => ({
                            ...f,
                            categoryIds: f.categoryIds?.includes(id)
                              ? f.categoryIds.filter((i) => i !== id)
                              : [...(f.categoryIds ?? []), id],
                          }));
                        }}
                      />
                    }
                    label={title}
                  />
                )
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Replied time</Typography>
            <Typography sx={{ color: 'text.secondary', ml: 2 }}>
              <FilterText
                filter={{
                  articleReply: {
                    createdAt: currentFilter.articleReply?.createdAt,
                  },
                }}
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <DateTimePicker
              value={currentFilter.articleReply?.createdAt?.GTE ?? ''}
              onChange={(value) =>
                setCurrentFilter((f) => ({
                  ...f,
                  articleReply: {
                    ...f.articleReply,
                    createdAt: {
                      ...f.articleReply?.createdAt,
                      GTE: value,
                    },
                  },
                }))
              }
            />{' '}
            ~{' '}
            <DateTimePicker
              value={currentFilter.articleReply?.createdAt?.LTE ?? ''}
              onChange={(value) =>
                setCurrentFilter((f) => ({
                  ...f,
                  articleReply: {
                    ...f.articleReply,
                    createdAt: {
                      ...f.articleReply?.createdAt,
                      LTE: value,
                    },
                  },
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
