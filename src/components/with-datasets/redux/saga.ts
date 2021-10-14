import { all, call, takeLatest, put, getContext } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import { FETCH_ALL_DATASETS_REQUESTED } from './action-types';

const { FDK_REGISTRATION_BASE_URI } = env;

function* fetchAllDatasetsRequested({
  payload: { organizationId }
}: ReturnType<typeof actions.fetchAllDatasetsRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);

    const { data, message } = yield call(
      axios.get,
      `${FDK_REGISTRATION_BASE_URI}/catalogs/${organizationId}/datasets`,
      {
        params: {
          size: 1000
        },
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );

    if (data?._embedded?.datasets) {
      yield put(actions.fetchAllDatasetsSucceeded(data?._embedded?.datasets));
    } else {
      yield put(actions.fetchAllDatasetsFailed(JSON.stringify(message)));
    }
  } catch (e: any) {
    yield put(actions.fetchAllDatasetsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(FETCH_ALL_DATASETS_REQUESTED, fetchAllDatasetsRequested)
  ]);
}
