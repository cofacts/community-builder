import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Home from './pages/Home';
import APIStats from './pages/APIStats';
import NeedToCheckSetup from './pages/NeedToCheckSetup';
import NeedToCheck from './pages/NeedToCheck';
import EditorWorks from './pages/EditorWorks';
import BigNumSetup from './pages/BigNumSetup';
import BigNum from './pages/BigNum';

const useStyles = makeStyles((theme) => ({
  titleLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  gridContainer: {
    marginTop: theme.spacing(2),
  },
}));

const App: React.FC = () => {
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
      <Container classes={{ root: classes.gridContainer }} maxWidth="lg">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/stats">
            <APIStats />
          </Route>
          <Route path="/need-to-check/setup">
            <NeedToCheckSetup />
          </Route>
          <Route path="/need-to-check">
            <NeedToCheck />
          </Route>
          <Route path="/editorworks">
            <EditorWorks />
          </Route>
          <Route path="/bignum/setup">
            <BigNumSetup />
          </Route>
          <Route path="/bignum">
            <BigNum />
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default App;
