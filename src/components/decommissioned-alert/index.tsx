import React, { memo } from 'react';

import Alert, { Severity } from '@fellesdatakatalog/alert';
import SC from './styled';

const DecommissionedAlert = (): JSX.Element => (
  <SC.DecommissionedAlert>
    <Alert severity={Severity.WARNING}>
      Digitaliseringsdirektoratet (Digdir) har besluttet å legge ned
      behandlingsoversikt, det ble gjennomført 31.03.2025.
    </Alert>
  </SC.DecommissionedAlert>
);

export default memo(DecommissionedAlert);
