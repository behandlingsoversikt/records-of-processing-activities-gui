import styled, { css } from 'styled-components';

import Tag from '../tag';

const Fieldset = styled.fieldset`
  display: flex;
  min-width: 0;

  & > div {
    margin-top: 20px;
  }
`;

const Legend = styled.legend`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  background: ${({ theme }) => theme.fdk.colors.neutrals.skyblue};
  border-radius: 5px;

  & svg {
    fill: ${({ theme }) => theme.fdk.colors.text.link};
    font-size: 1.8rem;
  }
`;

const Inline = styled.div<{ justifyContent?: string }>`
  margin-top: 5px;
  display: flex;
  align-items: start;
  ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}
`;

const Title = styled.b`
  font-size: 18px;
`;

const RequiredLabel = styled(Tag)`
  margin-left: 5px;
`;

const Subtitle = styled.small`
  font-size: 15px;
  font-weight: 300;
`;

const Description = styled.p`
  margin-top: 5px;
  font-size: 1.5rem;
  font-weight: 300;
  & a {
    color: ${({ theme }) => theme.fdk.colors.text.link};
  }
`;

const Expand = styled.button`
  background-color: transparent;
  border: none;
`;

export default {
  Fieldset,
  Legend,
  Inline,
  Title,
  RequiredLabel,
  Subtitle,
  Description,
  Expand
};
