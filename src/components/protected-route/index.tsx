import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { withAuth, Props as AuthServiceProps } from '../../providers/auth';

interface ExternalProps extends RouteProps {}
interface Props extends ExternalProps, AuthServiceProps {
  computedMatch: any;
}

const ProtectedRoute: FC<Props> = ({
  authService,
  computedMatch: {
    params: { organizationId }
  },
  ...props
}) =>
  authService.hasAccessRights(organizationId) ? (
    <Route {...props} />
  ) : (
    <Redirect to='/login' />
  );

export default compose<FC<ExternalProps>>(memo, withAuth)(ProtectedRoute);
