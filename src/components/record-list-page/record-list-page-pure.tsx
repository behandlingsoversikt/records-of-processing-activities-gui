import React, { useEffect, memo, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Alert, { Severity } from '@fellesdatakatalog/alert';
import Root from '../root';

import env from '../../env';
import { localization } from '../../utils/language/localization';

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

import {
  Dataset,
  Legality,
  Record,
  RepresentativesInterface
} from '../../types';
import { fetchAllRepresentativesRequested } from '../representatives/redux/actions';

import { withAuth, Props as AuthServiceProps } from '../../providers/auth';
import { ArticleNineCode } from '../../types/enums';

import RepresentativeValidationSchema from '../representative-form/validation-schema';
import { CsvColumn, downloadCsv } from '../../utils/csv';

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

const validateRepresentatives = async (
  representatives: RepresentativesInterface
) => {
  const {
    dataControllerRepresentative,
    dataControllerRepresentativeInEU,
    dataProtectionOfficer
  } = representatives;

  return (
    (await RepresentativeValidationSchema.isValid(
      dataControllerRepresentative
    )) &&
    (!(
      dataControllerRepresentativeInEU.name ||
      dataControllerRepresentativeInEU.address ||
      dataControllerRepresentativeInEU.email ||
      dataControllerRepresentativeInEU.phone
    ) ||
      (await RepresentativeValidationSchema.isValid(
        representatives.dataControllerRepresentativeInEU
      ))) &&
    RepresentativeValidationSchema.isValid(dataProtectionOfficer)
  );
};

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
  const [isValidRepresentatives, setIsValidRepresentatives] = useState(false);

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

  const yesOrEmpty = (
    bool: boolean | undefined,
    yesText: string = localization.yes
  ) => {
    if (typeof bool === 'boolean' && bool) {
      return yesText;
    }
    return '';
  };

  const downloadCSVExport = (requiredFieldsOnly: boolean) => {
    const variableHeaders = requiredFieldsOnly
      ? [
          {
            key: 'purpose',
            title: localization.csvHeaders.purpose
          },
          {
            key: 'commonDataControllerChecked',
            title: localization.csvHeaders.commonDataControllerChecked
          },
          {
            key: 'commonDataControllerCompanies',
            title: localization.csvHeaders.commonDataControllerCompanies
          },
          {
            key: 'commonDataControllerContact',
            title: localization.csvHeaders.commonDataControllerContact
          },
          {
            key: 'categorySubjects',
            title: localization.csvHeaders.categorySubjects
          },
          {
            key: 'categoryPersonalData',
            title: localization.csvHeaders.categoryPersonalData
          },
          {
            key: 'plannedDeletion',
            title: localization.csvHeaders.plannedDeletion
          },
          {
            key: 'recipientCategories',
            title: localization.csvHeaders.recipientCategories
          },
          {
            key: 'internationalReceivers',
            title: localization.csvHeaders.internationalReceivers
          },
          {
            key: 'guarantees',
            title: localization.csvHeaders.guarantees
          },
          {
            key: 'securityMeasures',
            title: localization.csvHeaders.securityMeasures
          }
        ]
      : [
          {
            key: 'processStatus',
            title: localization.csvHeaders.processStatus
          },
          {
            key: 'dataProcessorName',
            title: localization.csvHeaders.dataProcessorName
          },
          {
            key: 'dataProcessorTlf',
            title: localization.csvHeaders.dataProcessorTlf
          },
          {
            key: 'dataProcessorEmail',
            title: localization.csvHeaders.dataProcessorEmail
          },
          {
            key: 'dataProcessorAgreementNames',
            title: localization.csvHeaders.dataProcessorAgreementNames
          },
          {
            key: 'dataProcessorAgreementUrls',
            title: localization.csvHeaders.dataProcessorAgreementUrls
          },
          {
            key: 'commonDataControllerChecked',
            title: localization.csvHeaders.commonDataControllerChecked
          },
          {
            key: 'commonDataControllerCompanies',
            title: localization.csvHeaders.commonDataControllerCompanies
          },
          {
            key: 'commonDataControllerResponsibilities',
            title: localization.csvHeaders.commonDataControllerResponsibilities
          },
          {
            key: 'commonDataControllerContact',
            title: localization.csvHeaders.commonDataControllerContact
          },
          {
            key: 'commonDataControllerEmail',
            title: localization.csvHeaders.commonDataControllerEmail
          },
          {
            key: 'commonDataControllerTlf',
            title: localization.csvHeaders.commonDataControllerTlf
          },
          {
            key: 'purpose',
            title: localization.csvHeaders.purpose
          },
          {
            key: 'articleSixBasis',
            title: localization.csvHeaders.articleSixBasis
          },
          {
            key: 'articleSixReference',
            title: localization.csvHeaders.articleSixReference
          },
          {
            key: 'articleNineBasis',
            title: localization.csvHeaders.articleNineBasis
          },
          {
            key: 'articleNineReference',
            title: localization.csvHeaders.articleNineReference
          },
          {
            key: 'articleNineLegalityA',
            title: localization.articleNineCodes.labels.a
          },
          {
            key: 'articleNineLegalityB',
            title: localization.articleNineCodes.labels.b
          },
          {
            key: 'articleNineLegalityBReference',
            title: localization.articleNineCodes.reference.b
          },
          {
            key: 'articleNineLegalityC',
            title: localization.articleNineCodes.labels.c
          },
          {
            key: 'articleNineLegalityCReference',
            title: localization.articleNineCodes.reference.c
          },
          {
            key: 'articleNineLegalityD',
            title: localization.articleNineCodes.labels.d
          },
          {
            key: 'articleNineLegalityDReference',
            title: localization.articleNineCodes.reference.d
          },
          {
            key: 'articleNineLegalityE',
            title: localization.articleNineCodes.labels.e
          },
          {
            key: 'articleNineLegalityEReference',
            title: localization.articleNineCodes.reference.e
          },
          {
            key: 'articleNineLegalityF',
            title: localization.articleNineCodes.labels.f
          },
          {
            key: 'articleNineLegalityFReference',
            title: localization.articleNineCodes.reference.f
          },
          {
            key: 'articleNineLegalityG',
            title: localization.articleNineCodes.labels.g
          },
          {
            key: 'articleNineLegalityGReference',
            title: localization.articleNineCodes.reference.g
          },
          {
            key: 'articleNineLegalityH',
            title: localization.articleNineCodes.labels.h
          },
          {
            key: 'articleNineLegalityHReference',
            title: localization.articleNineCodes.reference.h
          },
          {
            key: 'articleNineLegalityI',
            title: localization.articleNineCodes.labels.i
          },
          {
            key: 'articleNineLegalityIReference',
            title: localization.articleNineCodes.reference.i
          },
          {
            key: 'articleNineLegalityJ',
            title: localization.articleNineCodes.labels.j
          },
          {
            key: 'articleNineLegalityJReference',
            title: localization.articleNineCodes.reference.j
          },
          {
            key: 'articleTenBasis',
            title: localization.csvHeaders.articleTenBasis
          },
          {
            key: 'articleTenReference',
            title: localization.csvHeaders.articleTenReference
          },
          {
            key: 'businessAreas',
            title: localization.csvHeaders.businessAreas
          },
          {
            key: 'relatedDatasets',
            title: localization.csvHeaders.relatedDatasetsUrl
          },
          {
            key: 'relatedDatasetNames',
            title: localization.csvHeaders.relatedDatasetsName
          },
          {
            key: 'categorySubjects',
            title: localization.csvHeaders.categorySubjects
          },
          {
            key: 'categoryPersonalData',
            title: localization.csvHeaders.categoryPersonalData
          },
          {
            key: 'plannedDeletion',
            title: localization.csvHeaders.plannedDeletion
          },
          {
            key: 'personalDataSubjects',
            title: localization.csvHeaders.personalDataSubjects
          },
          {
            key: 'privacyProcessingSystems',
            title: localization.csvHeaders.privacyProcessingSystems
          },
          {
            key: 'recipientCategories',
            title: localization.csvHeaders.recipientCategories
          },
          {
            key: 'internationalReceivers',
            title: localization.csvHeaders.internationalReceivers
          },
          {
            key: 'guarantees',
            title: localization.csvHeaders.guarantees
          },
          {
            key: 'securityMeasures',
            title: localization.csvHeaders.securityMeasures
          },
          {
            key: 'dpiaConducted',
            title: localization.csvHeaders.dpiaConducted
          },
          {
            key: 'dpiaReference',
            title: localization.csvHeaders.dpiaReference
          }
        ];

    const headers: CsvColumn[] = [
      {
        key: 'organizationName',
        title: localization.csvHeaders.organizationName
      },
      { key: 'organizationId', title: localization.csvHeaders.organizationId },
      {
        key: 'dataControllerRepresentative',
        title: localization.csvHeaders.dataControllerRepresentative
      },
      {
        key: 'dataControllerRepresentativeAddress',
        title: localization.csvHeaders.dataControllerRepresentativeAddress
      },
      {
        key: 'dataControllerRepresentativeEmail',
        title: localization.csvHeaders.dataControllerRepresentativeEmail
      },
      {
        key: 'dataControllerRepresentativePhone',
        title: localization.csvHeaders.dataControllerRepresentativePhone
      },
      {
        key: 'outsideEU',
        title: localization.csvHeaders.dataControllerRepresentativeInEU
      },
      {
        key: 'euRepresentativeName',
        title: localization.csvHeaders.dataControllerRepresentativeInEUName
      },
      {
        key: 'euRepresentativeAddress',
        title: localization.csvHeaders.dataControllerRepresentativeInEUAddress
      },
      {
        key: 'euRepresentativeEmail',
        title: localization.csvHeaders.dataControllerRepresentativeInEUEmail
      },
      {
        key: 'euRepresentativePhone',
        title: localization.csvHeaders.dataControllerRepresentativeInEUPhone
      },
      {
        key: 'dataProtectionOfficerName',
        title: localization.csvHeaders.dataProtectionOfficerName
      },
      {
        key: 'dataProtectionOfficerAddress',
        title: localization.csvHeaders.dataProtectionOfficerAddress
      },
      {
        key: 'dataProtectionOfficerEmail',
        title: localization.csvHeaders.dataProtectionOfficerEmail
      },
      {
        key: 'dataProtectionOfficerPhone',
        title: localization.csvHeaders.dataProtectionOfficerPhone
      },
      { key: 'title', title: localization.csvHeaders.title },
      ...variableHeaders
    ];

    const hasEuRepresentative = !!(
      representatives?.dataControllerRepresentativeInEU?.name ||
      representatives?.dataControllerRepresentativeInEU?.address ||
      representatives?.dataControllerRepresentativeInEU?.email ||
      representatives?.dataControllerRepresentativeInEU?.phone
    );

    const csvData = records
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
              commonDataControllerChecked: yesNoOrEmpty(
                record.commonDataControllerContact?.commonDataControllerChecked,
                `${localization.yes}`
              ),
              commonDataControllerCompanies:
                record.commonDataControllerContact?.companies ?? '',
              commonDataControllerContact:
                record.commonDataControllerContact?.contactPoints
                  ?.map(item => item.name)
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
              processStatus: localization.processStatus[`${record.status}`],
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
              articleNineReference:
                record.otherArticles?.articleNine?.checked &&
                record.otherArticles?.articleNine?.referenceUrl !== null
                  ? record.otherArticles?.articleNine?.referenceUrl
                  : '',
              articleNineLegalityA: yesOrEmpty(
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.A
                )?.checked
              ),
              articleNineLegalityB: yesOrEmpty(
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.B
                )?.checked
              ),
              articleNineLegalityBReference:
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.B
                )?.referenceUrl ?? '',
              articleNineLegalityC: yesOrEmpty(
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.C
                )?.checked
              ),
              articleNineLegalityCReference:
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.C
                )?.referenceUrl ?? '',
              articleNineLegalityD: yesOrEmpty(
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.D
                )?.checked
              ),
              articleNineLegalityDReference:
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.D
                )?.referenceUrl ?? '',
              articleNineLegalityE: yesOrEmpty(
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.E
                )?.checked
              ),
              articleNineLegalityEReference:
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.E
                )?.referenceUrl ?? '',
              articleNineLegalityF: yesOrEmpty(
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.F
                )?.checked
              ),
              articleNineLegalityFReference:
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.F
                )?.referenceUrl ?? '',
              articleNineLegalityG: yesOrEmpty(
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.G
                )?.checked
              ),
              articleNineLegalityGReference:
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.G
                )?.referenceUrl ?? '',
              articleNineLegalityH: yesOrEmpty(
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.H
                )?.checked
              ),
              articleNineLegalityHReference:
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.H
                )?.referenceUrl ?? '',
              articleNineLegalityI: yesOrEmpty(
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.I
                )?.checked
              ),
              articleNineLegalityIReference:
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.I
                )?.referenceUrl ?? '',
              articleNineLegalityJ: yesOrEmpty(
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.J
                )?.checked
              ),
              articleNineLegalityJReference:
                record.otherArticles?.articleNine?.legalities?.find(
                  ({ legality }: Legality) => legality === ArticleNineCode.J
                )?.referenceUrl ?? '',
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

    downloadCsv(
      csvData,
      headers,
      `${
        requiredFieldsOnly ? localization.protocol : localization.overview
      } for ${organization?.name ?? ''}`
    );
  };

  const isReadOnlyUser = authService.isReadOnlyUser(organizationId);

  validateRepresentatives(representatives).then(valid => {
    setIsValidRepresentatives(valid);
  });

  return (
    <Root id='content'>
      <Helmet>
        <title>{`Behandlingsoversikt for ${organization?.name ?? ''}`}</title>
      </Helmet>
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
        {!isValidRepresentatives && (
          <Alert severity={Severity.WARNING}>
            Ett eller flere obligatoriske felt er ikke fylt ut. For å generere
            rapporter for protokoll må disse fylles ut.
          </Alert>
        )}
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
                onClick: () => downloadCSVExport(false)
              },
              {
                name: 'Protokoll',
                href: `/${organizationId}/report/required`,
                external: true,
                disabled: !isValidRepresentatives
              },
              {
                name: 'Protokoll CSV',
                onClick: () => downloadCSVExport(true),
                disabled: !isValidRepresentatives
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
