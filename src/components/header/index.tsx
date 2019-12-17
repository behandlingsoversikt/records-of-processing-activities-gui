import React, { memo } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { withAuth } from '../../providers/auth';
import { AuthServiceInteface, User } from '../../services/auth';

import SC from './styled';

interface Props {
  authService: AuthServiceInteface;
}

const Header = ({ authService }: Props): JSX.Element => {
  const user: User | null = authService.getUser();
  const logOutAndRedirect = () => authService.logOut(`${location.origin}/auth`);

  return (
    <SC.Header>
      <SC.Container>
        <SC.LogoLink href='/'>
          <SC.Logo />
        </SC.LogoLink>
        {user && (
          <SC.UserAvatar>
            <AccountCircleIcon />
            <SC.UserName>{user.profile.name}</SC.UserName>
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
