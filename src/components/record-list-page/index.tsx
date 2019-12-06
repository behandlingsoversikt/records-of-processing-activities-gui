import React, { memo } from 'react';

import Headline from '../headline';
import FDKButton from '../fdk-button';
import BreadcrumbsBar from '../breadcrumbs-bar';
import RecordListTable from '../record-list-table';
import ExpansionPanel from '../expansion-panel';

import TextField from '../field-text';
import Fieldset from '../fdk-fieldset';

import SC from './styled';

import { ContactDetailsInterface } from '../../types';
import Anchor from '../anchor';

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
    <BreadcrumbsBar />
    <Headline
      title='Protokoll over behandlingsaktiviter'
      subTitle='Brønnøysundsregistrene'
    />
    <SC.Representatives>
      <ExpansionPanel
        required
        title='Representant for behandlingsansvarlig'
        subtitle={dataControllerRepresentative.name}
      >
        <Fieldset
          title='Representant for behandlingsansvarlig'
          subtitle='Den korte hjelpeteksten'
        >
          <TextField labelText='Navn' name='name' />
          <TextField labelText='Postadresse' name='address' />
          <SC.InlineFields>
            <TextField labelText='E-post' name='email' />
            <TextField labelText='Telefon' name='phone' />
          </SC.InlineFields>
        </Fieldset>
        <SC.LegalNoticeEU>
          Virksomheter som er etablert utenfor EU eller EØS, men som har
          geografisk virkeområde innenfor EU eller EØS må utpeke en representant
          innenfor EU eller EØS. Se{' '}
          <Anchor external href='/' text='Personopplysingsloven' /> for mer
          informasjon.
        </SC.LegalNoticeEU>
        <Fieldset
          title='Representant for behandlingsansvarlig'
          subtitle='Den korte hjelpeteksten'
        >
          <TextField
            labelText='Navn'
            name='name'
            placeholder='Fornavn og etternavn'
          />
          <TextField
            labelText='Postadresse'
            name='address'
            placeholder='Postadresse'
          />
          <SC.InlineFields>
            <TextField labelText='E-post' name='email' />
            <TextField labelText='Telefon' name='phone' />
          </SC.InlineFields>
        </Fieldset>
      </ExpansionPanel>
      <ExpansionPanel
        required
        title='Personvernombud'
        subtitle={dataProtectionOfficer.name}
      >
        <Fieldset title='Personvernombud' subtitle='Den korte hjelpeteksten'>
          <TextField
            labelText='Navn'
            name='name'
            placeholder='Fornavn og etternavn'
          />
          <TextField
            labelText='Postadresse'
            name='address'
            placeholder='Postadresse'
          />
          <SC.InlineFields>
            <TextField labelText='E-post' name='email' />
            <TextField labelText='Telefon' name='phone' />
          </SC.InlineFields>
        </Fieldset>
      </ExpansionPanel>
    </SC.Representatives>
    <SC.RecordListActions>
      <FDKButton variant='primary' text='Legg til ny protokoll' />
      <FDKButton text='Generer rapport' />
    </SC.RecordListActions>
    <RecordListTable />
  </SC.RecordListPage>
);

export default memo(RecordListPage);
