import styled, { css } from 'styled-components';
import { Field as FormikField } from 'formik';

const TagsWithInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 5px;
  margin-left: 5px;
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
    max-width: 494px;
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

const TextTagsField = styled(FormikField)<{ error?: boolean }>`
  display: block;
  flex-grow: 1;
  padding: 8px;
  border: none;
  background: none;
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
  font-size: 0.8rem;
`;

const Field = styled.div<{ error?: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.fdk.colors.neutrals.lightblue};
  overflow: hidden;

  ${({ error }) =>
    error &&
    css`
      & ${TextTagsField} {
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
  TagsWithInput,
  Tags,
  Tag,
  TextTagsField,
  Label,
  HelperText
};
