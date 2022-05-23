import styled from 'styled-components';

import Tag from '../../tag';

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

const SubLabel = styled.div`
  display: inline-flex;
  align-items: center;

  font-size: 2.25rem;
  font-weight: 300;

  margin-top: 1em;

  & > svg {
    font-size: 3rem;
    margin-right: 0.25em;
    background: white;
    fill: ${({ theme }) => theme.fdk.colors.text.default};
    padding: 5px;
    border-radius: 50%;
  }
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
`;

const Section = styled.section`
  margin-bottom: 2em;
  padding: 0 1em;
  font-size: 1.55rem;
  line-height: 24px;
`;

const RequiredLabel = styled(Tag)`
  padding: 0.35em 0.8em;
  margin-left: 5px;
  color: #885b00;
  font-weight: 400;
  border-radius: 15px;
`;

const SectionRow = styled.section`
  display: flex;

  & > div {
    flex: 1;
  }
`;

const SectionContent = styled.div`
  padding: 2em 1em 0.5em 1em;
  max-height: 400px;
  overflow-y: auto;
`;

const SectionTitle = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  border-bottom: 1px solid #dfe1e2;
  padding-bottom: 0.5em;

  & > ${RequiredLabel} {
    position: relative;
    top: -5px;
  }
`;

const SectionSubTitle = styled.h4`
  color: ${({ theme }) => theme.fdk.colors.text.default};
  font-weight: 600;
  font-size: 2rem;
  margin-bottom: 0.5em;
`;
export default {
  Header,
  Label,
  SubLabel,
  Title,
  RequiredLabel,
  Section,
  SectionRow,
  SectionContent,
  SectionTitle,
  SectionSubTitle
};
