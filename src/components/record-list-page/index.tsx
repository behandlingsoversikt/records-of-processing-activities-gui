import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

import Headline from '../headline';
import FDKButton from '../fdk-button';
import BreadcrumbsBar from '../breadcrumbs-bar';
import Representatives from '../representatives';
import RecordListTable from '../record-list-table';

import * as actions from './redux/actions';

import SC from './styled';

import { RecordInterface } from '../../types';

interface Props extends RouteComponentProps {
  records: RecordInterface[];
  actions: typeof actions;
}

const RecordListPage = ({
  records,
  history: { push },
  actions: { fetchAllRecordsRequested }
}: Props): JSX.Element => {
  useEffect(() => {
    fetchAllRecordsRequested();
  }, []);

  const navigateToNewRecordPage = () => push('/record');

  return (
    <SC.RecordListPage>
      <BreadcrumbsBar />
      <Headline
        title='Protokoll over behandlingsaktiviteter'
        subTitle='Brønnøysundsregistrene'
      />
      <Representatives />
      <SC.RecordListActions>
        <FDKButton
          variant='primary'
          text='Legg til ny protokoll'
          onClick={navigateToNewRecordPage}
        />
        <FDKButton text='Generer rapport' />
      </SC.RecordListActions>
      <RecordListTable records={records} />
    </SC.RecordListPage>
  );
};

const mapStateToProps = (state: any) => ({
  records: state.RecordsPageReducer.get('records').toJS()
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(RecordListPage));
