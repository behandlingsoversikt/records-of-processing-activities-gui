import styled, { css } from 'styled-components';
import { Field as FormikField } from 'formik';
import { Colour, theme } from '@fellesdatakatalog/theme';

const TextField = styled(FormikField)<{ error?: boolean }>`
  font-weight: 400;
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme: t }) => t.fdk.colors.neutrals.lightblue};
  color: ${({ theme: t }) => t.fdk.colors.text.default};

  &:not(:disabled):focus {
    box-shadow: 0 0 0 0.1rem rgba(38, 128, 179, 0.5);
  }
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

const ReadOnlyLabel = styled.span`
  min-height: 18.4px;
  text-align: justify;
`;

const Required = styled.div`
  background-color: #fff2d8;
  border-radius: 20px;
  color: ${theme.colour(Colour.NEUTRAL, 'N70')};
  display: inline-flex;
  font-size: ${theme.fontSize('FS14')};
  font-weight: ${theme.fontWeight('FW400')};
  margin-bottom: ${theme.spacing('S6')};
  margin-left: ${theme.spacing('S6')};
  padding: 0 ${theme.spacing('S6')};
`;

export default {
  Field,
  TextField,
  Label,
  HelperText,
  ReadOnlyLabel,
  Required
};
