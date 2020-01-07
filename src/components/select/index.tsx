import React, { memo, ChangeEvent, useState, useRef } from 'react';

import SC from './styled';

interface Option {
  label: string;
  value: any;
}

interface Props {
  name: string;
  value?: string;
  options: Option[];
  helperText?: string;
  labelText?: string;
  noOptionLabel?: string;
  onChange?: (event?: ChangeEvent<any>) => void;
}

const Select = ({
  name,
  options,
  labelText,
  noOptionLabel,
  value,
  onChange
}: Props): JSX.Element => {
  const currentOption = options.find(
    ({ value: optionValue }) => `${value}` === `${optionValue}`
  );
  const inputElement = useRef<HTMLSelectElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectValue, setSelectValue] = useState(value);
  const [selectLabel, setSelectLabel] = useState(
    currentOption ? currentOption.label : noOptionLabel || ''
  );
  const toggleExpandedState = () => setIsExpanded(!isExpanded);

  return (
    <SC.Select onClick={toggleExpandedState}>
      {labelText && <SC.Label htmlFor={name}>{labelText}</SC.Label>}
      <SC.SelectButton type='button'>
        <span>{currentOption ? currentOption.label : selectLabel}</span>
      </SC.SelectButton>
      <SC.OverflowControl visible={isExpanded}>
        <SC.Dropdown>
          {noOptionLabel && (
            <SC.NoOptionLabel>{noOptionLabel}</SC.NoOptionLabel>
          )}
          {options.map(({ label, value: optionValue }, index) => (
            <SC.DropdownItem
              id={name}
              key={`${label}-${optionValue}`}
              selected={`${value}` === `${optionValue}`}
              onClick={() => {
                setSelectValue(optionValue);
                setSelectLabel(label);
                setImmediate(() => {
                  if (inputElement && inputElement.current) {
                    inputElement.current.selectedIndex = index;
                    const event = document.createEvent('Event');
                    event.initEvent('input', true, true);
                    inputElement.current.dispatchEvent(event);
                  }
                });
              }}
            >
              {label}
            </SC.DropdownItem>
          ))}
        </SC.Dropdown>
      </SC.OverflowControl>
      <SC.HiddenSelect
        ref={inputElement}
        as='select'
        name={name}
        value={selectValue}
        onInput={onChange}
        onChange={() => {}}
      >
        {options.map(({ label, value: optionValue }) => (
          <option key={`${name}-${optionValue}`} value={optionValue}>
            {label}
          </option>
        ))}
      </SC.HiddenSelect>
    </SC.Select>
  );
};

export default memo(Select);
