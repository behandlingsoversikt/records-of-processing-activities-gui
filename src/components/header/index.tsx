import React, { memo } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import env from '../../env';

import { withAuth } from '../../providers/auth';

import SC from './styled';
import { Auth } from '../../lib/auth/auth';

interface Props {
  authService: Auth;
}

const { FDK_REGISTRATION_BASE_URI } = env;

const Header = ({ authService }: Props): JSX.Element => {
  const userName = authService.getUser()?.name;
  const logOutAndRedirect = () => authService.logout();

  return (
    <SC.Header>
      <SC.Container>
        <SC.LogoLink href={FDK_REGISTRATION_BASE_URI}>
          <SC.Logo />
        </SC.LogoLink>
        {userName && (
          <SC.UserAvatar>
            <AccountCircleIcon />
            <SC.UserName>{userName}</SC.UserName>
            <SC.LogoutButton variant='outlined' onClick={logOutAndRedirect}>
              Log out
            </SC.LogoutButton>
          </SC.UserAvatar>
        )}
      </SC.Container>
    </SC.Header>
  );
};

export default memo(withAuth(Header));
