import styled from 'styled-components';
import { Form } from 'formik';

const RepresentativeForm = styled(Form)``;

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
  InlineFields
};
