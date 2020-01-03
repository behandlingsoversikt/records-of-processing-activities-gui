import {
  all,
  call,
  debounce,
  takeLatest,
  getContext,
  put
} from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import { PATCH_RECORD_REQUESTED, GET_RECORD_REQUESTED } from './action-types';

const { RECORDS_OF_PROCESSING_ACTIVITIES_URL } = env;

function* getRecordRequested({
  payload: { recordId, organizationId }
}: ReturnType<typeof actions.getRecordRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);

    const { data, message } = yield call(
      axios.get,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/organizations/${organizationId}/records/${recordId}`,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data) {
      yield put(actions.getRecordSucceeded(data));
    } else {
      yield put(actions.getRecordFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.getRecordFailed(e.message));
  }
}

function* patchRecordRequested({
  payload: { record }
}: ReturnType<typeof actions.patchRecordRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.patch,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/organizations/${
        record.organizationId
      }/records${record.id ? `/${record.id}` : ''}`,
      record,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data) {
      yield put(actions.patchRecordSucceeded(data));
    } else {
      yield put(actions.patchRecordFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.patchRecordFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    debounce(1000, PATCH_RECORD_REQUESTED, patchRecordRequested),
    takeLatest(GET_RECORD_REQUESTED, getRecordRequested)
  ]);
}
