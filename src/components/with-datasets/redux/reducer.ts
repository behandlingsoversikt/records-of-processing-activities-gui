import { fromJS } from 'immutable';

import * as actions from './actions';
import { FETCH_ALL_DATASETS_SUCCEEDED } from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  datasets: []
}).toMap();

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case FETCH_ALL_DATASETS_SUCCEEDED:
      return state.set('datasets', fromJS(action.payload.datasets));
    default:
      return state;
  }
}
