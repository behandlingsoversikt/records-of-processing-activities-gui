import {
  FETCH_ALL_REPRESENTATIVES_FAILED,
  FETCH_ALL_REPRESENTATIVES_REQUESTED,
  FETCH_ALL_REPRESENTATIVES_SUCCEEDED,
  PATCH_REPRESENTATIVE_FAILED,
  PATCH_REPRESENTATIVE_REQUESTED,
  PATCH_REPRESENTATIVE_SUCCEEDED,
  CREATE_REPRESENTATIVE_FAILED,
  CREATE_REPRESENTATIVE_REQUESTED,
  CREATE_REPRESENTATIVE_SUCCEEDED
} from './action-types';

import { RepresentativeType } from '../../../types/enums';
import {
  ContactDetailsInterface,
  RepresentativesInterface
} from '../../../types';

export function fetchAllRepresentativesRequested(organizationId: string) {
  return {
    type: FETCH_ALL_REPRESENTATIVES_REQUESTED,
    payload: {
      organizationId
    }
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

export function patchRepresentativeRequested(
  type: RepresentativeType,
  payload: ContactDetailsInterface,
  organizationId: string
) {
  return {
    type: PATCH_REPRESENTATIVE_REQUESTED,
    payload: {
      type,
      payload,
      organizationId
    }
  };
}

export function patchRepresentativeSucceeded(
  representatives: RepresentativesInterface
) {
  return {
    type: PATCH_REPRESENTATIVE_SUCCEEDED,
    payload: {
      representatives
    }
  };
}

export function patchRepresentativeFailed(message: string) {
  return {
    type: PATCH_REPRESENTATIVE_FAILED,
    payload: {
      message
    }
  };
}

export function createRepresentativeRequested(organizationId: string) {
  return {
    type: CREATE_REPRESENTATIVE_REQUESTED,
    payload: {
      organizationId
    }
  };
}

export function createRepresentativeSucceeded() {
  return {
    type: CREATE_REPRESENTATIVE_SUCCEEDED
  };
}

export function createRepresentativeFailed(message: string) {
  return {
    type: CREATE_REPRESENTATIVE_FAILED,
    payload: {
      message
    }
  };
}
