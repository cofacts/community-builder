import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Home from './pages/Home';
import APIStats from './pages/APIStats';
import EditorWorks from './pages/EditorWorks';
import BigNum from './pages/BigNum';

const useStyles = makeStyles({
  titleLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

function App() {
  const classes = useStyles();

  return (
    <>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Link to="/" className={classes.titleLink}>
            <Typography variant="h6">Cofacts Community Builder</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/stats">
            <APIStats />
          </Route>
          <Route path="/editorworks">
            <EditorWorks />
          </Route>
          <Route path="/bignum">
            <BigNum />
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App;
