import { all, call, getContext, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import {
  FETCH_ALL_RECORDS_REQUESTED,
  FETCH_ALL_REPRESENTATIVES_REQUESTED
} from './action-types';

const { RECORDS_OF_PROCESSING_ACTIVITIES_URL } = env;

function* fetchAllRecordsRequested() {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.get,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/organizations/910244132/records`,
      {
        params: { limit: 1000 },
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data && data.hits && data.hits.length > 0) {
      yield put(actions.fetchAllRecordsSucceeded(data.hits));
    } else {
      yield put(actions.fetchAllRecordsFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.fetchAllRecordsFailed(e.message));
  }
}

function* fetchAllRepresentativesRequested() {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.get,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/organizations/910244132/representatives`,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data) {
      yield put(actions.fetchAllRepresentativesSucceeded(data));
    } else {
      yield put(actions.fetchAllRepresentativesFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.fetchAllRepresentativesFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(FETCH_ALL_RECORDS_REQUESTED, fetchAllRecordsRequested),
    takeLatest(
      FETCH_ALL_REPRESENTATIVES_REQUESTED,
      fetchAllRepresentativesRequested
    )
  ]);
}
