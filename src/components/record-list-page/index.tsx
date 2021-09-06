import React, { useEffect, memo, FC } from 'react';
import { compose } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

import Footer from '@fellesdatakatalog/internal-footer';
import { ExportToCsv } from 'export-to-csv';

import Root from '../root';
import Header from '../header';

import env from '../../env';
import { localization } from '../../lib/localization';
import { authService } from '../../services/auth-service';

import withOrganization, {
  Props as OrganizationProps
} from '../with-organization';

import withRecords, { Props as RecordsProps } from '../with-records';

import Headline from '../headline';
import FDKButton from '../fdk-button';
import FDKDropdownButton from '../fdk-dropdown-button';
import BreadcrumbsBar from '../breadcrumbs-bar';
import Representatives from '../representatives';
import RecordListTable from '../record-list-table';

import SC from './styled';

import { Record } from '../../types';

const { FDK_REGISTRATION_BASE_URI } = env;

interface RouteParams {
  organizationId: string;
}

interface Props
  extends RecordsProps,
    OrganizationProps,
    RouteComponentProps<RouteParams> {
  records: Record[];
}

const RecordListPage = ({
  records,
  organization,
  history: { push },
  match: {
    params: { organizationId }
  },
  recordsActions: { fetchAllRecordsRequested },
  organizationActions: { fetchOrganizationRequested }
}: Props): JSX.Element => {
  useEffect(() => {
    if (organizationId) {
      fetchOrganizationRequested(organizationId);
      fetchAllRecordsRequested(organizationId);
    }
  }, [organizationId]);

  const navigateToNewRecordPage = () => push(`/${organizationId}/records`);

  const downloadCSV = (requiredFieldsOnly: boolean) => {
    const headers = requiredFieldsOnly
      ? [
          localization.csvHeaders.title,
          localization.csvHeaders.purpose,
          localization.csvHeaders.categorySubjects,
          localization.csvHeaders.categoryPersonalData,
          localization.csvHeaders.plannedDeletion,
          localization.csvHeaders.recipientCategories,
          localization.csvHeaders.internationalReceivers,
          localization.csvHeaders.guarantees,
          localization.csvHeaders.securityMeasures
        ]
      : [
          localization.csvHeaders.title,
          localization.csvHeaders.dataProcessorName,
          localization.csvHeaders.dataProcessorTlf,
          localization.csvHeaders.dataProcessorEmail,
          localization.csvHeaders.dataProcessorAgreementNames,
          localization.csvHeaders.dataProcessorAgreementUrls,
          localization.csvHeaders.commonDataControllerCompanies,
          localization.csvHeaders.commonDataControllerResponsibilities,
          localization.csvHeaders.purpose,
          localization.csvHeaders.articleSixBasis,
          localization.csvHeaders.articleNineBasis,
          localization.csvHeaders.articleTenBasis,
          localization.csvHeaders.businessAreas,
          localization.csvHeaders.relatedDatasets,
          localization.csvHeaders.categorySubjects,
          localization.csvHeaders.categoryPersonalData,
          localization.csvHeaders.plannedDeletion,
          localization.csvHeaders.personalDataSubjects,
          localization.csvHeaders.privacyProcessingSystems,
          localization.csvHeaders.recipientCategories,
          localization.csvHeaders.internationalReceivers,
          localization.csvHeaders.guarantees,
          localization.csvHeaders.securityMeasures
        ];
    const csvInput = records
      .filter(record =>
        requiredFieldsOnly ? record.status === 'APPROVED' : true
      )
      .map(record =>
        requiredFieldsOnly
          ? {
              title: record.title,
              purpose: record.purpose,
              categorySubjects: record.categories
                .map(item => item.dataSubjectCategories)
                .join('|'),
              categoryPersonalData: record.categories
                .map(item => item.personalDataCategories?.join('|'))
                .join('::'),
              plannedDeletion: record.plannedDeletion,
              recipientCategories: record.recipientCategories.join('|'),
              internationalReceivers: record.dataTransfers.transferred
                ? `${localization.yes}, ${record.dataTransfers.thirdCountryRecipients}`
                : localization.no,
              guarantees: record.dataTransfers.guarantees,
              securityMeasures: record.securityMeasures
            }
          : {
              title: record.title,
              dataProcessorName: record.dataProcessorContactDetails
                .map(item => item.name)
                .join('|'),
              dataProcessorTlf: record.dataProcessorContactDetails
                .map(item => item.phone)
                .join('|'),
              dataProcessorEmail: record.dataProcessorContactDetails
                .map(item => item.email)
                .join('|'),
              dataProcessorAgreementNames: record.dataProcessingAgreements
                .map(item => item.dataProcessorName)
                .join('|'),
              dataProcessorAgreementUrls: record.dataProcessingAgreements
                .map(item => item.agreementUrl)
                .join('|'),
              commonDataControllerCompanies:
                record.commonDataControllerContact.companies,
              commonDataControllerResponsibilities:
                record.commonDataControllerContact
                  .distributionOfResponsibilities,
              purpose: record.purpose,
              articleSixBasis: record.articleSixBasis
                .map(item => item.legality)
                .join('|'),
              articleNineBasis: record.otherArticles.articleNine?.checked
                ? record.otherArticles.articleNine?.referenceUrl
                : '',
              articleTenBasis: record.otherArticles.articleTen?.checked
                ? record.otherArticles.articleTen?.referenceUrl
                : '',
              businessAreas: record.businessAreas.join('|'),
              relatedDatasets: record.relatedDatasets.join('|'),
              categorySubjects: record.categories
                .map(item => item.dataSubjectCategories)
                .join('|'),
              categoryPersonalData: record.categories
                .map(item => item.personalDataCategories?.join('|'))
                .join('::'),
              plannedDeletion: record.plannedDeletion,
              personalDataSubjects: record.personalDataSubjects,
              privacyProcessingSystems: record.privacyProcessingSystems,
              recipientCategories: record.recipientCategories.join('|'),
              internationalReceivers: record.dataTransfers.transferred
                ? `${localization.yes}, ${record.dataTransfers.thirdCountryRecipients}`
                : localization.no,
              guarantees: record.dataTransfers.guarantees,
              securityMeasures: record.securityMeasures
            }
      );

    const csvExporter = new ExportToCsv({
      fieldSeparator: ';',
      decimalSeparator: ',',
      showLabels: true,
      useBom: true,
      filename: requiredFieldsOnly ? 'protokoll' : 'behandlingsoversikt',
      headers
    });
    csvExporter.generateCsv(csvInput);
  };

  const isReadOnlyUser = authService.isReadOnlyUser(organizationId);

  return (
    <>
      <Root>
        <Header />
        <SC.RecordListPage>
          <BreadcrumbsBar
            breadcrumbs={[
              {
                title: 'Alle kataloger',
                url: FDK_REGISTRATION_BASE_URI
              },
              { title: 'Behandlingsoversikt', current: true }
            ]}
          />
          <Headline
            title='Behandlingsoversikt'
            subTitle={organization?.name ?? ''}
          />
          <Representatives
            isReadOnlyUser={isReadOnlyUser}
            organizationId={organizationId}
          />
          <SC.RecordListActions>
            {!isReadOnlyUser && (
              <FDKButton
                variant='primary'
                text='Legg til behandlingsaktivitet'
                onClick={navigateToNewRecordPage}
              />
            )}
            <FDKDropdownButton
              variant='secondary'
              text='Generer rapport'
              subButtons={[
                {
                  name: 'Behandlingsoversikt',
                  href: `/${organizationId}/report`,
                  external: true
                },
                {
                  name: 'Behandlingsoversikt CSV',
                  onClick: () => downloadCSV(false)
                },
                {
                  name: 'Protokoll',
                  href: `/${organizationId}/report/required`,
                  external: true
                },
                {
                  name: 'Protokoll CSV',
                  onClick: () => downloadCSV(true)
                }
              ]}
            />
          </SC.RecordListActions>
          <RecordListTable records={records} />
        </SC.RecordListPage>
      </Root>
      <Footer />
    </>
  );
};

export default compose<FC>(memo, withRecords, withOrganization)(RecordListPage);
