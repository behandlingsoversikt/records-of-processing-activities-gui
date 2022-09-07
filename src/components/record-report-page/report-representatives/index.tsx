import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';

import SC from './styled';
import { RepresentativesInterface } from '../../../types';
import { RepresentativeItem } from './representative-item';
import { localization } from '../../../utils/language/localization';

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
  }: Props) => {
    const hasEURepresentative =
      dataControllerRepresentativeInEU?.name ||
      dataControllerRepresentativeInEU?.address ||
      dataControllerRepresentativeInEU?.email ||
      dataControllerRepresentativeInEU?.phone;

    return (
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

                {dataControllerRepresentativeInEU && hasEURepresentative && (
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
    );
  }
);
