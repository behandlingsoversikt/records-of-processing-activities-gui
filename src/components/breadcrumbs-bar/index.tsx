import React, { memo } from 'react';
import { Breadcrumbs, Link } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import SC from './styled';

interface Breadcrumb {
  url?: string;
  title?: string;
  current?: boolean;
}

interface Props extends RouteComponentProps {
  breadcrumbs: Breadcrumb[];
}

const BreadcrumbsBar = ({ breadcrumbs }: Props): JSX.Element => (
  <SC.BreadcrumbsBar>
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='breadcrumb'
    >
      {breadcrumbs.map(({ url = location.href, title = '', current = false }) =>
        current ? (
          <span key={`${url}-${title}-${current}`}>{title}</span>
        ) : (
          <Link href={url} key={`${url}-${title}-${current}`}>
            {title}
          </Link>
        )
      )}
    </Breadcrumbs>
  </SC.BreadcrumbsBar>
);

export default memo(withRouter(BreadcrumbsBar));
