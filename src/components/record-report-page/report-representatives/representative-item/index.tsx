import React, { memo } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import SC from './styled';
import { ContactDetailsInterface } from '../../../../types';
import { ContactInformation } from '../../contact-information';

interface Props {
  label: string;
  contactDetails: ContactDetailsInterface;
}

export const RepresentativeItem = memo(({ label, contactDetails }: Props) => (
  <>
    <SC.RepresentativeItemHeader>
      <SC.RepresentativeItemIcon>
        <AccountCircleIcon fontSize='large' />
      </SC.RepresentativeItemIcon>
      <span>{label}</span>
    </SC.RepresentativeItemHeader>
    <ContactInformation contactDetailsInterface={contactDetails} />
  </>
));
