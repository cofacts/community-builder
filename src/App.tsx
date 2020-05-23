import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Home from './pages/Home';
import APIStats from './pages/APIStats';
import EditorWorks from './pages/EditorWorks';
import BigNum from './pages/BigNum';

function App() {
  return (
    <>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Typography variant="h6">Cofacts Community Builder</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Switch>
          <Route path="/">
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
