import styled from 'styled-components';

const RecordStatusIndicator = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    height: 30px;
    width: 30px;
    margin-right: 6px;
    padding: 6px;
    border-radius: 50%;
    font-size: 2rem;
    background: ${({ theme }) => theme.fdk.colors.neutrals.default};
    fill: white;
  }

  & > span {
    font-size: 1.8rem;
    font-weight: normal;
  }
`;

export default { RecordStatusIndicator };
