import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import SC from './styled';

import RepresentativeForm from '../representative-form';
import RepresentativeValidationSchema from '../representative-form/validation-schema';

import * as actions from './redux/actions';

import { RepresentativeType } from '../../types/enums';
import { RepresentativesInterface } from '../../types';
import { localization } from '../../utils/language/localization';

interface Props {
  isReadOnlyUser?: boolean;
  organizationId?: string;
  representatives: RepresentativesInterface;
  actions: typeof actions;
}

const Representatives = ({
  isReadOnlyUser,
  organizationId,
  representatives: {
    dataControllerRepresentative,
    dataControllerRepresentativeInEU,
    dataProtectionOfficer
  },
  actions: { patchRepresentativeRequested, fetchAllRepresentativesRequested }
}: Props): JSX.Element => {
  const [isValidDataController, setIsValidDataController] = useState(false);
  const [isValidProtectionOfficer, setIsValidProtectionOfficer] =
    useState(false);

  const validateDataController = async () =>
    (await RepresentativeValidationSchema.isValid(
      dataControllerRepresentative
    )) &&
    (!(
      dataControllerRepresentativeInEU.name ||
      dataControllerRepresentativeInEU.address ||
      dataControllerRepresentativeInEU.email ||
      dataControllerRepresentativeInEU.phone
    ) ||
      RepresentativeValidationSchema.isValid(dataControllerRepresentativeInEU));

  const validateProtectionOfficer = async () =>
    RepresentativeValidationSchema.isValid(dataProtectionOfficer);

  useEffect(() => {
    if (organizationId) {
      fetchAllRepresentativesRequested(organizationId);
    }
  }, [organizationId]);

  validateDataController().then(valid => setIsValidDataController(valid));
  validateProtectionOfficer().then(valid => setIsValidProtectionOfficer(valid));

  return (
    <SC.Representatives>
      <SC.FormPanel
        tag='mandatory'
        headingTitle='Kontaktinformasjon'
        subtitle={dataControllerRepresentative?.name}
        hasError={!isValidDataController}
      >
        <div>
          <RepresentativeForm
            isReadOnlyUser={isReadOnlyUser}
            type={RepresentativeType.DATA_CONTROLLER_REPRESENTATIVE}
            title='Behandlingsansvarlig'
            subtitle={localization.dataControllerRepresentativeAbstract}
            description={localization.dataControllerRepresentativeDescription}
            representative={dataControllerRepresentative ?? {}}
            organizationId={organizationId}
            onChange={patchRepresentativeRequested}
          />
          <RepresentativeForm
            isReadOnlyUser={isReadOnlyUser}
            type={RepresentativeType.DATA_CONTROLLER_REPRESENTATIVE_IN_EU}
            title='Representant for behandlingsansvarlig'
            subtitle={localization.dataControllerRepresentativeInEUAbstract}
            description={
              localization.dataControllerRepresentativeInEUDescription
            }
            representative={dataControllerRepresentativeInEU ?? {}}
            organizationId={organizationId}
            onChange={patchRepresentativeRequested}
          />
        </div>
      </SC.FormPanel>
      <SC.FormPanel
        tag='mandatory'
        headingTitle='Personvernombud'
        subtitle={dataProtectionOfficer?.name}
        hasError={!isValidProtectionOfficer}
      >
        <RepresentativeForm
          isReadOnlyUser={isReadOnlyUser}
          type={RepresentativeType.DATA_PROTECTION_OFFICER}
          title='Personvernombud'
          subtitle={localization.dataProtectionOfficerRepresentativeAbstract}
          description={
            localization.dataProtectionOfficerRepresentativeDescription
          }
          representative={dataProtectionOfficer ?? {}}
          organizationId={organizationId}
          onChange={patchRepresentativeRequested}
        />
      </SC.FormPanel>
    </SC.Representatives>
  );
};

const mapStateToProps = (state: any) => ({
  representatives: state.RepresentativesReducer.get('representatives').toJS(),
  tryCreateRepresentatives: state.RepresentativesReducer.get(
    'tryCreateRepresentatives'
  )
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(Representatives));
