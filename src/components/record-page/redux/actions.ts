import {
  PATCH_RECORD_FAILED,
  PATCH_RECORD_REQUESTED,
  PATCH_RECORD_SUCCEEDED,
  GET_RECORD_FAILED,
  GET_RECORD_REQUESTED,
  GET_RECORD_SUCCEEDED
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

export function getRecordRequested(recordId: string, organizationId: string) {
  return {
    type: GET_RECORD_REQUESTED,
    payload: {
      recordId,
      organizationId
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
