import { all } from 'redux-saga/effects';

import recordsSaga from '../../with-records/redux/saga';
import representativesSaga from '../../representatives/redux/saga';
import recordPageSaga from '../../record-page/redux/saga';
import organizationSaga from '../../with-organization/redux/saga';
import datasetsSaga from '../../with-datasets/redux/saga';

export default function* saga(): Generator {
  yield all([
    recordsSaga(),
    representativesSaga(),
    recordPageSaga(),
    organizationSaga(),
    datasetsSaga()
  ]);
}
