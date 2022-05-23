import styled from 'styled-components';
import Container from '@material-ui/core/Container';

import RootBase from '../root';

import FdkRegistrationLogo from '../../images/fdk-registration-logo.svg';
import FdkRegistrationDemoLogo from '../../images/fdk-registration-demo-logo.svg';

const FdkLogo = location.host.includes('demo')
  ? FdkRegistrationDemoLogo
  : FdkRegistrationLogo;

const RecordReportPage = styled(Container)`
  font-size: 2rem;
  line-height: 1.5em;

  @media print {
    color: 000;
    header,
    footer {
      display: none !important;
    }
  }
`;

const TitleWrapper = styled.div`
  margin: 60px 0 100px 0%;
`;

const Logo = styled(FdkLogo)`
  width: 160px;
`;

const RecordReportTitle = styled.h1`
  color: ${({ theme }) => theme.fdk.colors.text.default};
  font-size: 4.7rem;
  line-height: 5.2rem;
  font-weight: 600;

  & > div {
    color: ${({ theme }) => theme.fdk.colors.text.subtitle};
  }
`;

const RecordReportSubTitle = styled.h2`
  display: inline-flex;
  align-items: center;

  margin-top: 1em;
  color: ${({ theme }) => theme.fdk.colors.text.default};
  font-size: 2.5rem;

  & > svg {
    width: 2em;
    margin-right: 0.5em;
    & > path {
      fill: ${({ theme }) => theme.fdk.colors.text.subtitle};
    }
  }
`;

const RecordReportList = styled.div`
  margin-top: 2em;
  word-break: break-word;
`;

const Root = styled(RootBase)`
  background: white;
`;

export default {
  RecordReportPage,
  RecordReportList,
  RecordReportTitle,
  RecordReportSubTitle,
  TitleWrapper,
  Logo,
  Root
};
