import styled from 'styled-components';

const Root = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  align-items: center;
  background: ${({ theme }) => theme.fdk.colors.neutrals.lightest};
`;

export default { Root };
