import React, {
  memo,
  PropsWithChildren,
  useState,
  useEffect,
  HTMLAttributes
} from 'react';

import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

import SC from './styled';

interface Props extends HTMLAttributes<any> {
  title: string;
  subtitle?: string;
  required?: boolean;
  isExpanded?: boolean;
}

const ExpansionPanel = ({
  title = '',
  subtitle = '',
  required = false,
  isExpanded: isExpandedProp = false,
  children,
  ...props
}: PropsWithChildren<Props>): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(isExpandedProp);
  const toggleExpansion = () => setIsExpanded(!isExpanded);

  useEffect(() => setIsExpanded(isExpandedProp), [isExpandedProp]);

  return (
    <SC.ExpansionPanel {...props} isExpanded={isExpanded}>
      <SC.Head onClick={toggleExpansion}>
        <SC.TitleWrapper>
          <SC.Description>
            <SC.Title>{title}</SC.Title>
            {required && <SC.RequiredLabel text='Obligatorisk' />}
          </SC.Description>
          {isExpanded ? (
            <ExpandLess fontSize='large' />
          ) : (
            <ExpandMore fontSize='large' />
          )}
        </SC.TitleWrapper>
        {!isExpanded && subtitle && <SC.Subtitle>{subtitle}</SC.Subtitle>}
      </SC.Head>
      {isExpanded && <SC.Body>{children}</SC.Body>}
    </SC.ExpansionPanel>
  );
};

export default memo(ExpansionPanel);
