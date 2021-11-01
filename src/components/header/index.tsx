import React, { memo, FC } from 'react';
import { compose } from 'redux';
import InternalHeader from '@fellesdatakatalog/internal-header';
import Link from '@fellesdatakatalog/link';

import env from '../../env';

import { withAuth, Props as AuthorizationProps } from '../../providers/auth';

interface Props extends AuthorizationProps {}

const { ADMIN_GUI_HOST, FDK_REGISTRATION_BASE_URI, SEARCH_HOST } = env;

const Header: FC<Props> = ({ authService }) => {
  const userName = authService.getUserProfile()?.name;
  const logOutAndRedirect = () => authService.signOut();

  return (
    <InternalHeader
      homeUrl={FDK_REGISTRATION_BASE_URI}
      username={userName}
      onLogout={logOutAndRedirect}
    >
      <Link href={`${SEARCH_HOST}/guidance`}>Registrere data</Link>
      <Link href={ADMIN_GUI_HOST}>Høste data</Link>
      <Link href={SEARCH_HOST} external>
        Søk i Felles datakatalog
      </Link>
    </InternalHeader>
  );
};

export default compose<FC>(memo, withAuth)(Header);
