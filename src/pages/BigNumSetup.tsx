import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { PanelType } from './BigNum';

const BigNumSetup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new URLSearchParams(
      // FIXME: bug in URLSearchParams type (https://github.com/Microsoft/TypeScript/issues/30584)
      //
      new FormData(e.currentTarget) as any
    ).toString();

    navigate('/bignum?' + query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{ mx: 'auto', my: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Display settings
          </Typography>
          <TextField
            name="start"
            label="Time to start counting"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
          />
          <FormLabel component="legend" sx={{ mt: 4, mb: 1 }}>
            Numbers to show
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="panels"
                  value={PanelType.feedback}
                  defaultChecked
                />
              }
              label="Feedbacks"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="panels"
                  value={PanelType.comment}
                  defaultChecked
                />
              }
              label="Comments"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="panels"
                  value={PanelType.replied}
                  defaultChecked
                />
              }
              label="Replied articles"
            />
          </FormGroup>
        </CardContent>
        <CardActions>
          <Button color="primary" type="submit">
            Start
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default BigNumSetup;
