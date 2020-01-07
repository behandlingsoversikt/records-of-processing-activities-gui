import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import SC from './styled';

import ExpansionPanel from '../expansion-panel';
import Anchor from '../anchor';
import RepresentativeForm from '../representative-form';

import * as actions from './redux/actions';

import { RepresentativeType } from '../../types/enums';
import { RepresentativesInterface } from '../../types';

interface Props {
  organizationId?: string;
  representatives: RepresentativesInterface;
  actions: typeof actions;
}

const Representatives = ({
  organizationId,
  representatives: {
    dataControllerRepresentative,
    dataControllerRepresentativeInEU,
    dataProtectionOfficer
  },
  actions: { patchRepresentativeRequested, fetchAllRepresentativesRequested }
}: Props): JSX.Element => {
  useEffect(() => {
    if (organizationId) {
      fetchAllRepresentativesRequested(organizationId);
    }
  }, [organizationId]);

  return (
    <SC.Representatives>
      <ExpansionPanel
        required
        title='Representant for behandlingsansvarlig'
        subtitle={dataControllerRepresentative.name}
      >
        <RepresentativeForm
          type={RepresentativeType.DATA_CONTROLLER_REPRESENTATIVE}
          title='Representant for behandlingsansvarlig'
          subtitle='Den korte hjelpeteksten'
          representative={dataControllerRepresentative}
          organizationId={organizationId}
          onChange={patchRepresentativeRequested}
        />
        <SC.LegalNoticeEU>
          Virksomheter som er etablert utenfor EU eller EØS, men som har
          geografisk virkeområde innenfor EU eller EØS må utpeke en representant
          innenfor EU eller EØS. Se{' '}
          <Anchor
            external
            href='https://lovdata.no/dokument/NL/lov/2018-06-15-38'
            text='Personopplysingsloven'
          />{' '}
          for mer informasjon.
        </SC.LegalNoticeEU>
        <RepresentativeForm
          type={RepresentativeType.DATA_CONTROLLER_REPRESENTATIVE_IN_EU}
          title='Representant for behandlingsansvarlig'
          subtitle='Den korte hjelpeteksten'
          representative={dataControllerRepresentativeInEU}
          onChange={patchRepresentativeRequested}
        />
      </ExpansionPanel>
      <ExpansionPanel
        required
        title='Personvernombud'
        subtitle={dataProtectionOfficer && dataProtectionOfficer.name}
      >
        <RepresentativeForm
          type={RepresentativeType.DATA_PROTECTION_OFFICER}
          title='Personvernombud'
          subtitle='Den korte hjelpeteksten'
          representative={dataProtectionOfficer}
          onChange={patchRepresentativeRequested}
        />
      </ExpansionPanel>
    </SC.Representatives>
  );
};

const mapStateToProps = (state: any) => {
  return {
    representatives: state.RepresentativesReducer.get('representatives').toJS()
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(Representatives));
