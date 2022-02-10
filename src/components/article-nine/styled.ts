import styled, { css } from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

import ExpandAllUpIcon from '../../images/expand-all-up.svg';
import ExpandAllDownIcon from '../../images/expand-all-down.svg';

const ArticleNine = styled.div`
  display: flex;
  flex-flow: column;
  margin-bottom: ${theme.spacing('S4')};
`;

const CheckboxAndLabel = styled.div`
  display: flex;
`;

const Expand = styled.button`
  align-items: center;
  background-color: transparent;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px dashed;
  color: ${theme.colour(Colour.BLUE, 'B60')};
  display: inline-flex;
  font-size: ${theme.fontSize('FS14')};
  margin-left: ${theme.spacing('S12')};
  padding: ${theme.spacing('S4')};
`;

const ExpandIconStyle = css`
  height: 15px;
`;
const ExpandAllDown = styled(ExpandAllDownIcon)`
  ${ExpandIconStyle}
`;

const ExpandAllUp = styled(ExpandAllUpIcon)`
  ${ExpandIconStyle}
`;

const Description = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  margin: ${theme.spacing('S8')} 0;
`;

const ExtraInformation = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: ${theme.spacing('S24')};
`;

const TextField = styled.div`
  margin: ${theme.spacing('S8')} 0;
`;

export default {
  ArticleNine,
  CheckboxAndLabel,
  Expand,
  ExpandAllDown,
  ExpandAllUp,
  Description,
  ExtraInformation,
  TextField
};
