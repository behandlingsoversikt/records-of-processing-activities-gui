import React, {
  memo,
  PropsWithChildren,
  ChangeEvent,
  KeyboardEvent,
  useState
} from 'react';

import SC from './styled';

import RemoveIcon from '../../images/icon-remove.svg';

interface Props {
  id?: string;
  required?: boolean;
  placeholder?: string;
  labelText?: string;
  value?: string[];
  error?: any;
  helperText?: any;
  name: string;
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
}

const TextTagsField = ({
  id,
  name,
  value,
  error,
  helperText,
  placeholder,
  labelText,
  onAddTag,
  onRemoveTag
}: PropsWithChildren<Props>) => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);
  const handleKeyPress = (e: KeyboardEvent) => {
    if (
      inputValue &&
      inputValue.trim() &&
      (e.keyCode === 9 || e.keyCode === 13 || e.keyCode === 32)
    ) {
      e.preventDefault();
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  };
  const handleBlur = () => {
    if (inputValue && inputValue.trim()) {
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  };
  return (
    <SC.Field error={error}>
      {labelText && <SC.Label htmlFor={name}>{labelText}</SC.Label>}
      <SC.TagsWithInput>
        {value && value.length > 0 && (
          <SC.Tags>
            {value.map((tag, index) => (
              <SC.Tag key={`${tag}-${index}`}>
                <span>{tag}</span>
                <RemoveIcon onClick={() => onRemoveTag(index)} />
              </SC.Tag>
            ))}
          </SC.Tags>
        )}
        <SC.TextTagsField
          id={id}
          placeholder={placeholder || labelText}
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
        />
      </SC.TagsWithInput>
      {helperText && <SC.HelperText>{helperText}</SC.HelperText>}
    </SC.Field>
  );
};

export default memo(TextTagsField);
