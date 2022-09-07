/**
 * Check all available icon name and className here: https://github.com/fellesdatakatalog/fdk-kit/tree/develop/packages/icons/src/assets/svg
 */

import { SvgIconTypes } from '@fellesdatakatalog/icons';
import React, { FC } from 'react';
import SC from './styled';

interface Props {
  name: SvgIconTypes;
  className?: string;
}

const Icon: FC<Props> = ({ name, className }) => (
  <SC.Icon className={className} name={name as SvgIconTypes} />
);

export default Icon;
