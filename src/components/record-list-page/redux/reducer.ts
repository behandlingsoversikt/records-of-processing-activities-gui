import { fromJS } from 'immutable';

import * as actions from './actions';
import { FETCH_ALL_RECORDS_SUCCEEDED } from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  records: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case FETCH_ALL_RECORDS_SUCCEEDED:
      return state.set('records', fromJS(action.payload.records));
    default:
      return state;
  }
}
