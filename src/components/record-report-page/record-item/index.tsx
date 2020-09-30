import React, { memo, Fragment } from 'react';

import SC from './styled';
import { localization } from '../../../lib/localization';
import { Record } from '../../../types';
import { ContactInformation } from '../contact-information';

interface Props {
  record: Record;
}

const RecordItemPure = ({
  record: {
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
  }
}: Props) => (
  <>
    <SC.Header>
      <SC.Label>{localization.protocolApplyTo}:</SC.Label>
      <SC.Title>{title}</SC.Title>
    </SC.Header>

    <SC.Section>
      <SC.SectionTitle>{localization.dataProcessor}</SC.SectionTitle>

      <SC.SectionRow>
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

        <SC.SectionContent>
          <SC.SectionSubTitle>
            {localization.commonDataControllerContact}
          </SC.SectionSubTitle>

          {commonDataControllerContact &&
            commonDataControllerContact.companies && (
              <div>
                <span>{commonDataControllerContact.companies}</span>
              </div>
            )}
          {commonDataControllerContact &&
            commonDataControllerContact.distributionOfResponsibilities && (
              <div>
                <span>
                  {commonDataControllerContact.distributionOfResponsibilities}
                </span>
              </div>
            )}

          {commonDataControllerContact &&
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
        <SC.SectionSubTitle>{localization.purpose}</SC.SectionSubTitle>
        {purpose}
      </SC.SectionContent>

      <SC.SectionContent>
        <SC.SectionSubTitle>{localization.articleSixBasis}</SC.SectionSubTitle>
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
        <SC.SectionSubTitle>{localization.otherArticles}</SC.SectionSubTitle>
        {otherArticles &&
          otherArticles.articleNine &&
          otherArticles.articleNine.checked && (
            <div>
              <span>{localization.articleNine}: </span>
              <a
                title={otherArticles.articleNine.referenceUrl}
                href={otherArticles.articleNine.referenceUrl}
                rel='noopener noreferrer'
              >
                {otherArticles.articleNine.referenceUrl}
              </a>
            </div>
          )}

        {otherArticles &&
          otherArticles.articleTen &&
          otherArticles.articleTen.checked && (
            <div>
              <span>{localization.articleTen}: </span>
              <a
                title={otherArticles.articleTen.referenceUrl}
                href={otherArticles.articleTen.referenceUrl}
                rel='noopener noreferrer'
              >
                {otherArticles.articleTen.referenceUrl}
              </a>
            </div>
          )}
      </SC.SectionContent>

      <SC.SectionContent>
        <SC.SectionSubTitle>{localization.businessArea}</SC.SectionSubTitle>
        {businessAreas &&
          businessAreas.map(item => (
            <div key={`businessArea-${item}`}>{item}</div>
          ))}
      </SC.SectionContent>

      <SC.SectionContent>
        <SC.SectionSubTitle>{localization.relatedDatasets}</SC.SectionSubTitle>
        {relatedDatasets &&
          relatedDatasets.map(dataset => (
            <div key={`relatedDataset-${dataset}`}>
              <a
                title={localization.relatedDatasets}
                href={dataset}
                rel='noopener noreferrer'
              >
                {dataset}
              </a>
            </div>
          ))}
      </SC.SectionContent>
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
                </SC.SectionSubTitle>
                {dataSubjectCategories}
              </SC.SectionContent>
              <SC.SectionContent>
                <SC.SectionSubTitle>
                  Kategorier av personopplysninger
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
        <SC.SectionSubTitle>{localization.plannedDeletion}</SC.SectionSubTitle>
        {plannedDeletion}
      </SC.SectionContent>
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
    </SC.Section>

    <SC.Section>
      <SC.SectionTitle>{localization.dataTransfers}</SC.SectionTitle>

      <SC.SectionContent>
        <SC.SectionSubTitle>
          {localization.recipientCategories}
        </SC.SectionSubTitle>
        {recipientCategories}
      </SC.SectionContent>

      <SC.SectionContent>
        <SC.SectionSubTitle>{localization.transfered}</SC.SectionSubTitle>
        {dataTransfers && dataTransfers.transferred
          ? localization.yes
          : localization.no}
        {dataTransfers && dataTransfers.thirdCountryRecipients && (
          <span>, {dataTransfers.thirdCountryRecipients}</span>
        )}
      </SC.SectionContent>

      <SC.SectionContent>
        <SC.SectionSubTitle>{localization.guarantees}</SC.SectionSubTitle>
        {dataTransfers && dataTransfers.guarantees}
      </SC.SectionContent>
    </SC.Section>

    <SC.Section>
      <SC.SectionTitle>{localization.securityMeasuresTitle}</SC.SectionTitle>
      <SC.SectionContent>
        <SC.SectionSubTitle>{localization.securityMeasures}</SC.SectionSubTitle>
        {securityMeasures}
      </SC.SectionContent>

      <SC.SectionContent>
        <SC.SectionSubTitle>
          {localization.dataProtectionImpactAssessment}
        </SC.SectionSubTitle>
        {dataProtectionImpactAssessment &&
        dataProtectionImpactAssessment.conducted
          ? localization.yes
          : localization.no}
        {dataProtectionImpactAssessment &&
          !dataProtectionImpactAssessment.conducted && (
            <span>
              <a
                title={localization.assessmentReportUrl}
                href={localization.assessmentReportUrl}
                rel='noopener noreferrer'
              >
                {localization.assessmentReportUrl}
              </a>
            </span>
          )}
      </SC.SectionContent>
    </SC.Section>
  </>
);

export const RecordItem = memo(RecordItemPure);
