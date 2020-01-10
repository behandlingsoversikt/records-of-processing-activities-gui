import {
  FETCH_ALL_DATASETS_FAILED,
  FETCH_ALL_DATASETS_REQUESTED,
  FETCH_ALL_DATASETS_SUCCEEDED
} from './action-types';

import { Dataset } from '../../../types';

export function fetchAllDatasetsRequested(organizationId: string) {
  return {
    type: FETCH_ALL_DATASETS_REQUESTED,
    payload: {
      organizationId
    }
  };
}

export function fetchAllDatasetsSucceeded(datasets: Dataset[]) {
  return {
    type: FETCH_ALL_DATASETS_SUCCEEDED,
    payload: {
      datasets
    }
  };
}

export function fetchAllDatasetsFailed(message: string) {
  return {
    type: FETCH_ALL_DATASETS_FAILED,
    payload: {
      message
    }
  };
}
