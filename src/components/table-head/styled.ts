import styled from 'styled-components';

const SortButtons = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;

  & > button {
    height: 16px;
    width: 16px;
    cursor: pointer;
    background: none;
    border: none;
    color: inherit;

    position: relative;
    & > svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export default { SortButtons };
