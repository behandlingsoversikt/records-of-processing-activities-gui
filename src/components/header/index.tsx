import React, { memo } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { withAuth } from '../../providers/auth';

import SC from './styled';
import { Auth } from '../../lib/auth/auth';

interface Props {
  authService: Auth;
}

const Header = ({ authService }: Props): JSX.Element => {
  const userName = authService.getUser()?.name;
  const logOutAndRedirect = () => authService.logout();

  return (
    <SC.Header>
      <SC.Container>
        <SC.LogoLink href='/'>
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
