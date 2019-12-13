import React, { memo } from 'react';

import SC from './styled';
import { ContactDetailsInterface } from '../../../types';

interface Props {
  contactDetailsInterface: ContactDetailsInterface;
}

const ContactInformationPure = ({ contactDetailsInterface }: Props) => (
  <SC.ContactInformation>
    <span>{contactDetailsInterface.name}</span>
    <span>{contactDetailsInterface.address}</span>
    <span>{contactDetailsInterface.phone}</span>
    <span>{contactDetailsInterface.email}</span>
  </SC.ContactInformation>
);

export const ContactInformation = memo(ContactInformationPure);
