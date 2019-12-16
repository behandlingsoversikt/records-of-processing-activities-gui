import React, { memo } from 'react';
import { withFormik } from 'formik';

import TextField from '../field-text';

import SC from './styled';

import validationSchema from './validation-schema';

const RecordForm = () => (
  <SC.RecordForm>
    <SC.RecordFormSection title='Behandlingsansvar og databehandler'>
      <SC.Fieldset
        title='Daglig behandlingsanvar'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField
          name='name'
          labelText='Kontaktpunkt'
          placeholder='F.eks. avdeling, rolle eller person'
        />
        <SC.InlineFields>
          <TextField name='email' labelText='E-post' />
          <TextField name='phone' labelText='Telefon' />
        </SC.InlineFields>
      </SC.Fieldset>
      <SC.Fieldset
        title='Databehandlere og databehandleravtaler'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' labelText='Navn på databehandler' />
        <TextField name='email' labelText='Lenke til databehandleravtale' />
      </SC.Fieldset>
      <SC.Fieldset
        title='Felles databehandlingsansvar'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField
          name='name'
          labelText='Virksomheter som har felles databehandlingsansvar'
        />
        <TextField name='email' labelText='Ansvarsfordeling' />
        <TextField
          name='name'
          labelText='Kontaktpunkt'
          placeholder='Virksomhet, avdeling, rolle eller person'
        />
        <SC.InlineFields>
          <TextField name='email' labelText='E-post' />
          <TextField name='phone' labelText='Telefon' />
        </SC.InlineFields>
      </SC.Fieldset>
    </SC.RecordFormSection>
    <SC.RecordFormSection required title='Behandlingsaktiviteter'>
      <SC.Fieldset
        title='Behandlinger gjelder'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        title='Katergorier av registrerte'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        title='Behandlingsgrunnlag etter artikkel 6'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' labelText='Behandlingens lovlighet' />
      </SC.Fieldset>
      <SC.Fieldset
        title='Behandlingsgrunnlag etter artikkel 9 eller 10'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        title='Funksjonsområde behandlingen faller inn under'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        title='Tilhørende datasett'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
    </SC.RecordFormSection>
    <SC.RecordFormSection required title='Personopplysninger'>
      <SC.Fieldset
        title='Kategorier av personopplysninger'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        title='Generell beskrivelse av tekniske og organisatoriske sikkerhetstiltak'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        title='Planlagte tidsfrister for sletting'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        title='Kan behandlingen innebære høy personvernrisiko?'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        title='Er det gjennomført risikovurdering?'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        title='Kilder til personopplysningene'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        title='Systemer i din virksomhet som behandler personopplysningene'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
    </SC.RecordFormSection>
    <SC.RecordFormSection required title='Overføring av personopplysningene'>
      <SC.Fieldset
        title='Kategorier av mottakere'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        title='Overføres personopplysningene til tredjeland?'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
    </SC.RecordFormSection>
  </SC.RecordForm>
);

export default memo(
  withFormik({
    mapPropsToValues: () => ({}),
    handleSubmit: () => {},
    validationSchema,
    displayName: 'RecordForm'
  })(RecordForm)
);
