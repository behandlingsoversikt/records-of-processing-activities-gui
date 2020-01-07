import styled from 'styled-components';
import Container from '@material-ui/core/Container';

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

const RecordReportList = styled.div`
  margin-top: 2em;
`;

export default { RecordReportPage, RecordReportList };
