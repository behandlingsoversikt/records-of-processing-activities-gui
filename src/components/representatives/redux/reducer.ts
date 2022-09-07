import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  PATCH_REPRESENTATIVE_SUCCEEDED,
  FETCH_ALL_REPRESENTATIVES_SUCCEEDED
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  representatives: {
    dataControllerRepresentative: {},
    dataControllerRepresentativeInEU: {},
    dataProtectionOfficer: {}
  }
}).toMap();

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case FETCH_ALL_REPRESENTATIVES_SUCCEEDED:
      return state.set(
        'representatives',
        fromJS(action.payload.representatives)
      );
    case PATCH_REPRESENTATIVE_SUCCEEDED:
      return state.set(
        'representatives',
        fromJS(action.payload.representatives)
      );
    default:
      return state;
  }
}
