import React, { memo, PropsWithChildren, useState } from 'react';

import SC from './styled';

interface Props {
  title: string;
  subtitle?: string;
  required?: boolean;
}

const ExpansionPanel = ({
  title = '',
  subtitle = '',
  required = false,
  children,
  ...props
}: PropsWithChildren<Props>): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => setIsExpanded(!isExpanded);

  return (
    <SC.ExpansionPanel {...props} isExpanded={isExpanded}>
      <SC.Head onClick={toggleExpansion}>
        <SC.Title>{title}</SC.Title>
        {required && <SC.RequiredLabel>Obligatorisk</SC.RequiredLabel>}
        {!isExpanded && subtitle && <SC.Subtitle>{subtitle}</SC.Subtitle>}
      </SC.Head>
      {isExpanded && <SC.Body>{children}</SC.Body>}
    </SC.ExpansionPanel>
  );
};

export default memo(ExpansionPanel);
