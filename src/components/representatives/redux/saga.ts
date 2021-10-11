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
  PATCH_REPRESENTATIVE_REQUESTED,
  FETCH_ALL_REPRESENTATIVES_REQUESTED,
  CREATE_REPRESENTATIVE_REQUESTED
} from './action-types';

const { RECORDS_OF_PROCESSING_ACTIVITIES_URL } = env;

function* patchRepresentativeRequested({
  payload: { type: field, payload, organizationId }
}: ReturnType<typeof actions.patchRepresentativeRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.patch,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/api/organizations/${organizationId}/representatives`,
      { [field]: payload },
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data) {
      yield put(actions.patchRepresentativeSucceeded(data));
    } else {
      yield put(actions.patchRepresentativeFailed(JSON.stringify(message)));
    }
  } catch (e: any) {
    yield put(actions.patchRepresentativeFailed(e.message));
  }
}

function* createRepresentativeRequested({
  payload: { organizationId }
}: ReturnType<typeof actions.createRepresentativeRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.post,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/api/organizations/${organizationId}/representatives`,
      {},
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data) {
      yield put(actions.createRepresentativeSucceeded());
    } else {
      yield put(actions.createRepresentativeFailed(JSON.stringify(message)));
    }
  } catch (e: any) {
    yield put(actions.createRepresentativeFailed(e.message));
  }
}

function* fetchAllRepresentativesRequested({
  payload: { organizationId }
}: ReturnType<typeof actions.fetchAllRepresentativesRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message, status } = yield call(
      axios.get,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/api/organizations/${organizationId}/representatives`,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data) {
      yield put(actions.fetchAllRepresentativesSucceeded(data));
    } else if (status === 404) {
      yield createRepresentativeRequested({
        type: CREATE_REPRESENTATIVE_REQUESTED,
        payload: { organizationId }
      });
    } else {
      yield put(actions.fetchAllRepresentativesFailed(JSON.stringify(message)));
    }
  } catch (e: any) {
    if (e.message.includes('status code 404')) {
      yield createRepresentativeRequested({
        type: CREATE_REPRESENTATIVE_REQUESTED,
        payload: { organizationId }
      });
    } else {
      yield put(actions.fetchAllRepresentativesFailed(e.message));
    }
  }
}

export default function* saga() {
  yield all([
    takeLatest(
      FETCH_ALL_REPRESENTATIVES_REQUESTED,
      fetchAllRepresentativesRequested
    ),
    debounce(1000, PATCH_REPRESENTATIVE_REQUESTED, patchRepresentativeRequested)
  ]);
}
