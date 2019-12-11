import { fromJS } from 'immutable';

import * as actions from './actions';
import { PATCH_REPRESENTATIVE_SUCCEEDED } from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  // records: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case PATCH_REPRESENTATIVE_SUCCEEDED:
      return state;
    default:
      return state;
  }
}
