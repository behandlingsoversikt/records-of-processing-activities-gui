import React, { memo } from 'react';

import SC from './styled';

import IconExternal from '../../images/icon-external-link-xs.svg';

interface Props {
  href: string;
  text: string;
  external?: boolean;
}

const Anchor = ({ href, text, external = false }: Props): JSX.Element => (
  <SC.Anchor target={external ? '_blank' : undefined} href={href}>
    {text}
    {external && <IconExternal />}
  </SC.Anchor>
);

export default memo(Anchor);
