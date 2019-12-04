import React, { PureComponent, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const ListPage = lazy(() => import('../list-page'));

export default class Router extends PureComponent {
  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <Suspense fallback={<></>}>
          <Switch>
            <Route component={ListPage} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}
