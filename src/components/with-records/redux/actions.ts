import {
  FETCH_ALL_RECORDS_FAILED,
  FETCH_ALL_RECORDS_REQUESTED,
  FETCH_ALL_RECORDS_SUCCEEDED,
  SORT_RECORDS
} from './action-types';

import { Record } from '../../../types';
import { SortOrder, SortField } from '../../../types/enums';

export function sortRecords(sortField: SortField, order: SortOrder) {
  return {
    type: SORT_RECORDS,
    payload: {
      sortField,
      order
    }
  };
}

export function fetchAllRecordsRequested(organizationId: string) {
  return {
    type: FETCH_ALL_RECORDS_REQUESTED,
    payload: {
      organizationId
    }
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
