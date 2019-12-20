import { all } from 'redux-saga/effects';

import recordsPageSaga from '../../record-list-page/redux/saga';
import representativesSaga from '../../representatives/redux/saga';
import recordPageSaga from '../../record-page/redux/saga';
import organizationSaga from '../../record-report-page/redux/saga';

export default function* saga(): Generator {
  yield all([
    recordsPageSaga(),
    representativesSaga(),
    recordPageSaga(),
    organizationSaga()
  ]);
}
