import React, { FC } from 'react';

import { localization } from '../../../utils/language/localization';
import Icon from '../../icon';
import SC from './styled';

const DraftTag: FC = () => (
  <SC.DraftTag
    text={localization.tagDraft}
    icon={<Icon name='pencilStroke' />}
  />
);

export default DraftTag;
