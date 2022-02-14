import React, {
  memo,
  Fragment,
  useEffect,
  useRef,
  useState,
  ChangeEvent
} from 'react';
import { FormikProps, withFormik, FieldArray, FormikErrors } from 'formik';
import { compare, Operation } from 'fast-json-patch';

import { localization } from '../../lib/localization';

import withDatasets, { Props as DatasetsProps } from '../with-datasets';
import withRecord, { Props as RecordProps } from '../with-record';

import TextField from '../field-text';
import TextAreaField from '../field-text-area';
import TextTagsField from '../field-text-tags';
import TextTagsSearchField from '../field-text-tags-search';
import Radio from '../radio';
import Select from '../select';

import SC from './styled';

import AddIcon from '../../images/icon-add.svg';
import RemoveIcon from '../../images/icon-remove.svg';
import ExpandAllUpIcon from '../../images/expand-all-up.svg';
import ExpandAllDownIcon from '../../images/expand-all-down.svg';

import validationSchema from './validation-schema';

import { mapRecordToValues } from './utils';

import {
  Record,
  Dataset,
  Categories,
  CommonDataControllerContact
} from '../../types';
import { DatasetStatus, RecordStatus } from '../../types/enums';
import ArticleNine from '../article-nine';

type FormValues = Omit<Record, 'updatedAt'>;

interface Props extends DatasetsProps, RecordProps, FormikProps<FormValues> {
  isReadOnlyUser: boolean;
  organizationId: string;
  recordStatus: RecordStatus;
  onTitleChange?: (title: string) => void;
  onStatusChange?: (status: RecordStatus) => void;
  onValidityChange?: (isValid: boolean) => void;
}

const checkIfCommonDataControllerCheckedOrFieldValuesFilledFromBefore = ({
  commonDataControllerChecked,
  companies,
  distributionOfResponsibilities,
  contactPoints
}: Partial<CommonDataControllerContact>): boolean => {
  const contactPointHasValue = element => Object.values(element).length > 0;
  if (commonDataControllerChecked) {
    return true;
  }
  return !!(
    commonDataControllerChecked === null &&
    companies !== '' &&
    distributionOfResponsibilities !== '' &&
    contactPoints?.some(contactPointHasValue)
  );
};

