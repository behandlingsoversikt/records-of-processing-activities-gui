import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import Common from '../common/styled';

import FdkRegistrationLogo from '../../images/fdk-registration-logo.svg';
import FdkRegistrationDemoLogo from '../../images/fdk-registration-demo-logo.svg';

const FdkLogo = location.host.includes('demo')
  ? FdkRegistrationDemoLogo
  : FdkRegistrationLogo;

const Header = styled.header`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 74px;
  width: 100%;
  padding: 10px 0;
  background: white;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 0 10px -5px #ccc;
  z-index: 9002;
  @media print {
    border: none;
    box-shadow: none;
    margin-bottom: 100px;
    position: relative;
  }
`;

const LogoLink = styled.a`
  height: 100%;
`;

const Container = styled(Common.Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(FdkLogo)`
  height: 100%;
`;

const UserAvatar = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    fill: #0069a5;
  }

  @media print {
    display: none !important;
  }
`;

const UserName = styled.span`
  margin-left: 5px;
  text-transform: capitalize;
  white-space: nowrap;
`;

const LogoutButton = styled(Button)`
  margin-left: 10px !important;
  white-space: nowrap;

  & span {
    font-size: 1.4rem;
  }
`;

export default {
  Header,
  Container,
  LogoLink,
  Logo,
  UserAvatar,
  UserName,
  LogoutButton
};
