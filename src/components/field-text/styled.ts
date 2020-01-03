import styled, { css } from 'styled-components';
import { Field as FormikField } from 'formik';

const TextField = styled(FormikField)<{ error?: boolean }>`
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.fdk.colors.neutrals.lightblue};
  color: ${({ theme }) => theme.fdk.colors.text.default};

  &:not(:disabled):focus {
    box-shadow: 0 0 0 0.1rem rgba(38, 128, 179, 0.5);
  }
`;

const Label = styled.label`
  font-weight: bold;
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
      & ${TextField} {
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

export default { Field, TextField, Label, HelperText };
