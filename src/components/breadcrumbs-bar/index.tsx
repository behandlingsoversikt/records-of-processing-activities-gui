import React, { memo } from 'react';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import SC from './styled';

const BreadcrumbsBar = (): JSX.Element => (
  <SC.BreadcrumbsBar>
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='breadcrumb'
    >
      <Link href='/'>Alle kataloger</Link>
      <Typography>Behandlingsaktiviteter</Typography>
    </Breadcrumbs>
  </SC.BreadcrumbsBar>
);

export default memo(BreadcrumbsBar);
