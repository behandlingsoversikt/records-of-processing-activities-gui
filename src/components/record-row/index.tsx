import React, { memo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import SC from './styled';

import { Record } from '../../types/domain';

interface Props extends RouteComponentProps {
  record: Record;
}

const RecordRow = ({
  record: {
    id,
    organizationId,
    title,
    dataProcessorContactDetails: { name },
    status
  },
  history: { push }
}: Props) => {
  const navigateToRecord = () => push(`/${organizationId}/records/${id}`);
  return (
    <SC.RecordRow onClick={navigateToRecord}>
      <td>{title}</td>
      <td>{name}</td>
      <td>{status}</td>
    </SC.RecordRow>
  );
};

export default memo(withRouter(RecordRow));
