import styled, { css } from 'styled-components';
import { Field } from 'formik';

const Select = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  max-height: 59px;
  min-width: 200px;
  background: none;

  &,
  & * {
    cursor: pointer;
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const SelectButton = styled.button`
  position: relative;
  width: 100%;
  min-height: 36px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.fdk.colors.neutrals.lightblue};
  color: ${({ theme }) => theme.fdk.colors.text.default};
  background: none;
  text-align: left;

  & > span {
    display: block;
    max-width: calc(100% - 20px);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &:not(:disabled):focus {
    box-shadow: 0 0 0 0.1rem rgba(38, 128, 179, 0.5);
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid ${({ theme }) => theme.fdk.colors.text.link};
  }
`;

const OverflowControl = styled.div<{ visible: boolean }>`
  position: relative;
  margin-top: 1px;
  border-radius: 5px;
  box-shadow: 0 0 3px 1px #ddd;
  background: white;
  z-index: 2;

  ${({ visible }) =>
    !visible &&
    css`
      visibility: hidden;
      opacity: 0;
    `}
`;

const Dropdown = styled.ul`
  max-height: 400px;
  width: 100%;
  overflow-y: auto;
  outline: none;
`;

const NoOptionLabel = styled.li`
  padding: 8px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.fdk.colors.neutrals.default};
  cursor: auto;
  user-select: none;
`;

const DropdownItem = styled.li<{ selected: boolean }>`
  padding: 12px 8px;
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.fdk.colors.neutrals.lightest};
  }

  ${({ selected }) =>
    selected &&
    css`
      background: ${({ theme }) => theme.fdk.colors.neutrals.lightest};
    `}
`;

const HiddenSelect = styled(Field)<any>`
  display: none;
`;

export default {
  Select,
  Label,
  SelectButton,
  OverflowControl,
  Dropdown,
  NoOptionLabel,
  DropdownItem,
  HiddenSelect
};
