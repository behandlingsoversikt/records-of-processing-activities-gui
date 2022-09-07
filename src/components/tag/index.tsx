import React, { FC, ReactElement } from 'react';
import SC from './styled';

type Props = {
  icon?: ReactElement;
  text: string;
  className?: string;
};

const Tag: FC<Props> = ({ icon, text, className }) => (
  <SC.Tag className={className}>
    {icon}
    <SC.TagText>{text}</SC.TagText>
  </SC.Tag>
);

export { Props };
export default Tag;
