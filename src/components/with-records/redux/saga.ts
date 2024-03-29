import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import AuthService from '../../../services/auth';

import env from '../../../env';

import * as actions from './actions';
import { FETCH_ALL_RECORDS_REQUESTED } from './action-types';

const { RECORDS_OF_PROCESSING_ACTIVITIES_URL } = env;

function* fetchAllRecordsRequested({
  payload: { organizationId }
}: ReturnType<typeof actions.fetchAllRecordsRequested>) {
  try {
    const authorization: string = yield call([
      AuthService,
      AuthService.getAuthorizationHeader
    ]);
    const { data, message } = yield call(
      axios.get,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/api/organizations/${organizationId}/records`,
      {
        params: { limit: 1000 },
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data && data.hits) {
      yield put(actions.fetchAllRecordsSucceeded(data.hits));
    } else {
      yield put(actions.fetchAllRecordsFailed(JSON.stringify(message)));
    }
  } catch (e: any) {
    yield put(actions.fetchAllRecordsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(FETCH_ALL_RECORDS_REQUESTED, fetchAllRecordsRequested)
  ]);
}
