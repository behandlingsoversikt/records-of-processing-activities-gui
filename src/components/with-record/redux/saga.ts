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
import {
  GET_RECORD_REQUESTED,
  PATCH_RECORD_REQUESTED,
  DELETE_RECORD_REQUESTED,
  CREATE_RECORD_REQUESTED
} from './action-types';

const { RECORDS_OF_PROCESSING_ACTIVITIES_URL } = env;

function* getRecordRequested({
  payload: { recordId, organizationId, onError }
}: ReturnType<typeof actions.getRecordRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);

    const { data, message } = yield call(
      axios.get,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/api/organizations/${organizationId}/records/${recordId}`,
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
      onError();
    }
  } catch (e: any) {
    yield put(actions.getRecordFailed(e.message));
    onError();
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
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/api/organizations/${
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
  } catch (e: any) {
    yield put(actions.patchRecordFailed(e.message));
  }
}

function* deleteRecordRequested({
  payload: { recordId, organizationId, onSuccess }
}: ReturnType<typeof actions.deleteRecordRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { status, message } = yield call(
      axios.delete,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/api/organizations/${organizationId}/records/${recordId}`,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (status === 204) {
      yield put(actions.deleteRecordSucceeded());
      onSuccess();
    } else {
      yield put(actions.deleteRecordFailed(JSON.stringify(message)));
    }
  } catch (e: any) {
    yield put(actions.deleteRecordFailed(e.message));
  }
}

function* createRecordRequested({
  payload: { record }
}: ReturnType<typeof actions.createRecordRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { headers, message } = yield call(
      axios.post,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/api/organizations/${record.organizationId}/records`,
      record,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (headers) {
      yield put(
        actions.createRecordSucceeded(headers?.location?.split('/').pop())
      );
    } else {
      yield put(actions.createRecordFailed(JSON.stringify(message)));
    }
  } catch (e: any) {
    yield put(actions.createRecordFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_RECORD_REQUESTED, getRecordRequested),
    debounce(1000, PATCH_RECORD_REQUESTED, patchRecordRequested),
    takeLatest(DELETE_RECORD_REQUESTED, deleteRecordRequested),
    takeLatest(CREATE_RECORD_REQUESTED, createRecordRequested)
  ]);
}
