import React, { memo } from 'react';

import SC from './styled';

import Anchor from '../anchor';

const Footer = (): JSX.Element => (
  <SC.Footer>
    <div>
      <Anchor
        href='https://www.brreg.no/personvernerklaering'
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
        href='mailto:fellesdatakatalog@brreg.no'
        text='Kontakt: fellesdatakatalog@brreg.no'
      />
    </div>
  </SC.Footer>
);

export default memo(Footer);
