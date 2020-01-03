import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

import Headline from '../headline';
import BreadcrumbsBar from '../breadcrumbs-bar';
import RecordForm from '../record-form';

import SC from './styled';

import * as actions from './redux/actions';

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
  actions: { patchRecordRequested, getRecordRequested }
}: Props): JSX.Element => {
  const defaultTitle: string = 'Protokoll over behandlingsaktiviteter';
  const [recordTitle, setRecordTitle] = useState(defaultTitle);
  const handleTitleChange = (title: string) =>
    setRecordTitle(title || defaultTitle);

  const id = record?.get('id');

  useEffect(() => {
    if (!recordId && id && recordId === id) {
      replace(`/${organizationId}/records/${id}`);
    }
  }, [id]);

  useEffect(() => {
    if ((!id && recordId) || (recordId && id !== recordId)) {
      getRecordRequested(recordId, organizationId);
    }
  }, []);

  return (
    <SC.RecordPage>
      <BreadcrumbsBar />
      <Headline title={recordTitle} subTitle='Brønnøysundsregistrene' />
      <RecordForm
        organizationId={organizationId}
        record={record}
        onChange={patchRecordRequested}
        onTitleChange={handleTitleChange}
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
