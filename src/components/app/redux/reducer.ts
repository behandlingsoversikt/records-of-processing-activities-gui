import { combineReducers } from 'redux';

import RecordsPageReducer from '../../record-list-page/redux/reducer';
import RepresentativesReducer from '../../representatives/redux/reducer';
import RecordPageReducer from '../../record-page/redux/reducer';
import OrganizationReducer from '../../record-report-page/redux/reducer';

export default combineReducers({
  RecordsPageReducer,
  RepresentativesReducer,
  RecordPageReducer,
  OrganizationReducer
});
