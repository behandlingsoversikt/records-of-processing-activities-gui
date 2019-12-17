import styled from 'styled-components';

const Tag = styled.span`
  padding: 0 2px;
  border-radius: 2px;
  font-size: 1.4rem;
  background-color: ${({ theme }) => theme.fdk.colors.alerts.warning.lightest};
`;

export default { Tag };
