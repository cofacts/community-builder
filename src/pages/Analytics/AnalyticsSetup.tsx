import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useUrlParams } from './util';

const AnalyticsSetup = () => {
  const [, go] = useUrlParams();
  const [articleIds, setArticleIds] = useState('');
  const [fromDate, setFromDate] = useState('now-2M');
  const [toDate, setToDate] = useState('now');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    go({
      ids: articleIds.split(',').map((id) => id.trim()),
      from: fromDate,
      to: toDate,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{ mx: 'auto', my: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Analytics Settings
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            name="ids"
            label="Article IDs (comma-separated)"
            value={articleIds}
            onChange={(e) => setArticleIds(e.target.value)}
            helperText="Enter article IDs separated by commas"
          />
          <TextField
            fullWidth
            margin="normal"
            name="from"
            label="From Date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            helperText="Use ISO date or relative format like 'now-2M'"
          />
          <TextField
            fullWidth
            margin="normal"
            name="to"
            label="To Date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            helperText="Use ISO date or relative format like 'now'"
          />
        </CardContent>
        <CardActions>
          <Button color="primary" type="submit" variant="contained">
            View Analytics
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default AnalyticsSetup;
