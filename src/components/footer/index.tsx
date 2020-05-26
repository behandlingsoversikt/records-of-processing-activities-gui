import React, { memo } from 'react';

import SC from './styled';

import Anchor from '../anchor';

const Footer = (): JSX.Element => (
  <SC.Footer>
    <div>
      <Anchor
        href='https://www.digdir.no/om-oss/personvernerklaering/706'
        text='Informasjonskapsler og personvern'
        external
      />
    </div>
    <div>Digitaliseringsdirektoratet forvalter Felles Datakatalog.</div>
    <div>
      <Anchor
        href='mailto:fellesdatakatalog@digdir.no'
        text='Kontakt: fellesdatakatalog@digdir.no'
      />
    </div>
  </SC.Footer>
);

export default memo(Footer);
