import React, {
  FocusEvent,
  memo,
  PropsWithChildren,
  ChangeEvent,
  KeyboardEvent,
  useState
} from 'react';

import SC from './styled';

import RemoveIcon from '../../images/icon-remove.svg';

import { KeyCode } from '../../types/enums';

interface Props {
  id?: string;
  required?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
  labelText?: string;
  value?: string[];
  error?: any;
  helperText?: any;
  name: string;
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
  onBlur?: (event: FocusEvent<any>) => void;
}

const TextTagsField = ({
  id,
  name,
  value,
  error,
  helperText,
  placeholder,
  labelText,
  isReadOnly,
  onAddTag,
  onRemoveTag,
  onBlur
}: PropsWithChildren<Props>) => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);
  const handleKeyPress = (e: KeyboardEvent) => {
    if (
      inputValue?.trim() &&
      (e.keyCode === KeyCode.TAB || e.keyCode === KeyCode.ENTER)
    ) {
      e.preventDefault();
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  };
  const handleBlur = (e: FocusEvent<any>) => {
    if (onBlur) {
      onBlur(e);
    }
    if (inputValue && inputValue.trim()) {
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  };
  return (
    <SC.Field error={error}>
      {labelText && <SC.Label htmlFor={name}>{labelText}</SC.Label>}
      {!isReadOnly && (
        <SC.TextTagsField
          id={id}
          placeholder={placeholder || labelText}
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
        />
      )}
      {helperText && <SC.HelperText error={error}>{helperText}</SC.HelperText>}
      {value && value.length > 0 && (
        <SC.Tags>
          {value.map((tag, index) => (
            <SC.Tag key={`${tag}-${index}`} isReadOnly={isReadOnly}>
              <span>{tag}</span>
              {!isReadOnly && <RemoveIcon onClick={() => onRemoveTag(index)} />}
            </SC.Tag>
          ))}
        </SC.Tags>
      )}
    </SC.Field>
  );
};

export default memo(TextTagsField);
