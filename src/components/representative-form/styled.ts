import styled from 'styled-components';
import { Form } from 'formik';

import RadioBase from '../radio';

const RepresentativeForm = styled(Form)``;

const Radio = styled(RadioBase)`
  margin-bottom: 30px;
`;

const LegalNoticeEU = styled.div`
  line-height: 24px;
  margin-bottom: 30px;
  text-align: justify;
`;

const InlineFields = styled.div`
  display: flex;

  & > div:nth-of-type(n + 2) {
    margin-left: 20px;
  }

  & > div:first-of-type {
    flex: 0 0 60%;
  }
`;

export default {
  RepresentativeForm,
  Radio,
  LegalNoticeEU,
  InlineFields
};
