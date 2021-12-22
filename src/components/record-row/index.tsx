import React, { memo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import RecordStatusIndicator from '../record-status-indicator';

import SC from './styled';

import { Record } from '../../types';

interface Props extends RouteComponentProps {
  record: Record;
}

const RecordRow = ({
  record: { id, organizationId, title, dataProcessorContactDetails, status },
  history: { push }
}: Props) => {
  const navigateToRecord = event => {
    if (
      event.type === 'click' ||
      (event.type === 'keypress' &&
        (event.key === ' ' || event.key === 'Enter'))
    ) {
      push(`/${organizationId}/records/${id}`);
    }
  };
  return (
    <SC.RecordRow
      onClick={navigateToRecord}
      onKeyPress={navigateToRecord}
      tabIndex={0}
    >
      <td>{title}</td>
      <td>{dataProcessorContactDetails?.map(({ name }) => name).join(', ')}</td>
      <td>
        <RecordStatusIndicator status={status} />
      </td>
    </SC.RecordRow>
  );
};

export default memo(withRouter(RecordRow));
