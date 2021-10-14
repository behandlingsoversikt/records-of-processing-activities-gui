import React, { lazy, Suspense, memo } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import ProtectedRoute from '../protected-route';
import env from '../../env';

const RecordListPage = lazy(
  () => import('../record-list-page/record-list-page')
);
const RecordPage = lazy(() => import('../record-page'));
const RecordReportPage = lazy(
  () => import('../record-report-page/record-report-page')
);
const { FDK_REGISTRATION_BASE_URI } = env;

const Router = (): JSX.Element => (
  <BrowserRouter>
    <Suspense fallback={<></>}>
      <Switch>
        <ProtectedRoute
          exact
          path='/:organizationId'
          component={RecordListPage}
        />
        <ProtectedRoute
          exact
          path='/:organizationId/records/:recordId?'
          component={RecordPage}
        />
        <ProtectedRoute
          exact
          path='/:organizationId/report/:required(required)?'
          component={RecordReportPage}
        />
        <Route
          path='/'
          component={() => {
            window.location.href = FDK_REGISTRATION_BASE_URI;
            return null;
          }}
        />
        <Redirect to='/' />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default memo(Router);
