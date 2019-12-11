import {
  FETCH_ALL_RECORDS_FAILED,
  FETCH_ALL_RECORDS_REQUESTED,
  FETCH_ALL_RECORDS_SUCCEEDED,
  FETCH_ALL_REPRESENTATIVES_FAILED,
  FETCH_ALL_REPRESENTATIVES_REQUESTED,
  FETCH_ALL_REPRESENTATIVES_SUCCEEDED
} from './action-types';

import { RecordInterface, RepresentativesInterface } from '../../../types';

export function fetchAllRepresentativesRequested() {
  return {
    type: FETCH_ALL_REPRESENTATIVES_REQUESTED
  };
}

export function fetchAllRepresentativesSucceeded(
  representatives: RepresentativesInterface
) {
  return {
    type: FETCH_ALL_REPRESENTATIVES_SUCCEEDED,
    payload: {
      representatives
    }
  };
}

export function fetchAllRepresentativesFailed(message: string) {
  return {
    type: FETCH_ALL_REPRESENTATIVES_FAILED,
    payload: {
      message
    }
  };
}

export function fetchAllRecordsRequested() {
  return {
    type: FETCH_ALL_RECORDS_REQUESTED
  };
}

export function fetchAllRecordsSucceeded(records: RecordInterface[]) {
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
