import React, { memo } from 'react';
import { RecordInterface } from '../../types/domain';

interface Props {
  record: RecordInterface;
}

const Record = ({
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

export default memo(Record);
