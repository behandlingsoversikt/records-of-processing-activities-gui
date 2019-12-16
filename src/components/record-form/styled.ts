import styled from 'styled-components';
import { Form } from 'formik';

import ExpansionPanel from '../expansion-panel';
import BaseFieldSet from '../fdk-fieldset';

const RecordForm = styled(Form)``;

const RecordFormSection = styled(ExpansionPanel)`
  &:nth-of-type(n + 2) {
    margin-top: 20px;
  }
`;

const Fieldset = styled(BaseFieldSet)`
  &:nth-of-type(n + 2) {
    margin-top: 50px;
  }
`;

const InlineFields = styled.div`
  display: flex;

  & > div:nth-of-type(n + 2) {
    margin-left: 20px;
  }

  & > div:first-of-type {
    flex: 0 0 60%;
  }

  & > div:last-of-type {
    flex: 0 0 calc(40% - 20px);
  }
`;

export default { RecordForm, RecordFormSection, Fieldset, InlineFields };
