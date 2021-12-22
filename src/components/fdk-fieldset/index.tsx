import React, { memo, PropsWithChildren, useState } from 'react';

import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

import SC from './styled';
import { convertToSanitizedHtml } from '../../lib/markdown-converter';

interface Props {
  isReadOnly?: boolean;
  required?: boolean;
  boxed?: boolean;
  title: string;
  subtitle: string;
  description?: string;
}

const Fieldset = ({
  isReadOnly,
  required,
  boxed,
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
      <SC.Legend boxed={boxed}>
        <SC.Inline>
          <SC.Title>{title}</SC.Title>
          {required && !isReadOnly && <SC.RequiredLabel text='Obligatorisk' />}
        </SC.Inline>
        {!isReadOnly && (
          <SC.Inline justifyContent='space-between'>
            <SC.Subtitle>{subtitle}</SC.Subtitle>
            {description && (
              <SC.Expand title='Toggle beskrivelse' onClick={toggleExpansion}>
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </SC.Expand>
            )}
          </SC.Inline>
        )}
        {isExpanded && description && !isReadOnly && (
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
