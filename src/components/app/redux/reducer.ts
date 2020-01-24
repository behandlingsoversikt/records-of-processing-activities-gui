import { combineReducers } from 'redux';

import RepresentativesReducer from '../../representatives/redux/reducer';
import OrganizationReducer from '../../with-organization/redux/reducer';
import DatasetsReducer from '../../with-datasets/redux/reducer';
import RecordsReducer from '../../with-records/redux/reducer';
import RecordReducer from '../../with-record/redux/reducer';

export default combineReducers({
  RepresentativesReducer,
  OrganizationReducer,
  DatasetsReducer,
  RecordsReducer,
  RecordReducer
});
