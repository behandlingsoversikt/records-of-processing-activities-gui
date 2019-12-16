import styled from 'styled-components';

const Anchor = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.fdk.colors.text.link};
  border-bottom: 1px solid ${({ theme }) => theme.fdk.colors.text.link};

  & > svg {
    margin-left: 5px;
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.fdk.colors.text.link};
  }
`;

export default { Anchor };
