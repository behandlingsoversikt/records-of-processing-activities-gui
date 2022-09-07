import { ReactNode, ReactElement, ComponentProps, isValidElement } from 'react';

import ExpansionPanelHead from '../expansion-panel-head';
import ExpansionPanelBody from '../expansion-panel-body';

type ExpansionPanelHeadType = ReactElement<
  ComponentProps<typeof ExpansionPanelHead>
>;
type ExpansionPanelBodyType = ReactElement<
  ComponentProps<typeof ExpansionPanelBody>
>;

export const isExpansionPanelHead = (
  child: ReactNode
): child is ExpansionPanelHeadType =>
  !!isValidElement(child) && child.type === ExpansionPanelHead;

export const isExpansionPanelBody = (
  child: ReactNode
): child is ExpansionPanelBodyType =>
  !!isValidElement(child) && child.type === ExpansionPanelBody;
