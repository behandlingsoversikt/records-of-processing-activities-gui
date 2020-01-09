import styled, { css } from 'styled-components';
import { Field as FormikField } from 'formik';

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const TextTagsField = styled(FormikField)<{ error?: boolean }>`
  display: block;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.fdk.colors.neutrals.lightblue};
  border-radius: 5px;
  background: none;
  color: ${({ theme }) => theme.fdk.colors.text.default};

  &:not(:disabled):focus {
    box-shadow: 0 0 0 0.1rem rgba(38, 128, 179, 0.5);
  }

  ${({ error }) =>
    error &&
    css`
      border-color: red;

      &:not(:disabled):focus {
        box-shadow: 0 0 0 0.1rem rgba(255, 0, 0, 0.5);
      }
    `}
`;

const HelperText = styled.p<{ error?: boolean }>`
  margin-top: 5px;
  margin-left: 8px;
  font-size: 1.2rem;

  ${({ error }) =>
    error &&
    css`
      color: red;
    `}
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: -5px;
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-right: 5px;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 1.4rem;
  background: ${({ theme }) => theme.fdk.colors.neutrals.darker};
  color: white;

  & > span {
    max-width: 500px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > svg {
    height: 16px;
    width: 16px;
    margin-left: 5px;
    cursor: pointer;

    & > path {
      fill: white;
    }
  }
`;

export default {
  Field,
  Label,
  TextTagsField,
  HelperText,
  Tags,
  Tag
};
