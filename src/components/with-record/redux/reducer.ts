import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_RECORD_SUCCEEDED,
  PATCH_RECORD_SUCCEEDED,
  DELETE_RECORD_SUCCEEDED,
  CREATE_RECORD_SUCCEEDED,
  RESET_RECORD
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  record: null
}).toMap();

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_RECORD_SUCCEEDED:
    case PATCH_RECORD_SUCCEEDED:
      return state.set('record', fromJS(action.payload.record));
    case RESET_RECORD:
    case DELETE_RECORD_SUCCEEDED:
      return state.set('record', null);
    case CREATE_RECORD_SUCCEEDED:
      return state.set('record', fromJS({ id: action.payload.recordId }));
    default:
      return state;
  }
}
