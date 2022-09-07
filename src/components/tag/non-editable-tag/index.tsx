import React, { FC } from 'react';

import { localization } from '../../../utils/language/localization';
import SC from './styled';
import Icon from '../../icon';

const NonEditableTag: FC = () => (
  <SC.NonEditableTag
    text={localization.tagNonEditable}
    icon={<Icon name='pencilSlashStroke' />}
  />
);

export default NonEditableTag;
