import {
  PATCH_RECORD_FAILED,
  PATCH_RECORD_REQUESTED,
  PATCH_RECORD_SUCCEEDED
} from './action-types';

import { Record } from '../../../types';

export function patchRecordRequested(record: Partial<Record>) {
  return {
    type: PATCH_RECORD_REQUESTED,
    payload: {
      record
    }
  };
}

export function patchRecordSucceeded() {
  return {
    type: PATCH_RECORD_SUCCEEDED
  };
}

export function patchRecordFailed(message: string) {
  return {
    type: PATCH_RECORD_FAILED,
    payload: {
      message
    }
  };
}
