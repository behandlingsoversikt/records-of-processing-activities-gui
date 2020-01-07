import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

import Headline from '../headline';
import BreadcrumbsBar from '../breadcrumbs-bar';
import RecordForm from '../record-form';
import StatusBar from '../status-bar';

import SC from './styled';

import * as actions from './redux/actions';

import { RecordStatus } from '../../types/enums';

interface RouteParams {
  organizationId: string;
  recordId?: string;
}

interface Props extends RouteComponentProps<RouteParams> {
  record?: any;
  actions: typeof actions;
}

const RecordPage = ({
  record,
  history: { replace },
  match: {
    params: { organizationId, recordId }
  },
  actions: {
    getRecordRequested,
    patchRecordRequested,
    deleteRecordRequested,
    resetRecord
  }
}: Props): JSX.Element => {
  const [recordTitle, setRecordTitle] = useState('');
  const [canChangeUrl, setCanChangeUrl] = useState(false);

  const navigateToRecordListPage = () => replace(`/${organizationId}`);
  const id = record?.get('id');

  useEffect(() => {
    resetRecord();
    setCanChangeUrl(true);
    if (recordId) {
      getRecordRequested(recordId, organizationId, navigateToRecordListPage);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!recordId && id && canChangeUrl) {
      replace(`/${organizationId}/records/${id}`);
    }
  }, [record]);

  const handleRecordStatusChange = (status: RecordStatus) =>
    patchRecordRequested({ id, organizationId, status });

  return (
    <SC.RecordPage>
      <BreadcrumbsBar />
      <Headline
        title={recordTitle}
        subTitle='Brønnøysundsregistrene'
        status={record?.get('status') ?? RecordStatus.DRAFT}
      />
      <RecordForm
        organizationId={organizationId}
        record={record}
        onChange={patchRecordRequested}
        onTitleChange={setRecordTitle}
      />
      <StatusBar
        updatedAt={record?.get('updatedAt')}
        status={record?.get('status') ?? RecordStatus.DRAFT}
        onSetStatus={handleRecordStatusChange}
        onRecordRemove={() => {
          deleteRecordRequested(id, organizationId, navigateToRecordListPage);
        }}
      />
    </SC.RecordPage>
  );
};

const mapStateToProps = (state: any) => ({
  record: state.RecordPageReducer.get('record')
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(RecordPage));
