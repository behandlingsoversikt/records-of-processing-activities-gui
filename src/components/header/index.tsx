import React, { memo } from 'react';
import InternalHeader from '@fellesdatakatalog/internal-header';
import Link from '@fellesdatakatalog/link';

import env from '../../env';

import { withAuth, Props as AuthorizationProps } from '../../providers/auth';

interface Props extends AuthorizationProps {}

const { ADMIN_GUI_HOST, FDK_REGISTRATION_BASE_URI, SEARCH_HOST } = env;

const Header = ({ authService }: Props): JSX.Element => {
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

export default memo(withAuth(Header));
