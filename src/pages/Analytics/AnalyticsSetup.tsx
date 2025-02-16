import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import DateTimePicker from '../../components/DateTimePicker';
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
          <div style={{ marginTop: 16, marginBottom: 8 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              From Date
            </Typography>
            <DateTimePicker
              value={fromDate}
              onChange={(value) => setFromDate(value ?? 'now-2M')}
            />
          </div>
          <div style={{ marginTop: 16, marginBottom: 8 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              To Date
            </Typography>
            <DateTimePicker
              value={toDate}
              onChange={(value) => setToDate(value ?? 'now')}
            />
          </div>
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
