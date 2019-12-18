import React, { memo } from 'react';

import { Record } from '../../types/domain';

interface Props {
  record: Record;
}

const RecordRow = ({
  record: {
    title,
    dataProcessorContactDetails: { name },
    status
  }
}: Props) => (
  <tr>
    <td>{title}</td>
    <td>{name}</td>
    <td>{status}</td>
  </tr>
);

export default memo(RecordRow);
