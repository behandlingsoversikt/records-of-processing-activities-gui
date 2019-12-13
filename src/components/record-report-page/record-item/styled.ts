import styled from 'styled-components';

const Header = styled.div`
  background-color: #2d3741;
  color: #fff;
  border-radius: 5px;
  padding: 1.5em 2em;
  margin-bottom: 2em;
  @media print {
    color: #000;
    padding: 0;
  }
`;

const Label = styled.span`
  font-size: 1.9rem;
  font-weight: 300;
  letter-spacing: 0.5px;
`;

const Title = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
`;

const Section = styled.section`
  margin-bottom: 2em;
  padding: 0 1em;
`;

const SectionColumn = styled.section`
  display: flex;
`;

const SectionContent = styled.div`
  padding: 1em;
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  border-bottom: 1px solid #dfe1e2;
  padding-bottom: 0.5em;
`;

const SectionSubTitle = styled.h4`
  color: #6c737a;
  font-size: 1.6rem;
  margin-bottom: 0.5em;
`;
export default {
  Header,
  Label,
  Title,
  Section,
  SectionColumn,
  SectionContent,
  SectionTitle,
  SectionSubTitle
};
