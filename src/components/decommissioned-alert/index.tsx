import React, { memo } from 'react';

import Alert, { Severity } from '@fellesdatakatalog/alert';
import Link from '@fellesdatakatalog/link';
import SC from './styled';

const DecommissionedAlert = (): JSX.Element => (
  <SC.DecommissionedAlert>
    <Alert severity={Severity.WARNING}>
      <span>Behandlingsoversikt ble lagt ned 31.03.2025. </span>
      <Link href='https://data.norge.no/nb/contact'>
        Ta kontakt om du har spørsmål angående nedleggelsen.
      </Link>
    </Alert>
  </SC.DecommissionedAlert>
);

export default memo(DecommissionedAlert);
