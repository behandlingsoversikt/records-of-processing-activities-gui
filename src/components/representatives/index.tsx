import React, { memo } from 'react';

import SC from './styled';

import ExpansionPanel from '../expansion-panel';

import TextField from '../field-text';
import Fieldset from '../fdk-fieldset';
import Anchor from '../anchor';
import { ContactDetailsInterface } from '../../types';

interface Props {
  dataControllerRepresentative: ContactDetailsInterface;
  dataProtectionOfficer: ContactDetailsInterface;
}

const Representatives = ({
  dataControllerRepresentative,
  dataProtectionOfficer
}: Props): JSX.Element => (
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
        <TextField
          labelText='Navn'
          name='name'
          placeholder='Fornavn og etternavn'
        />
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
);

export default memo(Representatives);
