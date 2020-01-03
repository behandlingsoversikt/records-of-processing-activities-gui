import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import { FETCH_ORGANIZATION_REQUESTED } from './action-types';

const { ORGANIZATION_API } = env;

function* fetchPublisherRequested({
  payload: { orgId }
}: ReturnType<typeof actions.fetchOrganizationRequested>) {
  try {
    const { data, message } = yield call(
      axios.get,
      `${ORGANIZATION_API}/organizations/${orgId}`,
      {
        headers: {
          accept: 'application/json'
        }
      }
    );
    if (data) {
      yield put(actions.fetchOrganizationSucceeded(data));
    } else {
      yield put(actions.fetchOrganizationFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.fetchOrganizationFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(FETCH_ORGANIZATION_REQUESTED, fetchPublisherRequested)
  ]);
}
