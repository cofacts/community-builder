import React from 'react';
import { Route, Routes, Link, Outlet } from 'react-router-dom';

import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Home from './pages/Home';
import APIStats from './pages/APIStats';
import NeedToCheckSetup from './pages/NeedToCheckSetup';
import NeedToCheck from './pages/NeedToCheck';
import EditorWorks from './pages/EditorWorks';
import BigNumSetup from './pages/BigNumSetup';
import BigNum from './pages/BigNum';
import Analytics from './pages/Analytics';
import AnalyticsSetup from './pages/Analytics/AnalyticsSetup';

const TitleLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const App = () => {
  return (
    <>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <TitleLink to="/">
            <Typography variant="h6">Cofacts Community Builder</Typography>
          </TitleLink>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/analytics/setup" element={<AnalyticsSetup />} />
        <Route
          element={
            <Container sx={{ mt: 2 }} maxWidth="lg">
              <Outlet />
            </Container>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<APIStats />} />
          <Route path="/need-to-check/setup" element={<NeedToCheckSetup />} />
          <Route path="/need-to-check" element={<NeedToCheck />} />
          <Route path="/editorworks" element={<EditorWorks />} />
          <Route path="/bignum/setup" element={<BigNumSetup />} />
          <Route path="/bignum" element={<BigNum />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
