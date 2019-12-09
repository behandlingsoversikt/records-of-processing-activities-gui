import styled from 'styled-components';

const RecordListTable = styled.table`
  width: 100%;
  border-spacing: 0 5px;
  border-collapse: separate;

  tr {
    text-align: left;
    background: white;
    padding: 10px 0;
  }

  td,
  th {
    padding: 15px 10px;

    &:first-of-type {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    &:last-of-type {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }

  th {
    & > div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    background: ${({ theme }) => theme.fdk.colors.neutrals.darker};
    color: white;
    font-weight: bold;
  }
`;

export default { RecordListTable };
