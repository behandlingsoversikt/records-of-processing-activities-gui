import {
  FETCH_ORGANIZATION_FAILED,
  FETCH_ORGANIZATION_REQUESTED,
  FETCH_ORGANIZATION_SUCCEEDED
} from './action-types';

import { Organization } from '../../../types';

export function fetchOrganizationRequested(id: string) {
  return {
    type: FETCH_ORGANIZATION_REQUESTED,
    payload: {
      id
    }
  };
}

export function fetchOrganizationSucceeded(organization: Organization) {
  return {
    type: FETCH_ORGANIZATION_SUCCEEDED,
    payload: {
      organization
    }
  };
}

export function fetchOrganizationFailed(message: string) {
  return {
    type: FETCH_ORGANIZATION_FAILED,
    payload: {
      message
    }
  };
}
