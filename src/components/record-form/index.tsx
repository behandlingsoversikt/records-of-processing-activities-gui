import React, {
  memo,
  Fragment,
  useEffect,
  useRef,
  useState,
  ChangeEvent
} from 'react';
import { FormikProps, withFormik, FieldArray } from 'formik';

import { localization } from '../../lib/localization';

import withDatasets, { Props as DatasetsProps } from '../with-datasets';

import TextField from '../field-text';
import TextAreaField from '../field-text-area';
import TextTagsField from '../field-text-tags';
import TextTagsSearchField from '../field-text-tags-search';
import Radio from '../radio';
import Checkbox from '../checkbox';
import Select from '../select';

import SC from './styled';

import AddIcon from '../../images/icon-add.svg';
import RemoveIcon from '../../images/icon-remove.svg';
import ExpandAllUpIcon from '../../images/expand-all-up.svg';
import ExpandAllDownIcon from '../../images/expand-all-down.svg';

import validationSchema from './validation-schema';

import { mapRecordToValues } from './utils';

import { Record, Dataset } from '../../types';
import { DatasetStatus } from '../../types/enums';

type FormValues = Omit<Record, 'updatedAt'>;

interface Props extends DatasetsProps, FormikProps<FormValues> {
  organizationId: string;
  record?: any;
  onChange?: (record: Partial<Record>) => void;
  onTitleChange?: (title: string) => void;
  onValidityChange?: (isValid: boolean) => void;
}

