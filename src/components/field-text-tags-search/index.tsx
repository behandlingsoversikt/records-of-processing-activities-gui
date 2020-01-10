import React, {
  memo,
  PropsWithChildren,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  HTMLAttributes,
  useState,
  useRef
} from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import SC from './styled';

import RemoveIcon from '../../images/icon-remove.svg';

import { KeyCode } from '../../types/enums';

interface Suggestion {
  label: string;
  value: any;
}

interface Value extends Suggestion {}

interface Props extends HTMLAttributes<any> {
  id?: string;
  required?: boolean;
  placeholder?: string;
  labelText?: string;
  value?: Value[];
  error?: any;
  helperText?: any;
  name: string;
  suggestions: Suggestion[];
  isLoadingSuggestions?: boolean;
  noOptionLabel?: string;
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
}

const TextTagsSearchField = ({
  id,
  name,
  value,
  error,
  helperText,
  placeholder,
  labelText,
  noOptionLabel,
  suggestions,
  isLoadingSuggestions,
  onAddTag,
  onRemoveTag,
  onChange
}: PropsWithChildren<Props>) => {
  const dropdownElement = useRef<HTMLUListElement>(null);

  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const eventValue = e.target.value;
    if (onChange) {
      onChange(e);
    }
    setSelectedItemIndex(null);
    setInputValue(eventValue);
    setIsExpanded(!(!eventValue && isExpanded));
  };

  const addTag = (tag: string) => {
    if (tag?.trim()) {
      onAddTag(tag.trim());
      setInputValue('');
      setIsExpanded(false);
      setSelectedItemIndex(null);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === KeyCode.ARROW_UP) {
      e.preventDefault();
      if (selectedItemIndex !== null && typeof selectedItemIndex === 'number') {
        setSelectedItemIndex(
          selectedItemIndex === 0
            ? suggestions.length - 1
            : selectedItemIndex - 1
        );
      } else {
        setSelectedItemIndex(suggestions.length - 1);
      }
    }
    if (e.keyCode === KeyCode.ARROW_DOWN) {
      e.preventDefault();
      if (selectedItemIndex !== null && typeof selectedItemIndex === 'number') {
        setSelectedItemIndex(
          selectedItemIndex === suggestions.length - 1
            ? 0
            : selectedItemIndex + 1
        );
      } else {
        setSelectedItemIndex(0);
      }
    }
    if (
      (e.keyCode === KeyCode.TAB || e.keyCode === KeyCode.ENTER) &&
      selectedItemIndex !== null &&
      suggestions[selectedItemIndex]
    ) {
      e.preventDefault();
      addTag(suggestions[selectedItemIndex]?.value);
    }
  };

  const handleFocus = () => inputValue && setIsExpanded(true);
  const handleBlur = (e: FocusEvent) => {
    setSelectedItemIndex(null);
    const target = e.relatedTarget ?? document.activeElement;
    if (target && !dropdownElement.current?.contains(target as any)) {
      setIsExpanded(false);
    }
  };

  return (
    <SC.Field>
      {labelText && <SC.Label htmlFor={name}>{labelText}</SC.Label>}
      <SC.FieldWrapper>
        <SC.TextTagsSearchField
          id={id}
          placeholder={placeholder || labelText}
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          error={error}
        />
        {isLoadingSuggestions && (
          <SC.Spinner>
            <CircularProgress />
          </SC.Spinner>
        )}
        <SC.OverflowControl
          visible={
            isLoadingSuggestions ? false : isExpanded && suggestions?.length > 0
          }
        >
          <SC.Dropdown ref={dropdownElement}>
            {noOptionLabel && (
              <SC.NoOptionLabel>{noOptionLabel}</SC.NoOptionLabel>
            )}
            {suggestions.map(({ label, value: suggestionValue }, index) => (
              <SC.DropdownItem
                id={name}
                key={`${label}-${suggestionValue}`}
                selected={selectedItemIndex === index}
                tabIndex={0}
                onClick={() => addTag(suggestionValue)}
              >
                {label}
              </SC.DropdownItem>
            ))}
          </SC.Dropdown>
        </SC.OverflowControl>
      </SC.FieldWrapper>
      {helperText && <SC.HelperText error={error}>{helperText}</SC.HelperText>}
      {value && value.length > 0 && (
        <SC.Tags>
          {value.map(({ label, value: tagValue }, index) => (
            <SC.Tag key={`${tagValue}-${index}`}>
              <span>{label}</span>
              <RemoveIcon onClick={() => onRemoveTag(index)} />
            </SC.Tag>
          ))}
        </SC.Tags>
      )}
    </SC.Field>
  );
};

export default memo(TextTagsSearchField);
