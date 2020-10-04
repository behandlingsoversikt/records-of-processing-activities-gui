import React, { memo, ChangeEvent, useState, useRef, useEffect } from 'react';

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
  isReadOnly?: boolean;
  onChange?: (event?: ChangeEvent<any>) => void;
}

const Select = ({
  name,
  options,
  labelText,
  noOptionLabel,
  value,
  isReadOnly,
  onChange
}: Props): JSX.Element => {
  const currentOption = options.find(
    ({ value: optionValue }) => `${value}` === `${optionValue}`
  );
  const selectElement = useRef<HTMLDivElement>(null);
  const inputElement = useRef<HTMLSelectElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectValue, setSelectValue] = useState(value);
  const [selectLabel, setSelectLabel] = useState(
    currentOption ? currentOption.label : noOptionLabel || ''
  );
  const toggleExpandedState = () => setIsExpanded(!isExpanded);

  const handleClickOutside = (e: MouseEvent) => {
    if (!selectElement?.current?.contains(e.target as any)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <SC.Select ref={selectElement} onClick={toggleExpandedState}>
      {labelText && <SC.Label htmlFor={name}>{labelText}</SC.Label>}
      {!isReadOnly ? (
        <>
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
        </>
      ) : (
        <span>{currentOption?.label ?? 'Ikke valgt'}</span>
      )}
    </SC.Select>
  );
};

export default memo(Select);
