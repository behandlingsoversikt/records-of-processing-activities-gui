import React, { memo } from 'react';
import { Breadcrumbs, Link } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { withRouter } from 'react-router-dom';

import SC from './styled';

const BreadcrumbsBar = (): JSX.Element => (
  <SC.BreadcrumbsBar>
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='breadcrumb'
    >
      <Link href='/'>Alle kataloger</Link>
      <span>Behandlingsaktiviteter</span>
    </Breadcrumbs>
  </SC.BreadcrumbsBar>
);

export default memo(withRouter(BreadcrumbsBar));
