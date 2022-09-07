import React, { FC } from 'react';

import { localization } from '../../../utils/language/localization';
import Icon from '../../icon';
import SC from './styled';

const PublishedTag: FC = () => (
  <SC.PublishedTag
    text={localization.tagPublished}
    icon={<Icon name='globeGridStroke' />}
  />
);

export default PublishedTag;
