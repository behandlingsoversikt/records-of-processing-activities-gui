import React, { lazy, Suspense, memo } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Root from '../root';
import Header from '../header';
import Footer from '../footer';

const RecordListPage = lazy(() => import('../record-list-page'));

const Router = (): JSX.Element => (
  <BrowserRouter>
    <Root>
      <Header />
      <Suspense fallback={<></>}>
        <Switch>
          <Route exact path='/' component={RecordListPage} />
          <Redirect to='/' />
        </Switch>
      </Suspense>
      <Footer />
    </Root>
  </BrowserRouter>
);

export default memo(Router);
