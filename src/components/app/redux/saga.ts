import { all } from 'redux-saga/effects';

import representativesSaga from '../../representatives/redux/saga';
import organizationSaga from '../../with-organization/redux/saga';
import datasetsSaga from '../../with-datasets/redux/saga';
import recordsSaga from '../../with-records/redux/saga';
import recordSaga from '../../with-record/redux/saga';

export default function* saga(): Generator {
  yield all([
    representativesSaga(),
    organizationSaga(),
    datasetsSaga(),
    recordsSaga(),
    recordSaga()
  ]);
}
