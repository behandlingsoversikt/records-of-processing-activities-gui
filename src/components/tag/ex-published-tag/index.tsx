import React, { FC } from 'react';

import { localization } from '../../../utils/language/localization';
import Icon from '../../icon';
import SC from './styled';

const ExPublishedTag: FC = () => (
  <SC.ExPublishedTag
    text={localization.tagExPublished}
    icon={<Icon name='folderClosedStroke' />}
  />
);

export default ExPublishedTag;
