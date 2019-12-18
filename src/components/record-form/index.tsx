import React, { memo, Fragment } from 'react';
import { FormikProps, withFormik, FieldArray } from 'formik';

import TextField from '../field-text';
import TextAreaField from '../field-text-area';

import SC from './styled';

import AddIcon from '../../images/icon-add.svg';
import RemoveIcon from '../../images/icon-remove.svg';

import validationSchema from './validation-schema';
import { Record } from '../../types/domain';

interface Props extends FormikProps<Record> {
  record?: Partial<Record>;
}

const RecordForm = ({ values, handleChange }: Props) => (
  <SC.RecordForm>
    <SC.RecordFormSection title='Behandlingsansvar og databehandler'>
      <SC.Fieldset
        title='Daglig behandlingsanvar'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField
          name='dataProcessorContactDetails.name'
          value={values.dataProcessorContactDetails.name}
          labelText='Kontaktpunkt'
          onChange={handleChange}
        />
        <SC.InlineFields>
          <TextField
            name='dataProcessorContactDetails.email'
            value={values.dataProcessorContactDetails.email}
            labelText='E-post'
            onChange={handleChange}
          />
          <TextField
            name='dataProcessorContactDetails.phone'
            value={values.dataProcessorContactDetails.phone}
            labelText='Telefon'
            onChange={handleChange}
          />
        </SC.InlineFields>
      </SC.Fieldset>
      <SC.Fieldset
        title='Databehandlere og databehandleravtaler'
        subtitle='Den korte hjelpeteksten'
      >
        <FieldArray
          name='dataProcessingAgreements'
          render={arrayHelpers => (
            <>
              {values.dataProcessingAgreements.map(
                ({ dataProcessorName, agreementUrl }, index) => (
                  <Fragment key={`dataProcessingAgreements-${index}`}>
                    <TextField
                      name={`dataProcessingAgreements[${index}].dataProcessorName`}
                      value={dataProcessorName}
                      labelText='Navn på databehandler'
                      onChange={handleChange}
                    />
                    <TextField
                      name={`dataProcessingAgreements[${index}].agreementUrl`}
                      value={agreementUrl}
                      labelText='Lenke til databehandleravtale'
                      onChange={handleChange}
                    />
                    {values.dataProcessingAgreements.length > 1 && (
                      <SC.RemoveButton
                        type='button'
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <RemoveIcon />
                        Slett databehandler
                      </SC.RemoveButton>
                    )}
                  </Fragment>
                )
              )}
              <SC.AddButton
                type='button'
                addMargin={values.dataProcessingAgreements.length === 1}
                onClick={() =>
                  arrayHelpers.push({
                    dataProcessorName: '',
                    agreementUrl: ''
                  })
                }
              >
                <AddIcon />
                Legg til ny databehandler
              </SC.AddButton>
            </>
          )}
        />
      </SC.Fieldset>
      <SC.Fieldset
        title='Felles databehandlingsansvar'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField
          name='commonDataControllerContact.companies'
          value={values.commonDataControllerContact.companies}
          labelText='Virksomheter som har felles databehandlingsansvar'
          onChange={handleChange}
        />
        <TextField
          name='commonDataControllerContact.distributionOfResponsibilities'
          value={
            values.commonDataControllerContact.distributionOfResponsibilities
          }
          labelText='Ansvarsfordeling'
          onChange={handleChange}
        />
        <FieldArray
          name='commonDataControllerContact.contactPoints'
          render={arrayHelpers => (
            <>
              {(values.commonDataControllerContact.contactPoints || []).map(
                ({ name, email, phone }, index) => (
                  <Fragment
                    key={`commonDataControllerContact.contactPoints-${index}`}
                  >
                    <TextField
                      name={`commonDataControllerContact.contactPoints[${index}].name`}
                      value={name}
                      labelText='Kontaktpunkt'
                      onChange={handleChange}
                    />
                    <SC.InlineFields>
                      <TextField
                        name={`commonDataControllerContact.contactPoints[${index}].email`}
                        value={email}
                        labelText='E-post'
                        onChange={handleChange}
                      />
                      <TextField
                        name={`commonDataControllerContact.contactPoints[${index}].phone`}
                        value={phone}
                        labelText='Telefon'
                        onChange={handleChange}
                      />
                    </SC.InlineFields>
                    {(values.commonDataControllerContact.contactPoints || [])
                      .length > 1 && (
                      <SC.RemoveButton
                        type='button'
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <RemoveIcon />
                        Slett kontaktpunkt
                      </SC.RemoveButton>
                    )}
                  </Fragment>
                )
              )}
              <SC.AddButton
                type='button'
                addMargin={
                  (values.commonDataControllerContact.contactPoints || [])
                    .length === 1
                }
                onClick={() =>
                  arrayHelpers.push({
                    name: '',
                    email: '',
                    phone: ''
                  })
                }
              >
                <AddIcon />
                Legg til nytt kontaktpunkt
              </SC.AddButton>
            </>
          )}
        />
      </SC.Fieldset>
    </SC.RecordFormSection>
    <SC.RecordFormSection required title='Behandlingsaktiviteter'>
      <SC.Fieldset
        required
        title='Behandlinger gjelder'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        required
        title='Formålet med behandlingsaktivitetene'
        subtitle='Den korte hjelpeteksten'
      >
        <TextAreaField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        required
        title='Kategorier av registrerte'
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
        required
        title='Kategorier av personopplysninger'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        required
        title='Generell beskrivelse av tekniske og organisatoriske sikkerhetstiltak'
        subtitle='Den korte hjelpeteksten'
      >
        <TextAreaField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        required
        title='Planlagte tidsfrister for sletting'
        subtitle='Den korte hjelpeteksten'
      >
        <TextAreaField name='name' />
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
        required
        title='Kategorier av mottakere'
        subtitle='Den korte hjelpeteksten'
      >
        <TextField name='name' />
      </SC.Fieldset>
      <SC.Fieldset
        required
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
    mapPropsToValues: ({
      record: {
        dataProcessorContactDetails: { name = '', email = '', phone = '' } = {},
        dataProcessingAgreements = [],
        commonDataControllerContact: {
          companies = '',
          distributionOfResponsibilities = '',
          contactPoints = []
        } = {}
      } = {}
    }: Props) => ({
      dataProcessorContactDetails: {
        name,
        email,
        phone
      },
      dataProcessingAgreements: [
        ...dataProcessingAgreements,
        { dataProcessorName: '', agreementUrl: '' }
      ],
      commonDataControllerContact: {
        companies,
        distributionOfResponsibilities,
        contactPoints: [...contactPoints, { name: '', email: '', phone: '' }]
      }
    }),
    handleSubmit: () => {},
    validationSchema,
    displayName: 'RecordForm'
  })(RecordForm) as any
);
