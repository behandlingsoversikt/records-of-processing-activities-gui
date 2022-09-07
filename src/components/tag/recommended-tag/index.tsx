import React from 'react';
import { localization } from '../../../utils/language/localization';
import SC from './styled';

const RecommendedTag = () => (
  <SC.RecommendedTag text={localization.dcatKeywords.recommended} />
);

export default RecommendedTag;
