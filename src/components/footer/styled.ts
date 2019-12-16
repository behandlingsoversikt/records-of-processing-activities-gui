import styled from 'styled-components';

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  justify-self: flex-end;

  padding: 20px 0;
  margin-top: auto;

  border-top: 1px solid #e0e0e0;

  & > div:nth-of-type(2) {
    text-align: center;
    flex: 0 0 40%;
  }
`;

export default { Footer };
