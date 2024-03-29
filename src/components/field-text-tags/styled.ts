import styled, { css } from 'styled-components';
import { Field as FormikField } from 'formik';

const Field = styled.div<{ error?: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ error }) =>
    error &&
    css`
      & input {
        border-color: red;

        &:not(:disabled):focus {
          box-shadow: 0 0 0 0.1rem rgba(255, 0, 0, 0.5);
        }
      }
    `}
`;

const Label = styled.label`
  font-weight: 500;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;

const VisuallyHidden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const TextTagsField = styled(FormikField)`
  font-weight: 400;
  display: block;
  flex: 1;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.fdk.colors.neutrals.lightblue};
  border-radius: 5px;
  background: none;
  color: ${({ theme }) => theme.fdk.colors.text.default};

  &:not(:disabled):focus {
    box-shadow: 0 0 0 0.1rem rgba(38, 128, 179, 0.5);
  }
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

const Tag = styled.span<{ isReadOnly?: boolean }>`
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

  ${({ isReadOnly }) =>
    isReadOnly &&
    css`
      padding: 4px 12px;
      font-size: 16px;
    `}
`;

export default {
  Field,
  Label,
  VisuallyHidden,
  TextTagsField,
  HelperText,
  Tags,
  Tag
};
