import React, { memo } from 'react';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import SC from './styled';

import ExpansionPanel from '../expansion-panel';

import TextField from '../field-text';
import Fieldset from '../fdk-fieldset';
import Anchor from '../anchor';
import RepresentativeForm from '../representative-form';

import * as actions from './redux/actions';

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

interface Props {
  actions: typeof actions;
}

const Representatives = ({
  actions: { patchRepresentativeRequested }
}: Props): JSX.Element => {
  return (
    <SC.Representatives>
      <ExpansionPanel
        required
        title='Representant for behandlingsansvarlig'
        subtitle={dataControllerRepresentative.name}
      >
        <RepresentativeForm
          title='Representant for behandlingsansvarlig'
          subtitle='Den korte hjelpeteksten'
          representative={dataControllerRepresentative}
          onChange={patchRepresentativeRequested}
        />
        <SC.LegalNoticeEU>
          Virksomheter som er etablert utenfor EU eller EØS, men som har
          geografisk virkeområde innenfor EU eller EØS må utpeke en representant
          innenfor EU eller EØS. Se{' '}
          <Anchor
            external
            href='https://lovdata.no/dokument/NL/lov/2018-06-15-38'
            text='Personopplysingsloven'
          />{' '}
          for mer informasjon.
        </SC.LegalNoticeEU>
        <Fieldset
          title='Representant for behandlingsansvarlig'
          subtitle='Den korte hjelpeteksten'
        >
          <TextField
            labelText='Navn'
            name='dcr-eu-name'
            placeholder='Fornavn og etternavn'
          />
          <TextField
            labelText='Postadresse'
            name='dcr-eu-address'
            placeholder='Postadresse'
          />
          <SC.InlineFields>
            <TextField labelText='E-post' name='dcr-eu-email' />
            <TextField labelText='Telefon' name='dcr-eu-phone' />
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
            name='dpo-name'
            placeholder='Fornavn og etternavn'
          />
          <TextField
            labelText='Postadresse'
            name='dpo-address'
            placeholder='Postadresse'
          />
          <SC.InlineFields>
            <TextField labelText='E-post' name='dpo-email' />
            <TextField labelText='Telefon' name='dpo-phone' />
          </SC.InlineFields>
        </Fieldset>
      </ExpansionPanel>
    </SC.Representatives>
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
)(memo(Representatives));
