import React, {
  memo,
  PropsWithChildren,
  HTMLAttributes,
  useState,
  useEffect
} from 'react';

import SC from './styled';
import { ExpansionPanelBody, ExpansionPanelHead } from '../expansion-panel';
import MandatoryTag from '../tag/mandatory-tag';
import RecommendedTag from '../tag/recommended-tag';
import { localization } from '../../utils/language/localization';

interface Props extends HTMLAttributes<any> {
  headingTitle: string;
  subtitle?: string;
  tag?: 'mandatory' | 'recommended';
  hasError?: boolean;
  isExpanded?: boolean;
}

const FormPanel = ({
  headingTitle = '',
  subtitle = '',
  tag,
  hasError,
  isExpanded: isExpandedProp = false,
  onClick,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedProp);
  const toggleExpansion = () => setIsExpanded(!isExpanded);

  useEffect(() => setIsExpanded(isExpandedProp), [isExpandedProp]);

  const showAlertHeader = () => Boolean(hasError && !isExpanded);

  const AlertIcon = () =>
    hasError ? <SC.AlertIcon name='triangleExclamationPointStroke' /> : <></>;

  const Tags = () => {
    switch (tag) {
      case 'mandatory':
        return (
          <SC.MandatoryTagWrapper>
            <MandatoryTag />
          </SC.MandatoryTagWrapper>
        );
      case 'recommended':
        return (
          <SC.RecommendedTagWrapper>
            <RecommendedTag />
          </SC.RecommendedTagWrapper>
        );
      default:
        return <></>;
    }
  };

  const Subtitle = () =>
    isExpanded ? (
      <></>
    ) : (
      <SC.Subtitle>
        {hasError ? localization.validation.requiredFieldsError : subtitle}
      </SC.Subtitle>
    );

  const expansionIndicator = {
    expand: <SC.IndicatorIcon name='chevronDownStroke' />,
    collapse: <SC.IndicatorIcon name='chevronUpStroke' />
  };

  return (
    <SC.FormPanel
      {...props}
      expansionIndicator={expansionIndicator}
      onClick={onClick ?? toggleExpansion}
      isExpanded={isExpanded}
      $showAlert={showAlertHeader()}
    >
      <ExpansionPanelHead>
        <SC.Heading>
          <SC.TitleContainer
            title={hasError ? localization.validation.requiredFieldsError : ''}
          >
            <SC.Title>{headingTitle}</SC.Title>
            <Tags />
            <AlertIcon />
          </SC.TitleContainer>
        </SC.Heading>
        <Subtitle />
      </ExpansionPanelHead>
      <ExpansionPanelBody>{children}</ExpansionPanelBody>
    </SC.FormPanel>
  );
};

export default memo(FormPanel);
