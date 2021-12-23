import React, { memo, FC } from 'react';
import { compose } from 'redux';
import InternalHeader from '@fellesdatakatalog/internal-header';
import Link from '@fellesdatakatalog/link';

import env from '../../env';

import { withAuth, Props as AuthorizationProps } from '../../providers/auth';

import SC from './styled';

interface Props extends AuthorizationProps {}

const {
  ADMIN_GUI_HOST,
  FDK_REGISTRATION_BASE_URI,
  SEARCH_HOST,
  USE_DEMO_LOGO
} = env;

const Header: FC<Props> = ({ authService }) => {
  const userName = authService.getUserProfile()?.name;
  const logOutAndRedirect = () => authService.signOut();

  return (
    <>
      <SC.SkipLinkWrap>
        <SC.SkipLink href={`${location.pathname}#content`} tabIndex={0}>
          Hopp til hovedinnhold
        </SC.SkipLink>
      </SC.SkipLinkWrap>
      <InternalHeader
        homeUrl={FDK_REGISTRATION_BASE_URI}
        username={userName}
        onLogout={logOutAndRedirect}
        useDemoLogo={USE_DEMO_LOGO}
      >
        <Link href={`${SEARCH_HOST}/guidance`}>Registrere data</Link>
        <Link href={ADMIN_GUI_HOST}>Høste data</Link>
        <Link href={SEARCH_HOST} external>
          Søk i Felles datakatalog
        </Link>
      </InternalHeader>
    </>
  );
};

export default compose<FC>(memo, withAuth)(Header);
