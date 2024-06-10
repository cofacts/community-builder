import React from 'react';
import styled from '@emotion/styled';
import { Link, LinkProps } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

const PlainLink = styled(Link)`
  text-decoration: none;
`;

type FunctionButtonProps = {
  to: LinkProps['to'];
  title: string;
  description: string;
};

const FunctionButton = ({ to, title, description }: FunctionButtonProps) => {
  return (
    <Grid item xs={12} sm={6}>
      <PlainLink to={to}>
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
      </PlainLink>
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
      <FunctionButton
        to="/analytics"
        title="Analytics"
        description="Web and LINE visit of specified messages"
      />
    </Grid>
  );
};

export default Home;
