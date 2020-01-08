import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import { Organization } from '../../types';

export interface Props {
  organization: Organization | null;
  organizationActions: typeof actions;
}

const withOrganization = (WrappedComponent: ComponentType<any>) => {
  const WrappedComponentWithOrganization = (props: Props) => (
    <WrappedComponent {...props} />
  );

  const mapStateToProps = (state: any) => ({
    organization: state.OrganizationReducer.get('organization')?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    organizationActions: bindActionCreators(actions, dispatch)
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(memo(WrappedComponentWithOrganization));
};

export default withOrganization;
