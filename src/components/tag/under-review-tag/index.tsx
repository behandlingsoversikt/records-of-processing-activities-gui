import React, { FC } from 'react';

import { localization } from '../../../utils/language/localization';
import SC from './styled';
import Icon from '../../icon';

const UnderReviewTag: FC = () => (
  <SC.UnderReviewTag
    text={localization.tagUnderReview}
    icon={<Icon name='documentClockStroke' />}
  />
);

export default UnderReviewTag;
