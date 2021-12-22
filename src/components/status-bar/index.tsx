import React, { memo, useState } from 'react';

import CreateIconOutlined from '@material-ui/icons/CreateOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

import SC from './styled';

import { RecordStatus } from '../../types/enums';

interface Props {
  recordId?: string;
  status: RecordStatus;
  updatedAt?: string;
  canBeApproved: boolean;
  onSetStatus: (status: RecordStatus) => void;
  onRecordRemove: () => void;
}

const StatusBar = ({
  recordId,
  status,
  updatedAt,
  onSetStatus,
  canBeApproved,
  onRecordRemove
}: Props): JSX.Element => {
  const [showConfirmDeleteMessage, setShowConfirmDeleteMessage] =
    useState(false);
  const setStatusToDraft = () => onSetStatus(RecordStatus.DRAFT);
  const setStatusToApproved = () => onSetStatus(RecordStatus.APPROVED);
  return (
    <SC.StatusBar>
      <SC.StatusBarBody>
        {!showConfirmDeleteMessage && updatedAt && (
          <span>{`Sist endret: ${new Date(updatedAt).toLocaleString()}`}</span>
        )}
        {showConfirmDeleteMessage && (
          <span>Er du sikker du vil slette denne behandlingsaktiviteten?</span>
        )}
        <SC.ButtonGroup>
          {!showConfirmDeleteMessage && (
            <>
              <SC.StatusButton
                variant={status === RecordStatus.DRAFT ? 'primary' : 'default'}
                selected={status === RecordStatus.DRAFT}
                text='Utkast'
                icon={CreateIconOutlined}
                onClick={setStatusToDraft}
              />
              <SC.StatusButton
                variant={
                  status === RecordStatus.APPROVED && canBeApproved
                    ? 'primary'
                    : 'default'
                }
                selected={status === RecordStatus.APPROVED}
                disabled={!canBeApproved}
                text='Godkjent'
                icon={CheckBoxOutlinedIcon}
                onClick={setStatusToApproved}
              />
              <SC.RemoveButton
                tabIndex={0}
                as='a'
                disabled={!recordId || status === RecordStatus.APPROVED}
                onClick={() => {
                  setShowConfirmDeleteMessage(true);
                }}
                onKeyPress={() => {
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
                tabIndex={0}
                as='a'
                onClick={() => {
                  setShowConfirmDeleteMessage(false);
                }}
                onKeyPress={() => {
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
