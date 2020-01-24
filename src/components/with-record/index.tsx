import React, { ComponentType, ComponentProps, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import { Record } from '../../types';

export interface Props {
  record: Record | null;
  recordActions: typeof actions;
}

const withRecord = (Component: ComponentType<any>) => {
  const WrappedComponent = (
    props: Props & ComponentProps<typeof Component>
  ) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    record: state.RecordReducer.get('record')?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    recordActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withRecord;
