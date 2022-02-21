import React, { FC, memo, Fragment, useEffect } from 'react';
import { compose } from 'redux';

import CreateIconOutlined from '@material-ui/icons/CreateOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import withDatasets, { Props as DatasetsProps } from '../../with-datasets';

import SC from './styled';
import { localization } from '../../../lib/localization';
import { Dataset, Record as ActivityRecord } from '../../../types';
import { RecordStatus } from '../../../types/enums';
import { ContactInformation } from '../contact-information';
import { articleNineLabels } from '../../article-nine';

interface ExternalProps {
  record: ActivityRecord;
  requiredFieldsOnly?: boolean;
}

interface Props extends ExternalProps, DatasetsProps {}

const statuses = {
  [RecordStatus.DRAFT]: {
    text: 'Utkast',
    icon: CreateIconOutlined
  },
  [RecordStatus.APPROVED]: {
    text: 'Godkjent',
    icon: CheckBoxOutlinedIcon
  }
};

const RecordItemPure: FC<Props> = ({
  record: {
    organizationId,
    status,
    purpose,
    categories,
    recipientCategories,
    personalDataSubjects,
    plannedDeletion,
    articleSixBasis,
    otherArticles,
    businessAreas,
    securityMeasures,
    privacyProcessingSystems,
    dataProcessorContactDetails,
    commonDataControllerContact,
    dataTransfers,
    title,
    relatedDatasets,
    dataProtectionImpactAssessment,
    dataProcessingAgreements
  },
  requiredFieldsOnly,
  datasets,
  datasetsActions: { fetchAllDatasetsRequested: fetchAllDatasets }
}) => {
  const { text: statusText, icon: StatusIcon } = statuses[status];

  useEffect(() => {
    fetchAllDatasets(organizationId);
  }, []);

  const datasetsMap = datasets?.reduce(
    (previous, current) => ({ ...previous, [current.id]: current }),
    {} as Record<string, Dataset>
  );

  return (
    <>
      <SC.Header>
        <SC.Label>{localization.protocolApplyTo}:</SC.Label>
        <SC.Title>{title}</SC.Title>
        <SC.SubLabel>
          <StatusIcon />
          {statusText}
        </SC.SubLabel>
      </SC.Header>

      <SC.Section>
        <SC.SectionTitle>
          {localization.title}
          <SC.RequiredLabel text='Obligatorisk' />
        </SC.SectionTitle>
        <SC.SectionRow>
          <SC.SectionContent>{title}</SC.SectionContent>
        </SC.SectionRow>
      </SC.Section>

      <SC.Section>
        <SC.SectionTitle>{localization.dataProcessor}</SC.SectionTitle>

        <SC.SectionRow>
          {!requiredFieldsOnly && (
            <SC.SectionContent>
              <SC.SectionSubTitle>
                {localization.dataProcessorContactDetails}
              </SC.SectionSubTitle>
              {dataProcessorContactDetails?.map((dataProcessor, index) => (
                <ContactInformation
                  key={`contactInformation-${index}`}
                  contactDetailsInterface={dataProcessor}
                />
              ))}
            </SC.SectionContent>
          )}
          {!requiredFieldsOnly && (
            <SC.SectionContent>
              <SC.SectionSubTitle>
                {localization.dataProcessingAgreements}
              </SC.SectionSubTitle>
              {dataProcessingAgreements &&
                dataProcessingAgreements.map((item, index) => (
                  <Fragment key={`dataProcessingAgreements-${index}`}>
                    <div>{item.dataProcessorName}</div>
                    <div>
                      <a
                        title={item.agreementUrl}
                        href={item.agreementUrl}
                        rel='noopener noreferrer'
                      >
                        {item.agreementUrl}
                      </a>
                    </div>
                  </Fragment>
                ))}
            </SC.SectionContent>
          )}

          <SC.SectionContent>
            <SC.SectionSubTitle>
              {localization.commonDataControllerContact}
              <SC.RequiredLabel text='Obligatorisk' />
            </SC.SectionSubTitle>
            {commonDataControllerContact &&
              typeof commonDataControllerContact.commonDataControllerChecked ===
                'boolean' &&
              `${
                commonDataControllerContact.commonDataControllerChecked
                  ? localization.yes
                  : localization.no
              }`}

            {commonDataControllerContact &&
              commonDataControllerContact.commonDataControllerChecked &&
              commonDataControllerContact.companies && (
                <div>
                  <span>{commonDataControllerContact.companies}</span>
                </div>
              )}
            {commonDataControllerContact &&
              commonDataControllerContact.commonDataControllerChecked &&
              commonDataControllerContact.distributionOfResponsibilities && (
                <div>
                  <span>
                    {commonDataControllerContact.distributionOfResponsibilities}
                  </span>
                </div>
              )}

            {commonDataControllerContact &&
              commonDataControllerContact.commonDataControllerChecked &&
              commonDataControllerContact.contactPoints &&
              commonDataControllerContact.contactPoints.map(
                (contactPoint, index) => (
                  <ContactInformation
                    key={`contactInformation-${index}`}
                    contactDetailsInterface={contactPoint}
                  />
                )
              )}
          </SC.SectionContent>
        </SC.SectionRow>
      </SC.Section>

      <SC.Section>
        <SC.SectionTitle>{localization.records}</SC.SectionTitle>
        <SC.SectionContent>
          <SC.SectionSubTitle>
            {localization.purpose} <SC.RequiredLabel text='Obligatorisk' />
          </SC.SectionSubTitle>
          {purpose}
        </SC.SectionContent>

        {!requiredFieldsOnly && (
          <>
            <SC.SectionContent>
              <SC.SectionSubTitle>
                {localization.articleSixBasis}
              </SC.SectionSubTitle>
              {articleSixBasis &&
                articleSixBasis.map((item, index) => (
                  <Fragment key={`articleSixBasis-${index}`}>
                    {item.legality && (
                      <div>
                        <span>{item.legality}: </span>
                        <a
                          title={item.referenceUrl}
                          href={item.referenceUrl}
                          rel='noopener noreferrer'
                        >
                          {item.referenceUrl}
                        </a>
                      </div>
                    )}
                  </Fragment>
                ))}
            </SC.SectionContent>

            <SC.SectionContent>
              <SC.SectionSubTitle>
                {localization.otherArticles}
              </SC.SectionSubTitle>
              {otherArticles && otherArticles.articleNine && (
                <div style={{ marginBottom: '1em' }}>
                  <span>{localization.articleNine}:</span>
                  {typeof otherArticles.articleNine.checked === 'boolean' && (
                    <span>
                      {otherArticles.articleNine.checked
                        ? localization.yes
                        : localization.no}
                    </span>
                  )}
                  {otherArticles.articleNine.referenceUrl && (
                    <div>
                      <span>Henvisning til annen lovgivning: </span>
                      <a
                        title={otherArticles.articleNine.referenceUrl}
                        href={otherArticles.articleNine.referenceUrl}
                        rel='noopener noreferrer'
                      >
                        {otherArticles.articleNine.referenceUrl}
                      </a>
                    </div>
                  )}
                  {otherArticles.articleNine.checked &&
                    otherArticles.articleNine?.legalities?.map(
                      ({ legality, checked, referenceUrl }) => (
                        <>
                          {checked && (
                            <div style={{ marginTop: '1em' }}>
                              <span>
                                {articleNineLabels[legality].label ?? legality}
                                :&nbsp;
                              </span>
                              {checked ? localization.yes : localization.no}
                              {referenceUrl && (
                                <div>
                                  <span>
                                    {localization.referenceToOtherLegalBasis}
                                    :&nbsp;
                                  </span>
                                  {referenceUrl}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )
                    )}
                </div>
              )}

              {otherArticles && otherArticles.articleTen && (
                <div>
                  <span>{localization.articleTen}: </span>
                  {typeof otherArticles.articleTen.checked === 'boolean' && (
                    <span>
                      {otherArticles.articleTen.checked
                        ? localization.yes
                        : localization.no}
                    </span>
                  )}
                  {otherArticles.articleTen.checked &&
                    otherArticles.articleTen.referenceUrl && (
                      <div>
                        <span>Henvisning til annen lovgivning: </span>
                        <a
                          title={otherArticles.articleTen.referenceUrl}
                          href={otherArticles.articleTen.referenceUrl}
                          rel='noopener noreferrer'
                        >
                          {otherArticles.articleTen.referenceUrl}
                        </a>
                      </div>
                    )}
                </div>
              )}
            </SC.SectionContent>

            <SC.SectionContent>
              <SC.SectionSubTitle>
                {localization.businessArea}
              </SC.SectionSubTitle>
              {businessAreas &&
                businessAreas.map(item => (
                  <div key={`businessArea-${item}`}>{item}</div>
                ))}
            </SC.SectionContent>

            <SC.SectionContent>
              <SC.SectionSubTitle>
                {localization.relatedDatasets}
              </SC.SectionSubTitle>
              {relatedDatasets &&
                relatedDatasets.map(dataset => (
                  <div key={`relatedDataset-${dataset}`}>
                    <a
                      title={localization.relatedDatasets}
                      href={dataset}
                      rel='noopener noreferrer'
                    >
                      {datasetsMap[dataset]?.title?.nb ?? dataset}
                    </a>
                  </div>
                ))}
            </SC.SectionContent>
          </>
        )}
      </SC.Section>

      <SC.Section>
        <SC.SectionTitle>{localization.personalInformation}</SC.SectionTitle>
        {categories?.map(
          ({ personalDataCategories, dataSubjectCategories }, index) => (
            <Fragment key={`categories-${index}`}>
              <SC.SectionRow>
                <SC.SectionContent>
                  <SC.SectionSubTitle>
                    Kategorier av registrerte
                    <SC.RequiredLabel text='Obligatorisk' />
                  </SC.SectionSubTitle>
                  {dataSubjectCategories}
                </SC.SectionContent>
                <SC.SectionContent>
                  <SC.SectionSubTitle>
                    Kategorier av personopplysninger
                    <SC.RequiredLabel text='Obligatorisk' />
                  </SC.SectionSubTitle>
                  <ul>
                    {personalDataCategories?.map((personalDataCategory, i) => (
                      <li key={i}>{personalDataCategory}</li>
                    ))}
                  </ul>
                </SC.SectionContent>
              </SC.SectionRow>
            </Fragment>
          )
        )}
        <SC.SectionContent>
          <SC.SectionSubTitle>
            {localization.plannedDeletion}
            <SC.RequiredLabel text='Obligatorisk' />
          </SC.SectionSubTitle>
          {plannedDeletion}
        </SC.SectionContent>
        {!requiredFieldsOnly && (
          <>
            <SC.SectionContent>
              <SC.SectionSubTitle>
                {localization.personalDataSubjects}
              </SC.SectionSubTitle>
              {personalDataSubjects}
            </SC.SectionContent>
            <SC.SectionContent>
              <SC.SectionSubTitle>
                {localization.privacyProcessingSystems}
              </SC.SectionSubTitle>
              {privacyProcessingSystems}
            </SC.SectionContent>
          </>
        )}
      </SC.Section>

      <SC.Section>
        <SC.SectionTitle>{localization.dataTransfers}</SC.SectionTitle>

        <SC.SectionContent>
          <SC.SectionSubTitle>
            {localization.recipientCategories}
            <SC.RequiredLabel text='Obligatorisk' />
          </SC.SectionSubTitle>
          <ul>
            {recipientCategories?.map((recipient, index) => (
              <li key={index}>{recipient}</li>
            ))}
          </ul>
        </SC.SectionContent>

        <SC.SectionContent>
          <SC.SectionSubTitle>
            {localization.transfered}
            <SC.RequiredLabel text='Obligatorisk' />
          </SC.SectionSubTitle>
          {dataTransfers &&
            typeof dataTransfers.transferred === 'boolean' &&
            `${dataTransfers.transferred ? localization.yes : localization.no}`}
          {dataTransfers && dataTransfers.thirdCountryRecipients && (
            <span>, {dataTransfers.thirdCountryRecipients}</span>
          )}
        </SC.SectionContent>

        {dataTransfers?.transferred && (
          <SC.SectionContent>
            <SC.SectionSubTitle>
              {localization.guarantees}
              <SC.RequiredLabel text='Obligatorisk' />
            </SC.SectionSubTitle>
            {dataTransfers && dataTransfers.guarantees}
          </SC.SectionContent>
        )}
      </SC.Section>

      <SC.Section>
        <SC.SectionTitle>{localization.securityMeasuresTitle}</SC.SectionTitle>
        <SC.SectionContent>
          <SC.SectionSubTitle>
            {localization.securityMeasures}
            <SC.RequiredLabel text='Obligatorisk' />
          </SC.SectionSubTitle>
          {securityMeasures}
        </SC.SectionContent>
        {!requiredFieldsOnly && (
          <SC.SectionContent>
            <SC.SectionSubTitle>
              {localization.dataProtectionImpactAssessment}
            </SC.SectionSubTitle>
            {dataProtectionImpactAssessment &&
              typeof dataProtectionImpactAssessment.conducted === 'boolean' &&
              `${
                dataProtectionImpactAssessment.conducted
                  ? localization.yes
                  : localization.no
              }`}
            {dataProtectionImpactAssessment &&
              dataProtectionImpactAssessment.conducted &&
              dataProtectionImpactAssessment.assessmentReportUrl && (
                <span>
                  {`, ${dataProtectionImpactAssessment.assessmentReportUrl}`}
                </span>
              )}
          </SC.SectionContent>
        )}
      </SC.Section>
    </>
  );
};

export const RecordItem = compose<FC<ExternalProps>>(
  memo,
  withDatasets
)(RecordItemPure);
