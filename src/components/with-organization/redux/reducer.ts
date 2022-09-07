import { fromJS } from 'immutable';

import * as actions from './actions';
import { FETCH_ORGANIZATION_SUCCEEDED } from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  organization: null
}).toMap();

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case FETCH_ORGANIZATION_SUCCEEDED:
      return state.set('organization', fromJS(action.payload.organization));
    default:
      return state;
  }
}
