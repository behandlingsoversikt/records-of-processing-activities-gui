import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';
import FormPanelBase from '../form-panel';

const Representatives = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
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

const FormPanel = styled(FormPanelBase)`
  flex-basis: 49%;
  width: auto;

  &:nth-of-type(n + 2) {
    margin-top: 0;
  }

  margin-bottom: ${theme.spacing('S24')};
`;

export default {
  Representatives,
  InlineFields,
  FormPanel
};
