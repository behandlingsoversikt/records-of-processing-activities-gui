import styled from 'styled-components';

const RepresentativeDropdown = styled.div`
  flex: 0 0 calc(50% - 15px);

  padding: 30px;
  margin-bottom: 60px;

  background-color: white;
  border-radius: 5px;
`;

const DropdownTitle = styled.h2`
  display: inline-flex;
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.fdk.colors.text.link};
  margin-bottom: 5px;
`;

const DropdownSubtitle = styled.h3``;

const RequiredLabel = styled.span`
  padding: 0 2px;
  margin-left: 5px;
  border-radius: 2px;

  font-size: 14px;
  background-color: ${({ theme }) => theme.fdk.colors.alerts.warning.lightest};
`;

export default {
  RepresentativeDropdown,
  RequiredLabel,
  DropdownTitle,
  DropdownSubtitle
};
