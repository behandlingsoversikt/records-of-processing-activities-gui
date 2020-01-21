import {
  GET_RECORD_FAILED,
  GET_RECORD_REQUESTED,
  GET_RECORD_SUCCEEDED,
  PATCH_RECORD_FAILED,
  PATCH_RECORD_REQUESTED,
  PATCH_RECORD_SUCCEEDED,
  DELETE_RECORD_FAILED,
  DELETE_RECORD_REQUESTED,
  DELETE_RECORD_SUCCEEDED,
  RESET_RECORD
} from './action-types';

import { Record } from '../../../types';

export function getRecordRequested(
  recordId: string,
  organizationId: string,
  onError: () => void
) {
  return {
    type: GET_RECORD_REQUESTED,
    payload: {
      recordId,
      organizationId,
      onError
    }
  };
}

export function getRecordSucceeded(record: Record) {
  return {
    type: GET_RECORD_SUCCEEDED,
    payload: {
      record
    }
  };
}

export function getRecordFailed(message: string) {
  return {
    type: GET_RECORD_FAILED,
    payload: {
      message
    }
  };
}

export function patchRecordRequested(record: Partial<Record>) {
  return {
    type: PATCH_RECORD_REQUESTED,
    payload: {
      record
    }
  };
}

export function patchRecordSucceeded(record: Record) {
  return {
    type: PATCH_RECORD_SUCCEEDED,
    payload: {
      record
    }
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

export function deleteRecordRequested(
  recordId: string,
  organizationId: string,
  onSuccess: () => void
) {
  return {
    type: DELETE_RECORD_REQUESTED,
    payload: {
      recordId,
      organizationId,
      onSuccess
    }
  };
}

export function deleteRecordSucceeded() {
  return {
    type: DELETE_RECORD_SUCCEEDED
  };
}

export function deleteRecordFailed(message: string) {
  return {
    type: DELETE_RECORD_FAILED,
    payload: {
      message
    }
  };
}

export function resetRecord() {
  return {
    type: RESET_RECORD
  };
}
