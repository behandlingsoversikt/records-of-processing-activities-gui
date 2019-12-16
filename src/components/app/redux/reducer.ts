import { combineReducers } from 'redux';

import RecordsPageReducer from '../../record-list-page/redux/reducer';
import RepresentativesReducer from '../../representatives/redux/reducer';

export default combineReducers({
  RecordsPageReducer,
  RepresentativesReducer
});