const RecordForm = ({
  isReadOnlyUser,
  organizationId,
  record,
  recordStatus,
  datasets,
  onTitleChange,
  onValidityChange,
  datasetsActions: { fetchAllDatasetsRequested },
  recordActions: { patchRecordRequested: patchRecord },
  values,
  errors,
  touched,
  isValid,
  validateForm,
  handleBlur,
  handleChange,
  setValues,
  setFieldValue,
  setFieldTouched
}: Props): JSX.Element | null => {
  const [allExpanded, setAllExpanded] = useState([
    true,
    false,
    false,
    false,
    false,
    false
  ]);
  const [datasetSuggestions, setDatasetSuggestions] = useState<Dataset[]>([]);
  const [isWaitingForSuggestions, setIsWaitingForSuggestions] = useState(false);

  const mounted = useRef(false);
  const recordLoaded = useRef(false);
  const previousRecord = useRef<FormValues>(values);

  useEffect(() => {
    fetchAllDatasetsRequested(organizationId);
    mounted.current = true;
  }, []);

  const isMounted = mounted.current;
  const isRecordLoaded = recordLoaded.current;
  const allFieldsExpanded = allExpanded.every(Boolean);
  const isApproved = record?.status === RecordStatus.APPROVED;

  const toggleAllExpanded = event => {
    if (
      event.type === 'click' ||
      (event.type === 'keypress' &&
        (event.key === ' ' || event.key === 'Enter'))
    ) {
      setAllExpanded(allExpanded.map(() => !allFieldsExpanded));
    }
  };

  const handleBooleanRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (['true', 'false'].includes(e.target.value)) {
      e.persist();
      setFieldValue(e.target.name, e.target.value === 'true', true);
    }
  };

  const handleCommonDataControllerRadioChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (['true', 'false'].includes(e.target.value)) {
      e.persist();
      setFieldValue(
        'commonDataControllerContact.commonDataControllerChecked',
        e.target.value === 'true',
        true
      );
    }
  };

  const handleOtherArticlesArticleNineRadioChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (['true', 'false'].includes(e.target.value)) {
      e.persist();
      setFieldValue(
        'otherArticles.articleNine.checked',
        e.target.value === 'true',
        true
      );
    }
  };

  useEffect(() => {
    if (record) {
      const recordValues = mapRecordToValues(record, organizationId);
      if (!isRecordLoaded) {
        setValues(recordValues, true);
        previousRecord.current = recordValues;
        recordLoaded.current = true;
      } else {
        const previousRecordStatus = record?.status;
        const nextRecordStatus = previousRecord.current.status;
        if (previousRecordStatus !== nextRecordStatus) {
          setValues(recordValues, true);
          previousRecord.current = recordValues;
        }
      }
    }
  }, [record]);

  useEffect(() => {
    if (isMounted) {
      const previousRecordStatus = record?.status;
      const nextRecordStatus = recordStatus;
      if (previousRecordStatus !== nextRecordStatus) {
        const newValues = { ...values, status: nextRecordStatus };
        if (
          previousRecordStatus === RecordStatus.DRAFT &&
          nextRecordStatus === RecordStatus.APPROVED
        ) {
          if (isValid) {
            patchRecord(newValues);
          }
        } else {
          patchRecord(newValues);
        }
      }
    }
  }, [recordStatus]);

  useEffect(() => {
    if (isMounted && onValidityChange) {
      onValidityChange(isValid);
    }
  }, [values, isValid]);

  useEffect(() => {
    const validateAndSave = async () => {
      const diff: Operation[] = compare(previousRecord.current, values);
      const hasErrors = Object.keys(await validateForm(values)).length > 0;
      if (
        diff.length > 0 &&
        !(record?.status === RecordStatus.APPROVED && hasErrors)
      ) {
        patchRecord(values);
      }
    };
    validateAndSave();
  }, [values]);

  useEffect(() => {
    if (onTitleChange) {
      onTitleChange(
        values?.title?.trim() || 'Registrere ny behandlingsaktivitet'
      );
    }
  }, [values?.title]);

  return (
    datasets && (
      <SC.RecordForm>
        <SC.ExpandAllButton
          as='a'
          onClick={toggleAllExpanded}
          onKeyPress={toggleAllExpanded}
          tabIndex={0}
        >
          <span>
            {allFieldsExpanded ? 'Lukk alle felter' : 'Åpne alle felter'}
          </span>
          {allFieldsExpanded ? <ExpandAllUpIcon /> : <ExpandAllDownIcon />}
        </SC.ExpandAllButton>
        <SC.RecordFormSection
          required
          title='Behandlingen gjelder'
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
            required
            isReadOnly={isReadOnlyUser}
            title='Behandlingen gjelder'
            subtitle={localization.titleAbstract}
            description={localization.titleDescription}
          >
            <TextField
              isReadOnly={isReadOnlyUser}
              name='title'
              value={values.title}
              error={isApproved && touched.title && errors.title}
              helperText={isApproved && touched.title && errors.title}
              onChange={handleChange}
            />
          </SC.Fieldset>
        </SC.RecordFormSection>
        <SC.RecordFormSection
          required
          title='Behandlingsansvar og databehandler'
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
            title='Daglig behandlingsansvar'
            subtitle={localization.dataProcessorContactDetailsAbstract}
            isReadOnly={isReadOnlyUser}
          >
            <FieldArray
              name='dataProcessorContactDetails'
              render={arrayHelpers => (
                <>
                  {values.dataProcessorContactDetails.map(
                    ({ name, email, phone }, index) => (
                      <Fragment key={`dataProcessorContactDetails-${index}`}>
                        <TextField
                          isReadOnly={isReadOnlyUser}
                          name={`dataProcessorContactDetails[${index}].name`}
                          value={name}
                          labelText='Navn på behandlingsansvarlig'
                          onChange={handleChange}
                        />
                        <SC.InlineFields>
                          <TextField
                            isReadOnly={isReadOnlyUser}
                            name={`dataProcessorContactDetails[${index}].email`}
                            value={email}
                            labelText='E-post'
                            onChange={handleChange}
                          />
                          <TextField
                            isReadOnly={isReadOnlyUser}
                            name={`dataProcessorContactDetails[${index}].phone`}
                            value={phone}
                            labelText='Telefon'
                            onChange={handleChange}
                          />
                        </SC.InlineFields>
                        {!isReadOnlyUser &&
                          values.dataProcessorContactDetails.length > 1 && (
                            <SC.RemoveButton
                              type='button'
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <RemoveIcon />
                              Slett behandlingsansvarlig
                            </SC.RemoveButton>
                          )}
                      </Fragment>
                    )
                  )}
                  {!isReadOnlyUser && (
                    <SC.AddButton
                      type='button'
                      addMargin={
                        values.dataProcessorContactDetails.length === 1
                      }
                      onClick={() =>
                        arrayHelpers.push({
                          name: '',
                          phone: '',
                          email: ''
                        })
                      }
                    >
                      <AddIcon />
                      Legg til ny behandlingsansvarlig
                    </SC.AddButton>
                  )}
                </>
              )}
            />
          </SC.Fieldset>
          <SC.Fieldset
            isReadOnly={isReadOnlyUser}
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
                          isReadOnly={isReadOnlyUser}
                          name={`dataProcessingAgreements[${index}].dataProcessorName`}
                          value={dataProcessorName}
                          labelText='Navn på databehandler'
                          onChange={handleChange}
                        />
                        <TextField
                          isReadOnly={isReadOnlyUser}
                          name={`dataProcessingAgreements[${index}].agreementUrl`}
                          value={agreementUrl}
                          labelText='Lenke til databehandleravtale'
                          onChange={handleChange}
                        />
                        {!isReadOnlyUser &&
                          values.dataProcessingAgreements.length > 1 && (
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
                  {!isReadOnlyUser && (
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
                  )}
                </>
              )}
            />
          </SC.Fieldset>
          <SC.Fieldset
            required
            isReadOnly={isReadOnlyUser}
            title='Felles behandlingsansvar'
            subtitle={localization.commonDataControllerContactAbstract}
            description={localization.commonDataControllerContactDescription}
          >
            <Radio
              labelText='Foreligger det felles behandlingsansvar?'
              isReadOnly={isReadOnlyUser}
              name='commonDataControllerContact.commonDataControllerChecked'
              value={
                values.commonDataControllerContact.commonDataControllerChecked
              }
              options={[
                { label: 'Nei', value: false },
                { label: 'Ja', value: true }
              ]}
              onChange={e => handleCommonDataControllerRadioChange(e)}
            />
            {checkIfCommonDataControllerCheckedOrFieldValuesFilledFromBefore(
              values.commonDataControllerContact
            ) && (
              <>
                <TextField
                  required
                  isReadOnly={isReadOnlyUser}
                  name='commonDataControllerContact.companies'
                  value={values.commonDataControllerContact.companies}
                  labelText='Virksomheter som har felles behandlingsansvar'
                  onChange={handleChange}
                />
                <TextField
                  isReadOnly={isReadOnlyUser}
                  name='commonDataControllerContact.distributionOfResponsibilities'
                  value={
                    values.commonDataControllerContact
                      .distributionOfResponsibilities
                  }
                  labelText='Ansvarsfordeling'
                  onChange={handleChange}
                />
                <FieldArray
                  name='commonDataControllerContact.contactPoints'
                  render={arrayHelpers => (
                    <>
                      {(
                        values.commonDataControllerContact.contactPoints || []
                      ).map(({ name, email, phone }, index) => (
                        <Fragment
                          key={`commonDataControllerContact.contactPoints-${index}`}
                        >
                          <TextField
                            required
                            isReadOnly={isReadOnlyUser}
                            name={`commonDataControllerContact.contactPoints[${index}].name`}
                            value={name}
                            labelText='Kontaktpunkt'
                            onChange={handleChange}
                          />
                          <SC.InlineFields>
                            <TextField
                              isReadOnly={isReadOnlyUser}
                              name={`commonDataControllerContact.contactPoints[${index}].email`}
                              value={email}
                              labelText='E-post'
                              onChange={handleChange}
                            />
                            <TextField
                              isReadOnly={isReadOnlyUser}
                              name={`commonDataControllerContact.contactPoints[${index}].phone`}
                              value={phone}
                              labelText='Telefon'
                              onChange={handleChange}
                            />
                          </SC.InlineFields>
                          {!isReadOnlyUser &&
                            (
                              values.commonDataControllerContact
                                .contactPoints || []
                            ).length > 1 && (
                              <SC.RemoveButton
                                type='button'
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <RemoveIcon />
                                Slett kontaktpunkt
                              </SC.RemoveButton>
                            )}
                        </Fragment>
                      ))}
                      {!isReadOnlyUser && (
                        <SC.AddButton
                          type='button'
                          addMargin={
                            (
                              values.commonDataControllerContact
                                .contactPoints || []
                            ).length === 1
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
                      )}
                    </>
                  )}
                />
              </>
            )}
          </SC.Fieldset>
        </SC.RecordFormSection>
        <SC.RecordFormSection
          required
          title='Behandlingsaktiviteter'
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
            isReadOnly={isReadOnlyUser}
            title='Formål med behandlingen'
            subtitle={localization.purposeAbstract}
            description={localization.purposeDescription}
          >
            <TextAreaField
              isReadOnly={isReadOnlyUser}
              name='purpose'
              value={values.purpose}
              error={isApproved && touched.purpose && errors.purpose}
              helperText={isApproved && touched.purpose && errors.purpose}
              onChange={handleChange}
            />
          </SC.Fieldset>
          <SC.Fieldset
            isReadOnly={isReadOnlyUser}
            title='Behandlingsgrunnlag artikkel 6'
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
                          isReadOnly={isReadOnlyUser}
                          name={`articleSixBasis[${index}].legality`}
                          value={legality}
                          options={[
                            { label: '', value: '' },
                            {
                              label:
                                'Artikkel 6(1)(a) - Den registrerte har samtykket til behandling av sine personopplysninger for ett eller flere spesifikke formål',
                              value: '6.1.a'
                            },
                            {
                              label:
                                'Artikkel 6(1)(b) - Behandlingen er nødvendig for å oppfylle en avtale som den registrerte er part i, eller for å gjennomføre tiltak på den registrertes anmodning før en avtaleinngåelse',
                              value: '6.1.b'
                            },
                            {
                              label:
                                'Artikkel 6(1)(c) - Behandlingen er nødvendig for å oppfylle en rettslig forpliktelse som påhviler den behandlingsansvarlige',
                              value: '6.1.c'
                            },
                            {
                              label:
                                'Artikkel 6(1)(d) - Behandlingen er nødvendig for å verne den registrertes eller en annen fysisk persons vitale interesser',
                              value: '6.1.d'
                            },
                            {
                              label:
                                'Artikkel 6(1)(e) - Behandlingen er nødvendig for å utføre en oppgave i allmennhetens interesse eller utøve offentlig myndighet som den behandlingsansvarlige er pålagt',
                              value: '6.1.e'
                            },
                            {
                              label:
                                'Artikkel 6(1)(f) - Behandlingen er nødvendig for formål knyttet til de berettigede interessene som forfølges av den behandlingsansvarlige eller en tredjepart, med mindre den registrertes interesser eller grunnleggende rettigheter og friheter går foran og krever vern av personopplysninger, særlig dersom den registrerte er et barn',
                              value: '6.1.f'
                            }
                          ]}
                          labelText='Behandlingens lovlighet'
                          noOptionLabel='Velg artikkel fra listen'
                          onChange={handleChange}
                        />
                        {['6.1.c', '6.1.e', '6.1.f'].includes(legality) && (
                          <TextField
                            isReadOnly={isReadOnlyUser}
                            name={`articleSixBasis[${index}].referenceUrl`}
                            value={referenceUrl}
                            labelText='Henvisning til annen lovgivning'
                            onChange={handleChange}
                          />
                        )}
                        {!isReadOnlyUser &&
                          (values.articleSixBasis || []).length > 1 && (
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
                  {!isReadOnlyUser && (
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
                  )}
                </>
              )}
            />
          </SC.Fieldset>
          <SC.Fieldset
            isReadOnly={isReadOnlyUser}
            title='Behandlingsgrunnlag artikkel 9 og 10'
            subtitle={localization.otherArticlesAbstract}
            description={localization.otherArticlesDescription}
          >
            <Radio
              labelText='Artikkel 9 - Behandling av særlige kategorier av personopplysninger'
              isReadOnly={isReadOnlyUser}
              name='otherArticles.articleNine.checked'
              value={values.otherArticles?.articleNine?.checked}
              options={[
                { label: 'Nei', value: false },
                { label: 'Ja', value: true }
              ]}
              onChange={e => handleOtherArticlesArticleNineRadioChange(e)}
            />
            {values.otherArticles?.articleNine?.checked && (
              <>
                {values.otherArticles?.articleNine?.referenceUrl && (
                  <TextField
                    isReadOnly={isReadOnlyUser}
                    name='otherArticles.articleNine.referenceUrl'
                    value={
                      values.otherArticles?.articleNine?.referenceUrl ?? ''
                    }
                    labelText='Henvisning til annen lovgivning (utdatert felt)'
                    onChange={handleChange}
                  />
                )}
                <FieldArray
                  name='otherArticles.articleNine.legalities'
                  render={() => (
                    <div>
                      {(values.otherArticles.articleNine?.legalities || []).map(
                        (legality, index) => (
                          <ArticleNine
                            key={`otherArticles.articleNine.legalities-${index}`}
                            index={index}
                            isReadOnlyUser={isReadOnlyUser}
                            fieldValues={legality}
                            checkBoxName={`otherArticles.articleNine.legalities[${index}].checked`}
                            handleChange={handleChange}
                          />
                        )
                      )}
                    </div>
                  )}
                />
              </>
            )}
            <Radio
              labelText='Artikkel 10 - Behandling av personopplysninger om straffedommer og lovovertredelser'
              isReadOnly={isReadOnlyUser}
              name='otherArticles.articleTen.checked'
              value={values.otherArticles?.articleTen?.checked}
              options={[
                { label: 'Nei', value: false },
                { label: 'Ja', value: true }
              ]}
              onChange={e => handleBooleanRadioChange(e)}
            />
            {values.otherArticles?.articleTen?.checked && (
              <TextField
                isReadOnly={isReadOnlyUser}
                name='otherArticles.articleTen.referenceUrl'
                value={values.otherArticles?.articleTen?.referenceUrl ?? ''}
                labelText='Henvisning til annen lovgivning'
                onChange={handleChange}
              />
            )}
          </SC.Fieldset>
          <SC.Fieldset
            isReadOnly={isReadOnlyUser}
            title='Funksjons-eller virksomhetsområde'
            subtitle={localization.businessAreasAbstract}
            description={localization.businessAreasDescription}
          >
            <FieldArray
              name='businessAreas'
              render={arrayHelpers => (
                <TextTagsField
                  isReadOnly={isReadOnlyUser}
                  name='businessAreas'
                  value={values.businessAreas}
                  onAddTag={(tag: string) => arrayHelpers.push(tag)}
                  onRemoveTag={(index: number) => arrayHelpers.remove(index)}
                />
              )}
            />
          </SC.Fieldset>
          <SC.Fieldset
            isReadOnly={isReadOnlyUser}
            title='Tilhørende datasett'
            subtitle={localization.relatedDatasetsAbstract}
            description={localization.relatedDatasetsDescription}
          >
            <FieldArray
              name='relatedDatasets'
              render={arrayHelpers => (
                <TextTagsSearchField
                  isReadOnly={isReadOnlyUser}
                  name='relatedDatasets'
                  value={values.relatedDatasets.map(id => ({
                    label:
                      datasets.find(
                        ({ id: datasetId }: Dataset) => datasetId === id
                      )?.title[localization.getLanguage()] ?? '',
                    value: id
                  }))}
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
                              (Object.values(title) as string[]).some(
                                (localTitle: string): boolean =>
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
                  suggestions={datasetSuggestions.map(
                    ({ id: value, title }) => ({
                      label: title[localization.getLanguage()],
                      value
                    })
                  )}
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
            isReadOnly={isReadOnlyUser}
            title='Kategorier av registrerte og kategorier av personopplysninger'
            subtitle={localization.personalDataCategoriesAbstract}
            description={localization.personalDataCategoriesDescription}
          >
            <FieldArray
              name='categories'
              render={categoriesArray => (
                <>
                  {values.categories.map(
                    (
                      { personalDataCategories, dataSubjectCategories },
                      index
                    ) => (
                      <Fragment key={`categories-${index}`}>
                        <TextField
                          isReadOnly={isReadOnlyUser}
                          name={`categories[${index}].dataSubjectCategories`}
                          placeholder='Oppgi èn kategori'
                          labelText='Kategorier av registrerte'
                          value={dataSubjectCategories}
                          error={
                            isApproved &&
                            touched.categories?.[index]
                              ?.dataSubjectCategories &&
                            (
                              errors.categories?.[
                                index
                              ] as FormikErrors<Categories>
                            )?.dataSubjectCategories
                          }
                          helperText={
                            isApproved &&
                            touched.categories?.[index]
                              ?.dataSubjectCategories &&
                            (
                              errors.categories?.[
                                index
                              ] as FormikErrors<Categories>
                            )?.dataSubjectCategories
                          }
                          onChange={handleChange}
                        />
                        <FieldArray
                          name={`categories[${index}].personalDataCategories`}
                          render={personalDataCategoriesArray => (
                            <TextTagsField
                              isReadOnly={isReadOnlyUser}
                              placeholder='Oppgi èn eller flere kategorier'
                              labelText='Kategorier av personopplysninger tilknyttet den registrerte'
                              name={`categories[${index}].personalDataCategories`}
                              value={personalDataCategories}
                              error={
                                isApproved &&
                                touched.categories?.[index]
                                  ?.personalDataCategories &&
                                (
                                  errors.categories?.[
                                    index
                                  ] as FormikErrors<Categories>
                                )?.personalDataCategories
                              }
                              helperText={
                                isApproved &&
                                touched.categories?.[index]
                                  ?.personalDataCategories &&
                                (
                                  errors.categories?.[
                                    index
                                  ] as FormikErrors<Categories>
                                )?.personalDataCategories
                              }
                              onAddTag={(tag: string) => {
                                personalDataCategoriesArray.push(tag);
                                setFieldTouched(
                                  `categories[${index}].personalDataCategories`,
                                  true,
                                  true
                                );
                              }}
                              onRemoveTag={(i: number) => {
                                personalDataCategoriesArray.remove(i);
                                setFieldTouched(
                                  `categories[${index}].personalDataCategories`,
                                  true,
                                  true
                                );
                              }}
                              onBlur={handleBlur}
                            />
                          )}
                        />
                        {!isReadOnlyUser && values.categories.length > 1 && (
                          <SC.RemoveButton
                            type='button'
                            onClick={() => categoriesArray.remove(index)}
                          >
                            <RemoveIcon />
                            Slett kategorier
                          </SC.RemoveButton>
                        )}
                      </Fragment>
                    )
                  )}
                  {!isReadOnlyUser && (
                    <SC.AddButton
                      type='button'
                      addMargin={values.categories.length === 1}
                      onClick={() =>
                        categoriesArray.push({
                          personalDataCategories: [],
                          dataSubjectCategories: ''
                        })
                      }
                    >
                      <AddIcon />
                      Legg til ny kategori av registrerte og kategorier av
                      personopplysninger
                    </SC.AddButton>
                  )}
                </>
              )}
            />
          </SC.Fieldset>
          <SC.Fieldset
            required
            isReadOnly={isReadOnlyUser}
            title='Planlagte tidsfrister for sletting'
            subtitle={localization.plannedDeletionAbstract}
          >
            <TextAreaField
              isReadOnly={isReadOnlyUser}
              name='plannedDeletion'
              value={values.plannedDeletion}
              error={
                isApproved && touched.plannedDeletion && errors.plannedDeletion
              }
              helperText={
                isApproved && touched.plannedDeletion && errors.plannedDeletion
              }
              onChange={handleChange}
            />
          </SC.Fieldset>
          <SC.Fieldset
            isReadOnly={isReadOnlyUser}
            title='Kilder til personopplysningene'
            subtitle={localization.personalDataSubjectsAbstract}
            description={localization.personalDataSubjectsDescription}
          >
            <TextAreaField
              isReadOnly={isReadOnlyUser}
              name='personalDataSubjects'
              value={values.personalDataSubjects}
              onChange={handleChange}
            />
          </SC.Fieldset>
          <SC.Fieldset
            isReadOnly={isReadOnlyUser}
            title='System i virksomheten som behandler personopplysningene'
            subtitle={localization.privacyProcessingSystemsAbstract}
            description={localization.privacyProcessingSystemsDescription}
          >
            <TextAreaField
              isReadOnly={isReadOnlyUser}
              name='privacyProcessingSystems'
              value={values.privacyProcessingSystems}
              onChange={handleChange}
            />
          </SC.Fieldset>
        </SC.RecordFormSection>
        <SC.RecordFormSection
          required
          title='Overføring av personopplysningene'
          isExpanded={allExpanded[4]}
          onClick={() =>
            setAllExpanded(
              allExpanded.map((expanded, index) =>
                index === 4 ? !expanded : expanded
              )
            )
          }
        >
          <SC.Fieldset
            required
            isReadOnly={isReadOnlyUser}
            title='Mottakere eller kategori av mottagere'
            subtitle={localization.recipientCategoriesAbstract}
            description={localization.recipientCategoriesDescription}
          >
            <FieldArray
              name='recipientCategories'
              render={arrayHelpers => (
                <TextTagsField
                  isReadOnly={isReadOnlyUser}
                  name='recipientCategories'
                  value={values.recipientCategories}
                  error={
                    isApproved &&
                    touched.recipientCategories &&
                    errors.recipientCategories
                  }
                  helperText={
                    isApproved &&
                    touched.recipientCategories &&
                    errors.recipientCategories
                  }
                  onAddTag={(tag: string) => {
                    arrayHelpers.push(tag);
                    setFieldTouched('recipientCategories', true, true);
                  }}
                  onRemoveTag={(index: number) => {
                    arrayHelpers.remove(index);
                    setFieldTouched('recipientCategories', true, true);
                  }}
                />
              )}
            />
          </SC.Fieldset>
          <SC.Fieldset
            required
            isReadOnly={isReadOnlyUser}
            title='Er mottakerne tredjeland eller internasjonale organisasjoner?'
            subtitle={localization.transferredAbstract}
          >
            <Radio
              isReadOnly={isReadOnlyUser}
              name='dataTransfers.transferred'
              value={values.dataTransfers.transferred}
              options={[
                { label: 'Nei', value: false },
                { label: 'Ja', value: true }
              ]}
              error={
                isApproved &&
                touched.dataTransfers?.transferred &&
                errors.dataTransfers?.transferred
              }
              helperText={
                isApproved &&
                touched?.dataTransfers?.transferred &&
                errors?.dataTransfers?.transferred
              }
              onChange={handleBooleanRadioChange}
            />
            {values.dataTransfers.transferred && (
              <SC.Fieldset
                required
                isReadOnly={isReadOnlyUser}
                boxed={false}
                title='Tredjeland eller internasjonale organisasjoner'
                subtitle={localization.thirdCountryAbstract}
              >
                <TextField
                  isReadOnly={isReadOnlyUser}
                  name='dataTransfers.thirdCountryRecipients'
                  value={values.dataTransfers.thirdCountryRecipients}
                  error={
                    isApproved &&
                    touched.dataTransfers?.thirdCountryRecipients &&
                    errors.dataTransfers?.thirdCountryRecipients
                  }
                  helperText={
                    isApproved &&
                    touched?.dataTransfers?.thirdCountryRecipients &&
                    errors?.dataTransfers?.thirdCountryRecipients
                  }
                  onChange={handleChange}
                />
              </SC.Fieldset>
            )}
          </SC.Fieldset>
          {values.dataTransfers.transferred && (
            <SC.Fieldset
              required
              isReadOnly={isReadOnlyUser}
              boxed={false}
              title='Nødvendige garantier ved overføring'
              subtitle={localization.guaranteesAbstract}
            >
              <TextAreaField
                isReadOnly={isReadOnlyUser}
                name='dataTransfers.guarantees'
                value={values.dataTransfers.guarantees}
                error={
                  isApproved &&
                  touched.dataTransfers?.guarantees &&
                  errors.dataTransfers?.guarantees
                }
                helperText={
                  isApproved &&
                  touched?.dataTransfers?.guarantees &&
                  errors?.dataTransfers?.guarantees
                }
                onChange={handleChange}
              />
            </SC.Fieldset>
          )}
        </SC.RecordFormSection>
        <SC.RecordFormSection
          required
          title='Sikkerhetstiltak og DPIA'
          isExpanded={allExpanded[5]}
          onClick={() =>
            setAllExpanded(
              allExpanded.map((expanded, index) =>
                index === 5 ? !expanded : expanded
              )
            )
          }
        >
          <SC.Fieldset
            required
            isReadOnly={isReadOnlyUser}
            title='Generell beskrivelse av tekniske og organisatoriske sikkerhetstiltak'
            subtitle={localization.securityMeasuresAbstract}
          >
            <TextField
              required
              isReadOnly={isReadOnlyUser}
              name='securityMeasures'
              value={values.securityMeasures}
              error={
                isApproved &&
                touched.securityMeasures &&
                errors.securityMeasures
              }
              helperText={
                isApproved &&
                touched.securityMeasures &&
                errors.securityMeasures
              }
              onChange={handleChange}
            />
          </SC.Fieldset>
          <SC.Fieldset
            isReadOnly={isReadOnlyUser}
            title='Er det gjennomført vurdering av personvernkonsekvenser (DPIA)?'
            subtitle={localization.dataProtectionImpactAssessment}
          >
            <Radio
              isReadOnly={isReadOnlyUser}
              name='dataProtectionImpactAssessment.conducted'
              value={values.dataProtectionImpactAssessment.conducted}
              options={[
                { label: 'Nei', value: false },
                { label: 'Ja', value: true }
              ]}
              error={
                isApproved &&
                touched.dataProtectionImpactAssessment?.conducted &&
                errors.dataProtectionImpactAssessment?.conducted
              }
              helperText={
                isApproved &&
                touched?.dataProtectionImpactAssessment?.conducted &&
                errors?.dataProtectionImpactAssessment?.conducted
              }
              onChange={handleBooleanRadioChange}
            />
            {values.dataProtectionImpactAssessment.conducted && (
              <TextField
                isReadOnly={isReadOnlyUser}
                name='dataProtectionImpactAssessment.assessmentReportUrl'
                value={
                  values.dataProtectionImpactAssessment.assessmentReportUrl
                }
                labelText='Sak-/arkivreferanse eller lenke til vurdering av personvernkonsekvenser (DPIA)'
                error={
                  isApproved &&
                  touched.dataProtectionImpactAssessment?.assessmentReportUrl &&
                  errors.dataProtectionImpactAssessment?.assessmentReportUrl
                }
                helperText={
                  isApproved &&
                  touched?.dataProtectionImpactAssessment
                    ?.assessmentReportUrl &&
                  errors?.dataProtectionImpactAssessment?.assessmentReportUrl
                }
                onChange={handleChange}
              />
            )}
          </SC.Fieldset>
        </SC.RecordFormSection>
      </SC.RecordForm>
    )
  );
};

export default memo(
  withDatasets(
    withRecord(
      withFormik<Props, FormValues>({
        mapPropsToValues: ({ record, organizationId }: Props) =>
          mapRecordToValues(record ?? {}, organizationId),
        handleSubmit: () => {},
        validationSchema,
        displayName: 'RecordForm'
      })(RecordForm)
    )
  )
);
