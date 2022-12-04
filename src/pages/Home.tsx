import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
  },
});

type FunctionButtonProps = {
  to: LinkProps['to'];
  title: string;
  description: string;
};

const FunctionButton = ({ to, title, description }: FunctionButtonProps) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6}>
      <Link className={classes.link} to={to}>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1">{description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
};

const Home = () => {
  return (
    <Grid container spacing={2}>
      <FunctionButton
        to="/stats"
        title="Statistics"
        description="Real-time statistics from Cofacts API"
      />
      <FunctionButton
        to="/need-to-check/setup"
        title="Message to check"
        description="View list of messages that needs to be checked by editors"
      />
      <FunctionButton
        to="/editorworks"
        title="Thank you editors"
        description="List of recent works from editors"
      />
      <FunctionButton
        to="/bignum/setup"
        title="Big Numbers"
        description="Instant number display to project in meetups"
      />
    </Grid>
  );
};

export default Home;
