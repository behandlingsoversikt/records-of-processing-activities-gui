import { all, call, debounce, getContext, put } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import { PATCH_RECORD_REQUESTED } from './action-types';

const { RECORDS_OF_PROCESSING_ACTIVITIES_URL } = env;

function* patchRecordRequested({
  payload: { record }
}: ReturnType<typeof actions.patchRecordRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.patch,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/records`,
      record,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data) {
      yield put(actions.patchRecordSucceeded());
    } else {
      yield put(actions.patchRecordFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.patchRecordFailed(e.message));
  }
}

export default function* saga() {
  yield all([debounce(1000, PATCH_RECORD_REQUESTED, patchRecordRequested)]);
}