const RecordForm = ({
  organizationId,
  record,
  datasets,
  values,
  dirty,
  handleChange,
  onChange,
  onTitleChange,
  onValidityChange,
  datasetsActions: { fetchAllDatasetsRequested },
  isValid,
  setFieldValue
}: Props): JSX.Element | null => {
  const [allExpanded, setAllExpanded] = useState([true, false, false, false]);
  const [datasetSuggestions, setDatasetSuggestions] = useState<Dataset[]>([]);
  const [isWaitingForSuggestions, setIsWaitingForSuggestions] = useState(false);

  const didMount = useRef(false);
  const previousRecord = useRef<any>(null);
  const mounted = useRef(false);

  useEffect(() => {
    fetchAllDatasetsRequested(organizationId);
    mounted.current = true;
  }, []);

  const isMounted = mounted.current;
  const allFieldsExpanded = allExpanded.every(Boolean);

  const toggleAllExpanded = () =>
    setAllExpanded(allExpanded.map(() => !allFieldsExpanded));

  const handleBooleanRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (['true', 'false'].includes(e.target.value)) {
      e.persist();
      setFieldValue(e.target.name, e.target.value === 'true', true);
    }
  };

  useEffect(() => {
    if (
      onChange &&
      didMount.current &&
      ((!record && !previousRecord.current && dirty) ||
        previousRecord.current?.equals(record) === true)
    ) {
      onChange(values);
    }
    didMount.current = true;
    previousRecord.current = record;
  }, [values]);

  useEffect(() => {
    if (isMounted && onValidityChange) {
      onValidityChange(isValid);
    }
  }, [values, isValid]);

  useEffect(() => {
    if (onTitleChange) {
      onTitleChange(
        values?.title?.trim() || 'Protokoll over behandlingsaktiviteter'
      );
    }
  }, [values?.title]);

  return datasets.length > 0 ? (
    <SC.RecordForm>
      <SC.ExpandAllButton as='a' onClick={toggleAllExpanded}>
        <span>
          {allFieldsExpanded ? 'Lukk alle felter' : 'Åpne alle felter'}
        </span>
        {allFieldsExpanded ? <ExpandAllUpIcon /> : <ExpandAllDownIcon />}
      </SC.ExpandAllButton>
      <SC.RecordFormSection
        title='Behandlingsansvar og databehandler'
        isExpanded={allExpanded[0]}
        onClick={() =>
          setAllExpanded(
            allExpanded.map((expanded, index) =>
              index === 0 ? !expanded : expanded
            )
          )
        }
      >
        <SC.Fieldset
          title='Daglig behandlingsanvar'
          subtitle={localization.dataProcessorContactDetailsAbstract}
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
          subtitle={localization.dataProcessingAgreementsAbstract}
          description={localization.dataProcessingAgreementsDescription}
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
          subtitle={localization.commonDataControllerContactAbstract}
          description={localization.commonDataControllerContactDescription}
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
      <SC.RecordFormSection
        required
        title='Behandlingsaktiviteter'
        isExpanded={allExpanded[1]}
        onClick={() =>
          setAllExpanded(
            allExpanded.map((expanded, index) =>
              index === 1 ? !expanded : expanded
            )
          )
        }
      >
        <SC.Fieldset
          required
          title='Behandlinger gjelder'
          subtitle={localization.titleAbstract}
          description={localization.titleDescription}
        >
          <TextField
            name='title'
            value={values.title}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          required
          title='Formålet med behandlingsaktivitetene'
          subtitle={localization.purposeAbstract}
          description={localization.purposeDescription}
        >
          <TextAreaField
            name='purpose'
            value={values.purpose}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          required
          title='Kategorier av registrerte'
          subtitle={localization.dataSubjectCategoriesAbstract}
          description={localization.dataSubjectCategoriesDescription}
        >
          <FieldArray
            name='dataSubjectCategories'
            render={arrayHelpers => (
              <TextTagsField
                name='dataSubjectCategories'
                value={values.dataSubjectCategories}
                onAddTag={(tag: string) => arrayHelpers.push(tag)}
                onRemoveTag={(index: number) => arrayHelpers.remove(index)}
              />
            )}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Behandlingsgrunnlag etter artikkel 6'
          subtitle={localization.articleSixBasisAbstract}
          description={localization.articleSixBasisDescription}
        >
          <FieldArray
            name='articleSixBasis'
            render={arrayHelpers => (
              <>
                {(values.articleSixBasis || []).map(
                  ({ legality, referenceUrl }, index) => (
                    <Fragment key={`articleSixBasis-${index}`}>
                      <Select
                        name={`articleSixBasis[${index}].legality`}
                        value={legality}
                        options={[
                          {
                            label:
                              'Artikkel 6.1.a - Den registrerte har samtykket til behandling av sine personopplysninger for ett eller flere spesifikke formål',
                            value: '6.1.a'
                          },
                          {
                            label:
                              'Artikkel 6.1.b - Behandlingen er nødvendig for å oppfylle en avtale som den registrerte er part i, eller for å gjennomføre tiltak på den registrertes anmodning før en avtaleinngåelse',
                            value: '6.1.b'
                          },
                          {
                            label:
                              'Artikkel 6.1.c - Behandlingen er nødvendig for å oppfylle en rettslig forpliktelse som påhviler den behandlingsansvarlige',
                            value: '6.1.c'
                          },
                          {
                            label:
                              'Artikkel 6.1.d - Behandlingen er nødvendig for å verne den registrertes eller en annen fysisk persons vitale interesser',
                            value: '6.1.d'
                          },
                          {
                            label:
                              'Artikkel 6.1.e - Behandlingen er nødvendig for å utføre en oppgave i allmennhetens interesse eller utøve offentlig myndighet som den behandlingsansvarlige er pålagt',
                            value: '6.1.e'
                          },
                          {
                            label:
                              'Artikkel 6.1.f - Behandlingen er nødvendig for formål knyttet til de berettigede interessene som forfølges av den behandlingsansvarlige eller en tredjepart, med mindre den registrertes interesser eller grunnleggende rettigheter og friheter går foran og krever vern av personopplysninger, særlig dersom den registrerte er et barn',
                            value: '6.1.f'
                          }
                        ]}
                        labelText='Behandlingens lovlighet'
                        noOptionLabel='Velg artikkel fra listen'
                        onChange={handleChange}
                      />
                      {['6.1.a', '6.1.b'].includes(legality) && (
                        <TextField
                          name={`articleSixBasis[${index}].referenceUrl`}
                          value={referenceUrl}
                          labelText='Henvisning til rettslig forpliktelse, berettighet, interesse mv'
                          onChange={handleChange}
                        />
                      )}
                      {(values.articleSixBasis || []).length > 1 && (
                        <SC.RemoveButton
                          type='button'
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <RemoveIcon />
                          Slett behandlingsgrunnlag
                        </SC.RemoveButton>
                      )}
                    </Fragment>
                  )
                )}
                <SC.AddButton
                  type='button'
                  addMargin={(values.articleSixBasis || []).length === 1}
                  onClick={() =>
                    arrayHelpers.push({
                      legality: '',
                      referenceUrl: ''
                    })
                  }
                >
                  <AddIcon />
                  Legg til nytt behandlingsgrunnlag
                </SC.AddButton>
              </>
            )}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Behandlingsgrunnlag etter artikkel 9 eller 10'
          subtitle={localization.otherArticlesAbstract}
        >
          <Checkbox
            name='otherArticles.articleNine.checked'
            checked={!!values.otherArticles?.articleNine?.checked}
            labelText='Artikkel 9 - Behandling av særlige kategorier av personopplysninger'
            onChange={handleChange}
          />
          {values.otherArticles?.articleNine?.checked && (
            <TextField
              name='otherArticles.articleNine.referenceUrl'
              value={values.otherArticles?.articleNine?.referenceUrl ?? ''}
              labelText='Henvisning til annen lovgivning, dersom relevant'
              onChange={handleChange}
            />
          )}
          <Checkbox
            name='otherArticles.articleTen.checked'
            checked={!!values.otherArticles?.articleTen?.checked}
            labelText='Artikkel 10 - Behandling av personopplysninger om straffedommer og lovovertredelser'
            onChange={handleChange}
          />
          {values.otherArticles?.articleTen?.checked && (
            <TextField
              name='otherArticles.articleTen.referenceUrl'
              value={values.otherArticles?.articleTen?.referenceUrl ?? ''}
              labelText='Henvisning til annen lovgivning, dersom relevant'
              onChange={handleChange}
            />
          )}
        </SC.Fieldset>
        <SC.Fieldset
          title='Funksjonsområde behandlingen faller inn under'
          subtitle={localization.businessAreasAbstract}
          description={localization.businessAreasDescription}
        >
          <FieldArray
            name='businessAreas'
            render={arrayHelpers => (
              <TextTagsField
                name='businessAreas'
                value={values.businessAreas}
                onAddTag={(tag: string) => arrayHelpers.push(tag)}
                onRemoveTag={(index: number) => arrayHelpers.remove(index)}
              />
            )}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Tilhørende datasett'
          subtitle={localization.relatedDatasetsAbstract}
          description={localization.relatedDatasetsDescription}
        >
          <FieldArray
            name='relatedDatasets'
            render={arrayHelpers => (
              <TextTagsSearchField
                name='relatedDatasets'
                value={values.relatedDatasets.map(id => {
                  return {
                    label:
                      datasets.find(
                        ({ id: datasetId }: Dataset) => datasetId === id
                      )?.title[localization.getLanguage()] ?? '',
                    value: id
                  };
                })}
                onChange={({
                  target: { value: query }
                }: ChangeEvent<HTMLInputElement>) => {
                  if (query) {
                    setIsWaitingForSuggestions(true);
                    setDatasetSuggestions(
                      datasets
                        .filter(
                          ({ id, registrationStatus, title }) =>
                            [
                              DatasetStatus.APPROVE,
                              DatasetStatus.PUBLISH
                            ].includes(registrationStatus) &&
                            !values.relatedDatasets.includes(id) &&
                            (Object.values(
                              title
                            ) as string[]).some((localTitle: string): boolean =>
                              localTitle
                                .toLowerCase()
                                .includes(query.toLowerCase())
                            )
                        )
                        .slice(0, 5)
                    );
                    setIsWaitingForSuggestions(false);
                  }
                }}
                placeholder={localization.relatedDatasetsPlaceholder}
                isLoadingSuggestions={isWaitingForSuggestions}
                suggestions={datasetSuggestions.map(({ id: value, title }) => ({
                  label: title[localization.getLanguage()],
                  value
                }))}
                onAddTag={(tag: string) => arrayHelpers.push(tag)}
                onRemoveTag={(index: number) => arrayHelpers.remove(index)}
              />
            )}
          />
        </SC.Fieldset>
      </SC.RecordFormSection>
      <SC.RecordFormSection
        required
        title='Personopplysninger'
        isExpanded={allExpanded[2]}
        onClick={() =>
          setAllExpanded(
            allExpanded.map((expanded, index) =>
              index === 2 ? !expanded : expanded
            )
          )
        }
      >
        <SC.Fieldset
          required
          title='Kategorier av personopplysninger'
          subtitle={localization.personalDataCategoriesAbstract}
          description={localization.personalDataCategoriesDescription}
        >
          <FieldArray
            name='personalDataCategories'
            render={arrayHelpers => (
              <TextTagsField
                name='personalDataCategories'
                value={values.personalDataCategories}
                onAddTag={(tag: string) => arrayHelpers.push(tag)}
                onRemoveTag={(index: number) => arrayHelpers.remove(index)}
              />
            )}
          />
        </SC.Fieldset>
        <SC.Fieldset
          required
          title='Generell beskrivelse av tekniske og organisatoriske sikkerhetstiltak'
          subtitle={localization.securityMeasuresAbstract}
        >
          <TextAreaField
            name='securityMeasures'
            value={values.securityMeasures}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          required
          title='Planlagte tidsfrister for sletting'
          subtitle={localization.plannedDeletionAbstract}
        >
          <TextAreaField
            name='plannedDeletion'
            value={values.plannedDeletion}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Kan behandlingen innebære høy personvernrisiko?'
          subtitle={localization.highPrivacyRiskAbstract}
        >
          <Radio
            name='highPrivacyRisk'
            value={values.highPrivacyRisk}
            options={[
              { label: 'Nei', value: false },
              { label: 'Ja', value: true }
            ]}
            onChange={handleBooleanRadioChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Er det gjennomført risikovurdering?'
          subtitle={localization.dataProtectionImpactAssessmentAbstract}
        >
          <Radio
            name='dataProtectionImpactAssessment.conducted'
            value={values.dataProtectionImpactAssessment.conducted}
            options={[
              { label: 'Nei', value: false },
              { label: 'Ja', value: true }
            ]}
            onChange={handleBooleanRadioChange}
          />
          {values.dataProtectionImpactAssessment.conducted && (
            <TextField
              name='dataProtectionImpactAssessment.assessmentReportUrl'
              value={values.dataProtectionImpactAssessment.assessmentReportUrl}
              labelText='Lenke til risikovurdering'
              onChange={handleChange}
            />
          )}
        </SC.Fieldset>
        <SC.Fieldset
          title='Kilder til personopplysningene'
          subtitle={localization.personalDataSubjectsAbstract}
          description={localization.personalDataSubjectsDescription}
        >
          <TextField
            name='personalDataSubjects'
            value={values.personalDataSubjects}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Systemer i din virksomhet som behandler personopplysningene'
          subtitle={localization.privacyProcessingSystemsAbstract}
          description={localization.privacyProcessingSystemsDescription}
        >
          <TextField
            name='privacyProcessingSystems'
            value={values.privacyProcessingSystems}
            onChange={handleChange}
          />
        </SC.Fieldset>
      </SC.RecordFormSection>
      <SC.RecordFormSection
        required
        title='Overføring av personopplysningene'
        isExpanded={allExpanded[3]}
        onClick={() =>
          setAllExpanded(
            allExpanded.map((expanded, index) =>
              index === 3 ? !expanded : expanded
            )
          )
        }
      >
        <SC.Fieldset
          required
          title='Kategorier av mottakere'
          subtitle={localization.recipientCategoriesAbstract}
          description={localization.recipientCategoriesDescription}
        >
          <FieldArray
            name='recipientCategories'
            render={arrayHelpers => (
              <TextTagsField
                name='recipientCategories'
                value={values.recipientCategories}
                onAddTag={(tag: string) => arrayHelpers.push(tag)}
                onRemoveTag={(index: number) => arrayHelpers.remove(index)}
              />
            )}
          />
        </SC.Fieldset>
        <SC.Fieldset
          required
          title='Overføres personopplysningene til tredjeland?'
          subtitle={localization.transferredAbstract}
        >
          <Radio
            name='dataTransfers.transferred'
            value={values.dataTransfers.transferred}
            options={[
              { label: 'Nei', value: false },
              { label: 'Ja', value: true }
            ]}
            onChange={handleBooleanRadioChange}
          />
          {values.dataTransfers.transferred && (
            <TextField
              name='dataTransfers.thirdCountryRecipients'
              value={values.dataTransfers.thirdCountryRecipients}
              labelText='Oppgi hvilke(t) tredjeland personopplysningene overføres til'
              onChange={handleChange}
            />
          )}
        </SC.Fieldset>
        {values.dataTransfers.transferred && (
          <SC.Fieldset
            title='Det gis garanti for at personopplysningene behandles etter norske regler'
            subtitle={localization.guaranteesAbstract}
          >
            <TextField
              name='dataTransfers.guarantees'
              value={values.dataTransfers.guarantees}
              onChange={handleChange}
            />
          </SC.Fieldset>
        )}
      </SC.RecordFormSection>
    </SC.RecordForm>
  ) : null;
};

export default memo(
  withDatasets(
    withFormik<Props, FormValues>({
      mapPropsToValues: ({ record, organizationId }: Props) =>
        mapRecordToValues(record ?? {}, organizationId),
      handleSubmit: () => {},
      validationSchema,
      displayName: 'RecordForm'
    })(RecordForm)
  )
);
