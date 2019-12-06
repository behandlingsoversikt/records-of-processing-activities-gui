import React, { memo } from 'react';

import Headline from '../headline';
import FDKButton from '../fdk-button';
import RecordListTable from '../record-list-table';
import RepresentativeDropdown from '../representative-dropdown';

import SC from './styled';

import { ContactDetailsInterface } from '../../types';

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

const RecordListPage = (): JSX.Element => (
  <SC.RecordListPage>
    <Headline
      title='Protokoll over behandlingsaktiviter'
      subTitle='Brønnøysundsregistrene'
    />
    <SC.Representatives>
      <RepresentativeDropdown
        required
        title='Representant for behandlingsansvarlig'
        contactPerson={dataControllerRepresentative}
      />
      <RepresentativeDropdown
        required
        title='Personvernombud'
        contactPerson={dataProtectionOfficer}
      />
    </SC.Representatives>
    <SC.RecordListActions>
      <FDKButton variant='primary' text='Legg til ny protokoll' />
      <FDKButton text='Generer rapport' />
    </SC.RecordListActions>
    <RecordListTable />
  </SC.RecordListPage>
);

export default memo(RecordListPage);
