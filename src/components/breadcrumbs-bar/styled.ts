import styled from 'styled-components';

const BreadcrumbsBar = styled.div`
  padding: 10px 0;
  margin-bottom: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.fdk.colors.neutrals.lighter};

  & * {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.fdk.colors.neutrals.darker};
  }

  & nav a {
    border-bottom: 1px solid ${({ theme }) => theme.fdk.colors.text.link};
    color: ${({ theme }) => theme.fdk.colors.text.link};
  }

  & nav a,
  & nav a:hover {
    text-decoration: none;
  }

  & nav li:last-of-type {
    flex: 1 1 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default { BreadcrumbsBar };
