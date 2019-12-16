/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo } from 'react';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import SC from './styled';

interface Props extends RouteComponentProps {}

const BreadcrumbsBar = (_props: Props): JSX.Element => (
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

export default memo(withRouter(BreadcrumbsBar));
