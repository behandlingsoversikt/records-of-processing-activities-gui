import React, { useEffect, memo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { ExportToCsv } from 'export-to-csv';

import Root from '../root';

import env from '../../env';
import { localization } from '../../lib/localization';

import withDatasets, { Props as DatasetsProps } from '../with-datasets';
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

import { Dataset, Record, RepresentativesInterface } from '../../types';
import { fetchAllRepresentativesRequested } from '../representatives/redux/actions';

import { withAuth, Props as AuthServiceProps } from '../../providers/auth';

const { FDK_REGISTRATION_BASE_URI } = env;

interface RouteParams {
  organizationId: string;
}

interface Props
  extends DatasetsProps,
    RecordsProps,
    OrganizationProps,
    AuthServiceProps,
    RouteComponentProps<RouteParams> {
  representatives: RepresentativesInterface;
  fetchAllRepresentatives: typeof fetchAllRepresentativesRequested;
  records: Record[];
}

const RecordListPage = ({
  datasets,
  records,
  organization,
  representatives,
  history: { push },
  match: {
    params: { organizationId }
  },
  fetchAllRepresentatives,
  datasetsActions: { fetchAllDatasetsRequested },
  recordsActions: { fetchAllRecordsRequested },
  organizationActions: { fetchOrganizationRequested },
  authService
}: Props): JSX.Element => {
  useEffect(() => {
    if (organizationId) {
      fetchAllDatasetsRequested(organizationId);
      fetchOrganizationRequested(organizationId);
      fetchAllRecordsRequested(organizationId);
      fetchAllRepresentatives(organizationId);
    }
  }, [organizationId]);

  const navigateToNewRecordPage = () => push(`/${organizationId}/records`);

  const yesNoOrEmpty = (
    bool: boolean | undefined,
    yesText: string = localization.yes
  ) => {
    if (typeof bool === 'boolean') {
      return bool ? yesText : localization.no;
    }
    return '';
  };

  const downloadCSV = (requiredFieldsOnly: boolean) => {
    const variableHeaders = requiredFieldsOnly
      ? [
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
          localization.csvHeaders.dataProcessorName,
          localization.csvHeaders.dataProcessorTlf,
          localization.csvHeaders.dataProcessorEmail,
          localization.csvHeaders.dataProcessorAgreementNames,
          localization.csvHeaders.dataProcessorAgreementUrls,
          localization.csvHeaders.commonDataControllerCompanies,
          localization.csvHeaders.commonDataControllerResponsibilities,
          localization.csvHeaders.commonDataControllerContact,
          localization.csvHeaders.commonDataControllerEmail,
          localization.csvHeaders.commonDataControllerTlf,
          localization.csvHeaders.purpose,
          localization.csvHeaders.articleSixBasis,
          localization.csvHeaders.articleSixReference,
          localization.csvHeaders.articleNineBasis,
          localization.csvHeaders.articleNineReference,
          localization.csvHeaders.articleTenBasis,
          localization.csvHeaders.articleTenReference,
          localization.csvHeaders.businessAreas,
          localization.csvHeaders.relatedDatasetsUrl,
          localization.csvHeaders.relatedDatasetsName,
          localization.csvHeaders.categorySubjects,
          localization.csvHeaders.categoryPersonalData,
          localization.csvHeaders.plannedDeletion,
          localization.csvHeaders.personalDataSubjects,
          localization.csvHeaders.privacyProcessingSystems,
          localization.csvHeaders.recipientCategories,
          localization.csvHeaders.internationalReceivers,
          localization.csvHeaders.guarantees,
          localization.csvHeaders.securityMeasures,
          localization.csvHeaders.dpiaConducted,
          localization.csvHeaders.dpiaReference
        ];

    const headers = [
      localization.csvHeaders.organizationName,
      localization.csvHeaders.organizationId,
      localization.csvHeaders.dataControllerRepresentative,
      localization.csvHeaders.dataControllerRepresentativeAddress,
      localization.csvHeaders.dataControllerRepresentativeEmail,
      localization.csvHeaders.dataControllerRepresentativePhone,
      localization.csvHeaders.dataControllerRepresentativeInEU,
      localization.csvHeaders.dataControllerRepresentativeInEUName,
      localization.csvHeaders.dataControllerRepresentativeInEUAddress,
      localization.csvHeaders.dataControllerRepresentativeInEUEmail,
      localization.csvHeaders.dataControllerRepresentativeInEUPhone,
      localization.csvHeaders.dataProtectionOfficerName,
      localization.csvHeaders.dataProtectionOfficerAddress,
      localization.csvHeaders.dataProtectionOfficerEmail,
      localization.csvHeaders.dataProtectionOfficerPhone,
      localization.csvHeaders.title,
      ...variableHeaders
    ];

    const hasEuRepresentative = !!(
      representatives?.dataControllerRepresentativeInEU?.name ||
      representatives?.dataControllerRepresentativeInEU?.address ||
      representatives?.dataControllerRepresentativeInEU?.email ||
      representatives?.dataControllerRepresentativeInEU?.phone
    );

    const csvInput = records
      .filter(record =>
        requiredFieldsOnly ? record.status === 'APPROVED' : true
      )
      .map(record =>
        requiredFieldsOnly
          ? {
              organizationName: organization?.name ?? '',
              organizationId,
              dataControllerRepresentative:
                representatives?.dataControllerRepresentative?.name ?? '',
              dataControllerRepresentativeAddress:
                representatives?.dataControllerRepresentative?.address ?? '',
              dataControllerRepresentativeEmail:
                representatives?.dataControllerRepresentative?.email ?? '',
              dataControllerRepresentativePhone:
                representatives?.dataControllerRepresentative?.phone ?? '',
              outsideEU: hasEuRepresentative
                ? localization.yes
                : localization.no,
              euRepresentativeName:
                representatives?.dataControllerRepresentativeInEU?.name ?? '',
              euRepresentativeAddress:
                representatives?.dataControllerRepresentativeInEU?.address ??
                '',
              euRepresentativeEmail:
                representatives?.dataControllerRepresentativeInEU?.email ?? '',
              euRepresentativePhone:
                representatives?.dataControllerRepresentativeInEU?.phone ?? '',
              dataProtectionOfficerName:
                representatives?.dataProtectionOfficer?.name ?? '',
              dataProtectionOfficerAddress:
                representatives?.dataProtectionOfficer?.address ?? '',
              dataProtectionOfficerEmail:
                representatives?.dataProtectionOfficer?.email ?? '',
              dataProtectionOfficerPhone:
                representatives?.dataProtectionOfficer?.phone ?? '',
              title: record.title ?? '',
              purpose: record.purpose ?? '',
              categorySubjects:
                record.categories
                  ?.map(item => item.dataSubjectCategories)
                  ?.join(' | ') ?? '',
              categoryPersonalData:
                record.categories
                  ?.map(item => item.personalDataCategories?.join(' | '))
                  ?.join(' :: ') ?? '',
              plannedDeletion: record.plannedDeletion ?? '',
              recipientCategories:
                record.recipientCategories?.join(' | ') ?? '',
              internationalReceivers: yesNoOrEmpty(
                record.dataTransfers?.transferred,
                `${localization.yes}, ${record.dataTransfers?.thirdCountryRecipients}`
              ),
              guarantees: record.dataTransfers?.guarantees ?? '',
              securityMeasures: record.securityMeasures ?? ''
            }
          : {
              organizationName: organization?.name ?? '',
              organizationId,
              dataControllerRepresentative:
                representatives?.dataControllerRepresentative?.name ?? '',
              dataControllerRepresentativeAddress:
                representatives?.dataControllerRepresentative?.address ?? '',
              dataControllerRepresentativeEmail:
                representatives?.dataControllerRepresentative?.email ?? '',
              dataControllerRepresentativePhone:
                representatives?.dataControllerRepresentative?.phone ?? '',
              outsideEU: hasEuRepresentative
                ? localization.yes
                : localization.no,
              euRepresentativeName:
                representatives?.dataControllerRepresentativeInEU?.name ?? '',
              euRepresentativeAddress:
                representatives?.dataControllerRepresentativeInEU?.address ??
                '',
              euRepresentativeEmail:
                representatives?.dataControllerRepresentativeInEU?.email ?? '',
              euRepresentativePhone:
                representatives?.dataControllerRepresentativeInEU?.phone ?? '',
              dataProtectionOfficerName:
                representatives?.dataProtectionOfficer?.name ?? '',
              dataProtectionOfficerAddress:
                representatives?.dataProtectionOfficer?.address ?? '',
              dataProtectionOfficerEmail:
                representatives?.dataProtectionOfficer?.email ?? '',
              dataProtectionOfficerPhone:
                representatives?.dataProtectionOfficer?.phone ?? '',
              title: record.title ?? '',
              dataProcessorName:
                record.dataProcessorContactDetails
                  ?.map(item => item.name)
                  ?.join(' | ') ?? '',
              dataProcessorTlf:
                record.dataProcessorContactDetails
                  ?.map(item => item.phone)
                  ?.join(' | ') ?? '',
              dataProcessorEmail:
                record.dataProcessorContactDetails
                  ?.map(item => item.email)
                  ?.join(' | ') ?? '',
              dataProcessorAgreementNames:
                record.dataProcessingAgreements
                  ?.map(item => item.dataProcessorName)
                  ?.join(' | ') ?? '',
              dataProcessorAgreementUrls:
                record.dataProcessingAgreements
                  ?.map(item => item.agreementUrl)
                  ?.join(' | ') ?? '',
              commonDataControllerChecked: yesNoOrEmpty(
                record.commonDataControllerContact?.commonDataControllerChecked,
                `${localization.yes}`
              ),
              commonDataControllerCompanies:
                record.commonDataControllerContact?.companies ?? '',
              commonDataControllerResponsibilities:
                record.commonDataControllerContact
                  ?.distributionOfResponsibilities ?? '',
              commonDataControllerContact:
                record.commonDataControllerContact?.contactPoints
                  ?.map(item => item.name)
                  ?.join(' | ') ?? '',
              commonDataControllerEmail:
                record.commonDataControllerContact?.contactPoints
                  ?.map(item => item.email)
                  ?.join(' | ') ?? '',
              commonDataControllerTlf:
                record.commonDataControllerContact?.contactPoints
                  ?.map(item => item.phone)
                  ?.join(' | ') ?? '',
              purpose: record.purpose ?? '',
              articleSixBasis:
                record.articleSixBasis
                  ?.map(item => item.legality)
                  ?.join(' | ') ?? '',
              articleSixReference:
                record.articleSixBasis
                  ?.map(item => item.referenceUrl ?? ' ')
                  ?.join(' | ') ?? '',
              articleNineBasis: yesNoOrEmpty(
                record.otherArticles?.articleNine?.checked
              ),
              articleNineReference: record.otherArticles?.articleNine?.checked
                ? record.otherArticles?.articleNine?.referenceUrl
                : '',
              articleTenBasis: yesNoOrEmpty(
                record.otherArticles?.articleTen?.checked
              ),
              articleTenReference: record.otherArticles?.articleTen?.checked
                ? record.otherArticles?.articleTen?.referenceUrl
                : '',
              businessAreas: record.businessAreas?.join(' | ') ?? '',
              relatedDatasets:
                record.relatedDatasets
                  ?.map(
                    id =>
                      datasets.find(
                        ({ id: datasetId }: Dataset) => datasetId === id
                      )?.uri ?? ''
                  )
                  ?.join(' | ') ?? '',
              relatedDatasetNames:
                record.relatedDatasets
                  ?.map(
                    id =>
                      datasets.find(
                        ({ id: datasetId }: Dataset) => datasetId === id
                      )?.title[localization.getLanguage()] ?? ''
                  )
                  ?.join(' | ') ?? '',
              categorySubjects:
                record.categories
                  ?.map(item => item.dataSubjectCategories)
                  ?.join(' | ') ?? '',
              categoryPersonalData:
                record.categories
                  ?.map(item => item.personalDataCategories?.join(' | '))
                  ?.join(' :: ') ?? '',
              plannedDeletion: record.plannedDeletion ?? '',
              personalDataSubjects: record.personalDataSubjects ?? '',
              privacyProcessingSystems: record.privacyProcessingSystems ?? '',
              recipientCategories:
                record.recipientCategories?.join(' | ') ?? '',
              internationalReceivers: yesNoOrEmpty(
                record.dataTransfers?.transferred,
                `${localization.yes}, ${record.dataTransfers?.thirdCountryRecipients}`
              ),
              guarantees: record.dataTransfers?.guarantees ?? '',
              securityMeasures: record.securityMeasures ?? '',
              dpiaConducted: yesNoOrEmpty(
                record.dataProtectionImpactAssessment?.conducted
              ),
              dpiaReference: record.dataProtectionImpactAssessment?.conducted
                ? record.dataProtectionImpactAssessment?.assessmentReportUrl
                : ''
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
    <Root id='content'>
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
  );
};

export default memo(
  withAuth(withDatasets(withRecords(withOrganization(RecordListPage))))
);
