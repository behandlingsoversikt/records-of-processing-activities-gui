import React, {
  Children,
  ComponentType,
  FC,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState
} from 'react';

import SC from './styled';
import { isExpansionPanelBody, isExpansionPanelHead } from './utils';

export interface ExpansionIndicator {
  expand: ReactNode;
  collapse: ReactNode;
}

export interface Props extends HTMLAttributes<HTMLElement> {
  /**
   * A flag indicating whether extension panel is expanded
   * @type {boolean}
   * @default false
   */
  isExpanded?: boolean;
  /**
   * A flag indicating whether extension panel should expand on head click
   * @type {boolean}
   * @default true
   */
  shouldExpandOnHeadClick?: boolean;
  /**
   * Override expansion indicator
   * @type {ExpansionIndicator}
   */
  expansionIndicator?: ExpansionIndicator;
  /**
   * Component to render
   * @default div
   */
  as?: keyof JSX.IntrinsicElements | ComponentType<any>;
}

export const ExpansionPanel: FC<Props> = ({
  isExpanded: isExpandedProp = false,
  shouldExpandOnHeadClick = true,
  expansionIndicator,
  onClick,
  children,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedProp);

  const toggleExpansion = () => setIsExpanded(!isExpanded);

  useEffect(() => setIsExpanded(isExpandedProp), [isExpandedProp]);

  const renderExpansionPanelHeadChildren = () =>
    Children.map(children, child =>
      isExpansionPanelHead(child) ? child : null
    )?.shift();

  const renderExpansionPanelBodyChildren = () =>
    Children.map(children, child =>
      isExpansionPanelBody(child) ? child : null
    )?.shift();

  return (
    <SC.ExpansionPanel {...props}>
      <SC.Head
        onClick={
          shouldExpandOnHeadClick ? onClick ?? toggleExpansion : undefined
        }
        shouldExpandOnHeadClick={shouldExpandOnHeadClick}
      >
        <SC.HeadContent>{renderExpansionPanelHeadChildren()}</SC.HeadContent>
        <SC.HeadExpansionIndicator
          onClick={
            !shouldExpandOnHeadClick ? onClick ?? toggleExpansion : undefined
          }
        >
          {expansionIndicator &&
            (isExpanded
              ? expansionIndicator.collapse
              : expansionIndicator.expand)}
          {!expansionIndicator &&
            (isExpanded ? <SC.CollapseIcon /> : <SC.ExpandIcon />)}
        </SC.HeadExpansionIndicator>
      </SC.Head>
      {isExpanded && <SC.Body>{renderExpansionPanelBodyChildren()}</SC.Body>}
    </SC.ExpansionPanel>
  );
};

export default ExpansionPanel;
