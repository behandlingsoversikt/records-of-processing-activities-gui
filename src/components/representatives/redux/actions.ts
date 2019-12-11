import {
  PATCH_REPRESENTATIVE_FAILED,
  PATCH_REPRESENTATIVE_REQUESTED,
  PATCH_REPRESENTATIVE_SUCCEEDED
} from './action-types';

// import { RepresentativesInterface } from '../../../types';

export function patchRepresentativeRequested() {
  return {
    type: PATCH_REPRESENTATIVE_REQUESTED
  };
}

export function patchRepresentativeSucceeded() {
  return {
    type: PATCH_REPRESENTATIVE_SUCCEEDED
    // payload: {
    //   representatives
    // }
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
