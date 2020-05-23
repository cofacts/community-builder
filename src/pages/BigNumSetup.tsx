import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { PanelType } from './BigNum';

const useStyles = makeStyles((theme) => ({
  setup: {
    margin: `${theme.spacing(2)}px auto`,
  },
  panelsetup: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  },
}));

const BigNumSetup: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new URLSearchParams(
      // FIXME: bug in URLSearchParams type (https://github.com/Microsoft/TypeScript/issues/30584)
      // @ts-ignore
      new FormData(e.target)
    ).toString();

    history.push('/bignum?' + query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card classes={{ root: classes.setup }}>
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
          <FormLabel component="legend" classes={{ root: classes.panelsetup }}>
            Numbers to show
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="panels" value={PanelType.replied} />}
              label="Replied articles"
            />
            <FormControlLabel
              control={<Checkbox name="panels" value={PanelType.useful} />}
              label="Article with useful feedback"
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
