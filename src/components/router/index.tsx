import React, { lazy, Suspense, memo } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import ProtectedRoute from '../protected-route';

const RecordListPage = lazy(() => import('../record-list-page'));
const RecordPage = lazy(() => import('../record-page'));
const RecordReportPage = lazy(() =>
  import('../record-report-page/record-report-page')
);

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
          path='/:organizationId/report'
          component={RecordReportPage}
        />
        <Redirect to='/' />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default memo(Router);
