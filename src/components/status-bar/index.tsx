import React, { memo, useState } from 'react';

import CreateIconOutlined from '@material-ui/icons/CreateOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

import SC from './styled';

import { RecordStatus } from '../../types/enums';

interface Props {
  status: RecordStatus;
  onSetStatus: (status: RecordStatus) => void;
  onRecordRemove: () => void;
}

const StatusBar = ({
  status,
  onSetStatus,
  onRecordRemove
}: Props): JSX.Element => {
  const [showConfirmDeleteMessage, setShowConfirmDeleteMessage] = useState(
    false
  );
  const setStatusToDraft = () => onSetStatus(RecordStatus.DRAFT);
  const setStatusToApproved = () => onSetStatus(RecordStatus.APPROVED);
  return (
    <SC.StatusBar>
      <SC.StatusBarBody>
        {!showConfirmDeleteMessage && <span>Big text big dreams</span>}
        {showConfirmDeleteMessage && (
          <span>Er du sikker du vil slette denne behandlingsaktiviteten?</span>
        )}
        <SC.ButtonGroup>
          {!showConfirmDeleteMessage && (
            <>
              <SC.StatusButton
                variant={status === RecordStatus.DRAFT ? 'primary' : 'default'}
                text='Utkast'
                icon={CreateIconOutlined}
                onClick={setStatusToDraft}
              />
              <SC.StatusButton
                variant={
                  status === RecordStatus.APPROVED ? 'primary' : 'default'
                }
                text='Godkjent'
                icon={CheckBoxOutlinedIcon}
                onClick={setStatusToApproved}
              />
              <SC.RemoveButton
                as='a'
                disabled={status === RecordStatus.APPROVED}
                onClick={() => {
                  setShowConfirmDeleteMessage(true);
                }}
              >
                Slett
              </SC.RemoveButton>
            </>
          )}
          {showConfirmDeleteMessage && (
            <>
              <SC.ConfirmButton
                variant='primary'
                text='Ja'
                onClick={() => {
                  setShowConfirmDeleteMessage(false);
                  onRecordRemove();
                }}
              />
              <SC.CancelButton
                as='a'
                onClick={() => {
                  setShowConfirmDeleteMessage(false);
                }}
              >
                Avbryt
              </SC.CancelButton>
            </>
          )}
        </SC.ButtonGroup>
      </SC.StatusBarBody>
    </SC.StatusBar>
  );
};

export default memo(StatusBar);
