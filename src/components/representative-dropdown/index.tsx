import React, { memo } from 'react';

import { ContactDetailsInterface } from '../../types';

import SC from './styled';

interface Props {
  title: string;
  contactPerson: ContactDetailsInterface;
  required?: boolean;
}

const RepresentativeDropdown = ({
  title,
  contactPerson,
  required = false
}: Props) => (
  <SC.RepresentativeDropdown>
    <SC.DropdownTitle>{title}</SC.DropdownTitle>
    {required && <SC.RequiredLabel>Obligatorisk</SC.RequiredLabel>}
    <SC.DropdownSubtitle>{contactPerson.name}</SC.DropdownSubtitle>
  </SC.RepresentativeDropdown>
);

export default memo(RepresentativeDropdown);
