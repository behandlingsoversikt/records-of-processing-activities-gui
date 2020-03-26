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
    <div>
      Dette er et samarbeidsprosjekt mellom Brønnøysundregistrene, Difi og
      øvrige SKATE-etater.
    </div>
    <div>
      <Anchor
        href='mailto:digdir@fellesdatakatalog.no'
        text='Kontakt: digdir@fellesdatakatalog.no'
      />
    </div>
  </SC.Footer>
);

export default memo(Footer);
