import styled from 'styled-components';

const BreadcrumbsBar = styled.div`
  padding: 10px 0;
  margin-bottom: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.fdk.colors.neutrals.lighter};

  & nav a {
    border-bottom: 1px solid ${({ theme }) => theme.fdk.colors.text.link};
    color: ${({ theme }) => theme.fdk.colors.text.link};
  }

  & nav a,
  & nav a:hover {
    text-decoration: none;
  }
`;

export default { BreadcrumbsBar };
