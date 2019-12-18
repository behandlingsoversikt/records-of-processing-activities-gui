import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';

import SC from './styled';
import { RepresentativesInterface } from '../../../types';
import { RepresentativeItem } from './representative-item';
import { localization } from '../../../lib/localization';

interface Props {
  representatives: RepresentativesInterface;
}

export const ReportRepresentatives = memo(
  ({
    representatives: {
      dataControllerRepresentative,
      dataControllerRepresentativeInEU,
      dataProtectionOfficer
    }
  }: Props) => (
    <Grid container spacing={3}>
      {(dataControllerRepresentative || dataControllerRepresentativeInEU) && (
        <Grid item md={6}>
          <SC.BoxRegular>
            <>
              {dataControllerRepresentative && (
                <RepresentativeItem
                  label={localization.dataControllerRepresentative}
                  contactDetails={dataControllerRepresentative}
                />
              )}

              {dataControllerRepresentativeInEU && (
                <RepresentativeItem
                  label={localization.dataControllerRepresentativeInEU}
                  contactDetails={dataControllerRepresentativeInEU}
                />
              )}
            </>
          </SC.BoxRegular>
        </Grid>
      )}
      {dataProtectionOfficer && (
        <Grid item md={6}>
          <SC.BoxRegular>
            <RepresentativeItem
              label={localization.dataProtectionOfficer}
              contactDetails={dataProtectionOfficer}
            />
          </SC.BoxRegular>
        </Grid>
      )}
    </Grid>
  )
);
