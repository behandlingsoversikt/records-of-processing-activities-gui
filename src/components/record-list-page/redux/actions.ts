import {
  FETCH_ALL_RECORDS_FAILED,
  FETCH_ALL_RECORDS_REQUESTED,
  FETCH_ALL_RECORDS_SUCCEEDED
} from './action-types';

import { Record } from '../../../types';

export function fetchAllRecordsRequested() {
  return {
    type: FETCH_ALL_RECORDS_REQUESTED
  };
}

export function fetchAllRecordsSucceeded(records: Record[]) {
  return {
    type: FETCH_ALL_RECORDS_SUCCEEDED,
    payload: {
      records
    }
  };
}

export function fetchAllRecordsFailed(message: string) {
  return {
    type: FETCH_ALL_RECORDS_FAILED,
    payload: {
      message
    }
  };
}
