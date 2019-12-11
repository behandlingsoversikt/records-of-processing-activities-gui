import { all, call, debounce, getContext, put } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import { PATCH_REPRESENTATIVE_REQUESTED } from './action-types';

const { RECORDS_OF_PROCESSING_ACTIVITIES_URL } = env;

function* patchRepresentativeRequested() {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.patch,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/organizations/910244132/representatives`,
      {},
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data) {
      yield put(actions.patchRepresentativeSucceeded());
    } else {
      yield put(actions.patchRepresentativeFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.patchRepresentativeFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    debounce(1000, PATCH_REPRESENTATIVE_REQUESTED, patchRepresentativeRequested)
  ]);
}
