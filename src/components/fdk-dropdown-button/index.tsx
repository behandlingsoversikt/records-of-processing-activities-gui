import React, {
  memo,
  useState,
  ButtonHTMLAttributes,
  ComponentType
} from 'react';

import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';

import SC from './styled';

type SubButton = {
  name: string;
  href?: string;
  external?: boolean;
  onClick?: any;
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'primary' | 'secondary' | 'default';
  icon?: ComponentType;
  subButtons: SubButton[];
}

const FDKDropdownButton = ({
  text,
  variant,
  icon: Icon,
  subButtons,
  ...rest
}: Props): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => setIsExpanded(!isExpanded);

  return (
    <SC.FDKDropdownButton
      variant={variant}
      expanded={isExpanded}
      onClick={toggleExpansion}
      {...rest}
    >
      {Icon && <Icon />}
      {text}
      {isExpanded ? <ArrowDropUp /> : <ArrowDropDown />}
      {isExpanded && (
        <ul>
          {subButtons?.map(({ name, href, external, onClick }, index) => (
            <li key={index}>
              {href ? (
                <a
                  rel='noreferrer'
                  href={href}
                  target={external ? '_blank' : ''}
                >
                  {name}
                </a>
              ) : (
                <span
                  role='button'
                  tabIndex={0}
                  onClick={onClick}
                  onKeyDown={onClick}
                >
                  {name}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </SC.FDKDropdownButton>
  );
};
export default memo(FDKDropdownButton);
