import React, { PureComponent, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ListPagePure } from '../../pages/list-page/list-page-pure';

export default class Router extends PureComponent {
  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <Suspense fallback={<></>}>
          <Switch>
            <Route exact path='/' component={ListPagePure} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}
