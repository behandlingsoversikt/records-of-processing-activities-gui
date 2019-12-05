import styled from 'styled-components';

const Anchor = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.fdk.colors.text.link};
  text-decoration: underline;

  & > svg {
    margin-left: 5px;
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.fdk.colors.text.link};
  }
`;

export default { Anchor };
