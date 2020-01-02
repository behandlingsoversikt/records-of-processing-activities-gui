import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

import Headline from '../headline';
import BreadcrumbsBar from '../breadcrumbs-bar';
import RecordForm from '../record-form';

import SC from './styled';

import * as actions from './redux/actions';

import { Record } from '../../types';

interface RouteParams {
  organizationId: string;
  recordId?: string;
}

interface Props extends RouteComponentProps<RouteParams> {
  record?: Partial<Record>;
  actions: typeof actions;
}

const RecordPage = ({
  record,
  history: { push },
  match: {
    params: { organizationId, recordId }
  },
  actions: { patchRecordRequested }
}: Props): JSX.Element => {
  const defaultTitle: string = 'Protokoll over behandlingsaktiviteter';
  const [recordTitle, setRecordTitle] = useState(defaultTitle);
  const handleTitleChange = (title: string) =>
    setRecordTitle(title || defaultTitle);

  useEffect(() => {
    if (!recordId && record?.id) {
      push(`/${organizationId}/records/${record.id}`);
    }
  }, [record?.id]);

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
