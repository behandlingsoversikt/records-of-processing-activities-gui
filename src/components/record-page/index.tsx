import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Headline from '../headline';
import BreadcrumbsBar from '../breadcrumbs-bar';
import RecordForm from '../record-form';

import SC from './styled';

import * as actions from './redux/actions';

import { Record } from '../../types';

interface Props {
  record?: Partial<Record>;
  actions: typeof actions;
}

const RecordPage = ({
  record,
  actions: { patchRecordRequested }
}: Props): JSX.Element => {
  const defaultTitle: string = 'Protokoll over behandlingsaktiviteter';
  const [recordTitle, setRecordTitle] = useState(defaultTitle);
  const handleTitleChange = (title: string) =>
    setRecordTitle(title || defaultTitle);

  return (
    <SC.RecordPage>
      <BreadcrumbsBar />
      <Headline title={recordTitle} subTitle='Brønnøysundsregistrene' />
      <RecordForm
        record={record}
        onChange={patchRecordRequested}
        onTitleChange={handleTitleChange}
      />
    </SC.RecordPage>
  );
};

const mapStateToProps = (state: any) => {
  return {
    record: state.RecordPageReducer.get('record')
      ? state.RecordPageReducer.get('record').toJS()
      : undefined
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(RecordPage));
