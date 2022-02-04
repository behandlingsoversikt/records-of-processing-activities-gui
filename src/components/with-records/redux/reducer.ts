import { fromJS } from 'immutable';

import * as actions from './actions';
import { FETCH_ALL_RECORDS_SUCCEEDED, SORT_RECORDS } from './action-types';

import { Actions } from '../../../types';
import { SortField, SortOrder } from '../../../types/enums';

const initialState = fromJS({
  records: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case FETCH_ALL_RECORDS_SUCCEEDED:
      return state.set(
        'records',
        fromJS(
          action.payload.records.map(record => {
            if (record.dataProcessorContactDetails) {
              record.dataProcessorContactDetails.sort(
                ({ name: a = '' }, { name: b = '' }) => a.localeCompare(b)
              );
            }
            return record;
          })
        )
      );

    case SORT_RECORDS:
      return state.update('records', (records: any) =>
        records.sort((a: any, b: any) => {
          let mapper = (obj: any) => obj;

          switch (action.payload.sortField) {
            case SortField.TITLE:
              mapper = (obj: any) => obj.getIn(['title'], '');
              break;
            case SortField.STATUS:
              mapper = (obj: any) => obj.getIn(['status']);
              break;
            case SortField.CONTACT:
              mapper = (obj: any) =>
                obj.getIn(['dataProcessorContactDetails'])
                  ? obj
                      .getIn(['dataProcessorContactDetails'])
                      .map((contact): any => contact.get('name'))
                      .join()
                  : '';
              break;
            default:
              return 0;
          }
          if (mapper(a) === '' || mapper(a) === null) return 1;
          if (mapper(b) === '' || mapper(b) === null) return -1;
          return (
            mapper(a).localeCompare(mapper(b)) *
            (action.payload.order === SortOrder.DSC ? 1 : -1)
          );
        })
      );
    default:
      return state;
  }
}
