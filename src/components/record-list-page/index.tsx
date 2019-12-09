import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Headline from '../headline';
import FDKButton from '../fdk-button';
import BreadcrumbsBar from '../breadcrumbs-bar';
import Representatives from '../representatives';
import RecordListTable from '../record-list-table';

import * as actions from './redux/actions';

import SC from './styled';

import { ContactDetailsInterface, RecordInterface } from '../../types';

const dataControllerRepresentative: ContactDetailsInterface = {
  name: 'Kari Normann',
  address: 'Grev Wedels plass 9, 0153 Oslo',
  phone: '75007501',
  email: 'kari.normann@brreg.no'
};

const dataProtectionOfficer: ContactDetailsInterface = {
  name: 'Hans Hansen',
  address: 'Grev Wedels plass 9, 0153 Oslo',
  phone: '75007501',
  email: 'hans.hansen@brreg.no'
};

interface Props {
  records: RecordInterface[];
  actions: typeof actions;
}

const RecordListPage = ({
  records,
  actions: { fetchAllRecordsRequested }
}: Props): JSX.Element => {
  useEffect(() => {
    fetchAllRecordsRequested();
  }, []);

  return (
    <SC.RecordListPage>
      <BreadcrumbsBar />
      <Headline
        title='Protokoll over behandlingsaktiviteter'
        subTitle='Brønnøysundsregistrene'
      />
      <Representatives
        dataControllerRepresentative={dataControllerRepresentative}
        dataProtectionOfficer={dataProtectionOfficer}
      />
      <SC.RecordListActions>
        <FDKButton variant='primary' text='Legg til ny protokoll' />
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
