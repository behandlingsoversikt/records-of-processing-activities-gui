import { Colour, theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';
import ExpansionPanel, { SC as ExpansionPanelSC } from '../expansion-panel';
import Icon from '../icon';

interface Props {
  isExpanded?: boolean;
  $showAlert?: boolean;
}

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing('S12')};
  margin: ${theme.spacing('S24')} 0px 0px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing('S12')};
  flex: 1;
`;

const Title = styled.h2`
  display: flex;
  justify-self: flex-start;
  align-items: baseline;

  font-weight: ${theme.fontWeight('FW700')};
  font-size: ${theme.fontSize('FS24')};
  line-height: ${theme.spacing('S32')};

  padding: 0px;
  margin: 0px;
`;

const IndicatorIcon = styled(Icon)`
  align-self: center;
`;

const AlertIcon = styled(Icon)`
  align-self: center;
`;

const MandatoryTagWrapper = styled.div``;

const RecommendedTagWrapper = styled.div``;

const Subtitle = styled.p`
  justify-self: center;
  align-self: flex-start;
  margin: 0px 0px ${theme.spacing('S24')};
  margin: 0px 0px ${theme.spacing('S24')};

  font-weight: ${theme.fontWeight('FW400')};
  font-size: ${theme.fontSize('FS16')};

  line-height: ${theme.spacing('S24')};
`;

const FormPanel = styled(ExpansionPanel)<Props>`
  width: 100%;

  &:nth-of-type(n + 2) {
    margin-top: 20px;
  }

  & > ${ExpansionPanelSC.ExpansionPanel.Head} {
    padding: ${theme.spacing('S24')};
    border-radius: ${theme.spacing('S4')};

    transition: 0.5s;
    * > {
      transition: 0.5s;
    }

    min-height: ${({ isExpanded }) =>
      isExpanded ? theme.spacing('S72') : theme.spacing('S96')};

    :hover {
      background-color: ${theme.colour(Colour.NEUTRAL, 'N70')};

      svg {
        & * {
          stroke: ${theme.colour(Colour.NEUTRAL, 'N0')};
        }
      }

      & ${Heading} {
        & > ${TitleContainer} {
          & > ${Title} {
            color: ${theme.colour(Colour.NEUTRAL, 'N0')};
          }
          & > ${MandatoryTagWrapper}, & > ${RecommendedTagWrapper} {
            span {
              background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
              color: ${theme.colour(Colour.NEUTRAL, 'N70')};
            }
          }
          & > ${AlertIcon} {
            & * {
              stroke: ${theme.colour(Colour.NEUTRAL, 'N0')};
            }
          }
        }
      }

      & ${Subtitle} {
        color: ${theme.colour(Colour.NEUTRAL, 'N0')};
      }
    }

    background-color: ${({ $showAlert }) =>
      $showAlert ? theme.colour(Colour.RED, 'R30') : 'inherit'};

    & ${IndicatorIcon} {
      & * {
        stroke: ${({ $showAlert }) =>
          $showAlert
            ? theme.colour(Colour.RED, 'R60')
            : theme.colour(Colour.BLUE, 'B60')};
      }
    }

    & ${Heading} {
      & > ${TitleContainer} {
        & > ${Title} {
          color: ${({ $showAlert }) =>
            $showAlert
              ? theme.colour(Colour.RED, 'R60')
              : theme.colour(Colour.BLUE, 'B60')};
        }

        & > ${MandatoryTagWrapper} {
          span {
            background-color: ${({ $showAlert }) =>
              $showAlert
                ? theme.colour(Colour.RED, 'R60')
                : theme.colour(Colour.BLUE, 'B60')};
            color: ${theme.colour(Colour.NEUTRAL, 'N0')};
          }
        }

        & > ${RecommendedTagWrapper} {
          span {
            background-color: ${({ $showAlert }) =>
              $showAlert
                ? theme.colour(Colour.NEUTRAL, 'N0')
                : theme.colour(Colour.BLUE, 'B30')};
          }
          color: ${({ $showAlert }) =>
            $showAlert
              ? theme.colour(Colour.RED, 'R60')
              : theme.colour(Colour.BLUE, 'B60')};
        }

        & > ${AlertIcon} {
          & * {
            stroke: ${({ $showAlert }) =>
              $showAlert
                ? theme.colour(Colour.RED, 'R60')
                : theme.colour(Colour.BLUE, 'B60')};
          }
        }
      }
    }

    & ${Subtitle} {
      color: ${({ $showAlert }) =>
        $showAlert
          ? theme.colour(Colour.RED, 'R60')
          : theme.colour(Colour.BLUE, 'B60')};
    }
  }

  & > ${ExpansionPanelSC.ExpansionPanel.Body} {
    padding: ${theme.spacing('S24')};
  }
`;

export default {
  FormPanel,
  Heading,
  TitleContainer,
  Title,
  Subtitle,
  IndicatorIcon,
  AlertIcon,
  MandatoryTagWrapper,
  RecommendedTagWrapper
};
