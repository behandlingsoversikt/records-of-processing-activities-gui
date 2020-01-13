import React, { memo, PropsWithChildren, useState } from 'react';

import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

import SC from './styled';
import { convertToSanitizedHtml } from '../../lib/markdown-converter';

interface Props {
  required?: boolean;
  title: string;
  subtitle: string;
  description?: string;
}

const Fieldset = ({
  required,
  title,
  subtitle,
  description,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => setIsExpanded(!isExpanded);
  return (
    <SC.Fieldset {...props}>
      <SC.Legend>
        <SC.Inline>
          <SC.Title>{title}</SC.Title>
          {required && <SC.RequiredLabel text='Obligatorisk' />}
        </SC.Inline>
        <SC.Inline justifyContent='space-between'>
          <SC.Subtitle>{subtitle}</SC.Subtitle>
          {description && (
            <SC.Expand onClick={toggleExpansion}>
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </SC.Expand>
          )}
        </SC.Inline>
        {isExpanded && description && (
          <SC.Description
            dangerouslySetInnerHTML={{
              __html: convertToSanitizedHtml(description)
            }}
          />
        )}
      </SC.Legend>
      {children}
    </SC.Fieldset>
  );
};

export default memo(Fieldset);
