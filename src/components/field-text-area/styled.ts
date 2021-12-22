import styled, { css } from 'styled-components';
import { Field as FormikField } from 'formik';

const TextAreaField = styled(FormikField)<{ error?: boolean }>`
  font-weight: 400;
  width: 100%;
  min-height: 72px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.fdk.colors.neutrals.lightblue};
  color: ${({ theme }) => theme.fdk.colors.text.default};
  resize: vertical;

  &:not(:disabled):focus {
    box-shadow: 0 0 0 0.1rem rgba(38, 128, 179, 0.5);
  }
`;

const ReadOnlyLabel = styled.span`
  min-height: 18.4px;
  text-align: justify;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 5px;
`;

const HelperText = styled.p`
  margin-top: 5px;
  margin-left: 8px;
  font-size: 1.2rem;
`;

const Field = styled.div<{ error?: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ error }) =>
    error &&
    css`
      & ${TextAreaField} {
        border-color: red;

        &:not(:disabled):focus {
          box-shadow: 0 0 0 0.1rem rgba(255, 0, 0, 0.5);
        }
      }

      & ${HelperText} {
        color: red;
      }
    `}
`;

export default {
  Field,
  TextAreaField,
  Label,
  HelperText,
  ReadOnlyLabel
};
