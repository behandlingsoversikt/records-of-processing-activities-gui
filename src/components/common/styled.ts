import styled from 'styled-components';

import { theme } from '@fellesdatakatalog/theme';

const onMobileView = '@media (max-width: 900px)';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow-wrap: break-word;
  width: 1200px;
  z-index: 10;

  @media (max-width: 1251px) {
    & {
      width: 100%;
      padding: 0 ${theme.spacing('S32')};
    }
  }

  ${onMobileView} {
    & {
      padding: 0 calc(12px + (32 - 12) * ((100vw - 320px) / (900 - 320)));
    }
  }
`;

const Division = styled.div`
  margin-bottom: 60px;
`;

export default { Container, Division };
