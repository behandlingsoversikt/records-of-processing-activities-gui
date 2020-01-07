import styled, { css } from 'styled-components';
import { Form } from 'formik';

import ExpansionPanel from '../expansion-panel';
import BaseFieldSet from '../fdk-fieldset';

const RecordForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ExpandAllButton = styled.button`
  display: flex;
  align-items: center;
  align-self: flex-end;
  margin-bottom: 12px;

  color: ${({ theme }) => theme.fdk.colors.text.link};

  &:hover {
    text-decoration: underline;
  }

  & > svg {
    height: 16px;
    width: 16px;
    margin-left: 5px;
  }
`;

const RecordFormSection = styled(ExpansionPanel)`
  width: 100%;

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

const AddButton = styled.button<{ addMargin?: boolean }>`
  display: flex;
  align-items: center;
  padding: 5px 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.fdk.colors.text.link};
  cursor: pointer;

  & > svg {
    height: 16px;
    width: 16px;
    margin-right: 6px;
  }

  ${({ addMargin }) =>
    addMargin &&
    css`
      margin-top: 18px;
    `}
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: auto;
  border: none;
  background: none;
  color: ${({ theme }) => theme.fdk.colors.text.danger};
  cursor: pointer;

  & > svg {
    height: 16px;
    width: 16px;
    margin-right: 6px;
  }
`;

export default {
  RecordForm,
  ExpandAllButton,
  RecordFormSection,
  Fieldset,
  InlineFields,
  AddButton,
  RemoveButton
};
