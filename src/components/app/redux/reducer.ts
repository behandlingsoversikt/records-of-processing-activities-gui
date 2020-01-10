import { combineReducers } from 'redux';

import RecordsReducer from '../../with-records/redux/reducer';
import RepresentativesReducer from '../../representatives/redux/reducer';
import RecordPageReducer from '../../record-page/redux/reducer';
import OrganizationReducer from '../../with-organization/redux/reducer';
import DatasetsReducer from '../../with-datasets/redux/reducer';

export default combineReducers({
  RecordsReducer,
  RepresentativesReducer,
  RecordPageReducer,
  OrganizationReducer,
  DatasetsReducer
});
