import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

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

const FunctionButton: React.FC<FunctionButtonProps> = ({
  to,
  title,
  description,
}) => {
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

const Home: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <FunctionButton
        to="/stats"
        title="Statistics"
        description="Real-time statistics from Cofacts API"
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
